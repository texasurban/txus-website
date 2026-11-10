import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { trpc } from "./trpc";
import type { PricingResult, CartValidationResult } from "@shared/pricing";

export interface CartItem {
  productId: string;
  category: string;
  species: string;
  dimensions: string;
  boardFeet?: number | null;
  selectedPrice: number | null;
  pricingResult?: PricingResult;
  quantity: number;
  surfacing: boolean;
  image?: string | null;
  /** Unique inventory defaults to one piece unless stock is explicitly known. */
  maxQuantity?: number;
}

export type ValidatedCart = CartValidationResult & {
  removedProductIds?: string[];
  removalNotices?: string[];
  /** The exact accepted snapshot, not the render closure from before the request. */
  validatedItems?: CartItem[];
};

export interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  toggleSurfacing: (productId: string) => void;
  clearCart: () => void;
  subtotal: number;
  surfacingTotal: number;
  total: number;
  count: number;
  notices: string[];
  dismissNotice: (idx: number) => void;
  revalidate: () => Promise<ValidatedCart | null>;
  revalidating: boolean;
  lastRevalidated: Date | null;
  pricingVersion: string | null;
  validationError: string | null;
  canCheckout: boolean;
  getItems: () => CartItem[];
}

export const CART_STORAGE_KEY = "txus_cart_v2";
export const CART_FRESHNESS_MS = 25_000;
const LEGACY_STORAGE_KEY = "txus_cart_v1";
const CartContext = createContext<CartContextValue | null>(null);
const finiteNonnegative = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
const record = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
export const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
export function clampQuantity(qty: number, maxQuantity = 1): number {
  const maximum = Number.isFinite(maxQuantity) && maxQuantity >= 1 ? Math.floor(maxQuantity) : 1;
  return Math.min(maximum, Math.max(1, Number.isFinite(qty) ? Math.floor(qty) : 1));
}

function sanitizePricing(value: unknown): PricingResult | undefined {
  if (!record(value) || !["board_foot", "fixed", "inquire"].includes(String(value.method)) ||
    !["override", "species", "default", "fixed", "inquire"].includes(String(value.rateSource)) ||
    typeof value.formula !== "string" || typeof value.pricingVersion !== "string" ||
    typeof value.surfacingAvailable !== "boolean" ||
    !(value.price === null || finiteNonnegative(value.price)) ||
    !(value.boardFootRateUsed === null || finiteNonnegative(value.boardFootRateUsed)) ||
    !(value.boardFeet === null || finiteNonnegative(value.boardFeet)) ||
    !(value.surfacingFee === null || finiteNonnegative(value.surfacingFee))) return undefined;
  return {
    method: value.method as PricingResult["method"], price: value.price as number | null,
    rateSource: value.rateSource as PricingResult["rateSource"], boardFootRateUsed: value.boardFootRateUsed as number | null,
    boardFeet: value.boardFeet as number | null, formula: value.formula.slice(0, 2000),
    pricingVersion: value.pricingVersion, surfacingAvailable: value.surfacingAvailable,
    surfacingFee: value.surfacingFee as number | null,
  };
}

/** Local storage is untrusted. Preserve only known fields and never persist authority. */
export function sanitizeCart(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const result: CartItem[] = [];
  for (const row of value.slice(0, 1000)) {
    if (!record(row) || typeof row.productId !== "string" || !row.productId.trim() || row.productId.length > 200 ||
      typeof row.category !== "string" || typeof row.species !== "string" || typeof row.dimensions !== "string" ||
      typeof row.quantity !== "number" || !Number.isFinite(row.quantity) || row.quantity < 1 ||
      !(row.selectedPrice === null || finiteNonnegative(row.selectedPrice)) || typeof row.surfacing !== "boolean") continue;
    const productId = row.productId.trim();
    if (seen.has(productId)) continue;
    seen.add(productId);
    const maxQuantity = typeof row.maxQuantity === "number" && Number.isFinite(row.maxQuantity) && row.maxQuantity >= 1
      ? Math.floor(row.maxQuantity) : 1;
    const pricingResult = sanitizePricing(row.pricingResult);
    const image = typeof row.image === "string" && /^(?:\/(?!\/)|https?:\/\/)/i.test(row.image) ? row.image : null;
    result.push({
      productId, category: row.category.slice(0, 200), species: row.species.slice(0, 200), dimensions: row.dimensions.slice(0, 500),
      selectedPrice: row.selectedPrice as number | null,
      quantity: clampQuantity(row.quantity, maxQuantity), maxQuantity,
      boardFeet: finiteNonnegative(row.boardFeet) ? row.boardFeet : null,
      pricingResult, surfacing: row.surfacing && !!pricingResult?.surfacingAvailable && finiteNonnegative(pricingResult.surfacingFee), image,
    });
  }
  return result;
}

export function loadCart(storage?: Pick<Storage, "getItem">): CartItem[] {
  try {
    const source = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    if (!source) return [];
    const current = source.getItem(CART_STORAGE_KEY);
    // A broken v2 cart must not resurrect an older cart that was already cleared.
    const raw = current === null ? source.getItem(LEGACY_STORAGE_KEY) : current;
    return raw ? sanitizeCart(JSON.parse(raw)) : [];
  } catch { return []; }
}
export function saveCart(items: CartItem[], storage?: Pick<Storage, "setItem">): void {
  try {
    const target = storage ?? (typeof window !== "undefined" ? window.localStorage : undefined);
    target?.setItem(CART_STORAGE_KEY, JSON.stringify(sanitizeCart(items)));
  } catch { /* Private browsing or a full disk must not prevent an in-memory inquiry. */ }
}

export type CartAction =
  | { type: "add"; item: Omit<CartItem, "quantity">; qty?: number }
  | { type: "remove"; productId: string }
  | { type: "quantity"; productId: string; qty: number }
  | { type: "surfacing"; productId: string }
  | { type: "clear" };
export function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  if (action.type === "clear") return [];
  if (action.type === "remove") return items.filter(i => i.productId !== action.productId);
  if (action.type === "add") {
    const incoming = sanitizeCart([{ ...action.item, quantity: clampQuantity(action.qty ?? 1, action.item.maxQuantity) }])[0];
    if (!incoming) return items;
    const previous = items.find(i => i.productId === incoming.productId);
    return previous ? items.map(i => i.productId === incoming.productId
      ? { ...incoming, quantity: clampQuantity(i.quantity + (action.qty ?? 1), incoming.maxQuantity) } : i) : [...items, incoming];
  }
  return items.map(i => {
    if (i.productId !== action.productId) return i;
    if (action.type === "quantity") return { ...i, quantity: clampQuantity(action.qty, i.maxQuantity) };
    return { ...i, surfacing: !!i.pricingResult?.surfacingAvailable && finiteNonnegative(i.pricingResult.surfacingFee) ? !i.surfacing : false };
  });
}

export function cartTotals(items: CartItem[]) {
  const subtotal = roundMoney(items.reduce((sum, i) => sum + roundMoney((i.selectedPrice ?? 0) * i.quantity), 0));
  const surfacingTotal = roundMoney(items.reduce((sum, i) => sum + roundMoney((i.surfacing ? i.pricingResult?.surfacingFee ?? 0 : 0) * i.quantity), 0));
  return { subtotal, surfacingTotal, total: roundMoney(subtotal + surfacingTotal), count: items.reduce((sum, i) => sum + i.quantity, 0) };
}
export const cartFingerprint = (items: CartItem[]) => JSON.stringify(items.map(i => [i.productId, i.quantity, i.selectedPrice, i.surfacing, i.pricingResult?.surfacingFee ?? null]));

/** Apply removals as well as pricing, quantity and add-on updates atomically. */
export function applyCartValidation(items: CartItem[], response: ValidatedCart): { items: CartItem[]; notices: string[]; changed: boolean } {
  if (!response || !Array.isArray(response.items) || typeof response.pricingVersion !== "string" || !response.pricingVersion) {
    throw new Error("We could not verify the current inventory. Please check prices again.");
  }
  const removed = new Set(response.removedProductIds ?? []);
  const validations = new Map(response.items.map(i => [i.productId, i]));
  const notices = [...(response.removalNotices ?? [])].filter(n => typeof n === "string");
  let changed = !!response.changed;
  const next: CartItem[] = [];
  for (const item of items) {
    const validation = validations.get(item.productId);
    if (removed.has(item.productId) || !validation) {
      changed = true;
      if (!notices.some(n => n.includes(item.productId))) notices.push(`${item.productId} is no longer available in the shop and was removed from your cart.`);
      continue;
    }
    const pricingResult = sanitizePricing(validation.pricingResult);
    if (!pricingResult || !(validation.newPrice === null || finiteNonnegative(validation.newPrice)) ||
      !(validation.surfacingFee === null || finiteNonnegative(validation.surfacingFee))) {
      throw new Error("A pricing response was incomplete. Please check prices again before submitting.");
    }
    const stock = validation as typeof validation & { quantity?: number; maxQuantity?: number; surfacing?: boolean };
    const maxQuantity = typeof stock.maxQuantity === "number" && stock.maxQuantity >= 1 ? stock.maxQuantity : item.maxQuantity ?? 1;
    const quantity = clampQuantity(stock.quantity ?? item.quantity, maxQuantity);
    const surfacing = (stock.surfacing ?? item.surfacing) && pricingResult.surfacingAvailable && finiteNonnegative(validation.surfacingFee);
    const updated = { ...item, selectedPrice: validation.newPrice, quantity, maxQuantity, surfacing,
      boardFeet: pricingResult.boardFeet, pricingResult: { ...pricingResult, surfacingFee: surfacing ? validation.surfacingFee : pricingResult.surfacingFee } };
    if (cartFingerprint([item]) !== cartFingerprint([updated])) changed = true;
    if (validation.priceChanged && validation.changeNotice) notices.push(validation.changeNotice);
    else if (item.selectedPrice !== updated.selectedPrice) notices.push(`The current price for ${item.productId} has changed. Please review your selection.`);
    if (item.surfacing && !surfacing) notices.push(`Surfacing is no longer available for ${item.productId}; the add-on was removed.`);
    if (quantity !== item.quantity) notices.push(`Quantity for ${item.productId} was adjusted to available stock (${quantity}).`);
    if (item.surfacing && surfacing && item.pricingResult?.surfacingFee !== updated.pricingResult.surfacingFee) notices.push(`The surfacing fee for ${item.productId} has changed. Please review the updated total.`);
    next.push(updated);
  }
  return { items: next, notices: Array.from(new Set(notices)), changed };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [notices, setNotices] = useState<string[]>([]);
  const [revalidating, setRevalidating] = useState(false);
  const [lastRevalidated, setLastRevalidated] = useState<Date | null>(null);
  const [pricingVersion, setPricingVersion] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [editRevision, setEditRevision] = useState(0);
  const [clock, setClock] = useState(Date.now());
  const itemsRef = useRef(items);
  const revisionRef = useRef(0);
  const validatedRevision = useRef<number | null>(null);
  const versionRef = useRef<string | null>(null);
  const mounted = useRef(true);
  const flight = useRef<Promise<ValidatedCart | null> | null>(null);
  const revalMutation = trpc.pricing.revalidateCart.useMutation();
  const mutateRef = useRef(revalMutation.mutateAsync);
  mutateRef.current = revalMutation.mutateAsync;
  const snapshot = trpc.pricing.snapshot.useQuery(undefined, {
    enabled: items.length > 0, retry: false, staleTime: 0,
    refetchInterval: CART_FRESHNESS_MS, refetchIntervalInBackground: false, refetchOnWindowFocus: true,
  });

  const commit = useCallback((next: CartItem[]) => {
    itemsRef.current = next;
    setItems(next);
    saveCart(next);
  }, []);
  const dispatch = useCallback((action: CartAction) => {
    const next = cartReducer(itemsRef.current, action);
    if (JSON.stringify(next) === JSON.stringify(itemsRef.current)) return;
    revisionRef.current += 1;
    validatedRevision.current = null;
    setLastRevalidated(null);
    setValidationError(null);
    commit(next);
    setEditRevision(revisionRef.current);
    if (action.type === "clear") { setNotices([]); setPricingVersion(null); versionRef.current = null; }
  }, [commit]);

  const revalidate = useCallback((): Promise<ValidatedCart | null> => {
    if (!itemsRef.current.length) return Promise.resolve(null);
    if (flight.current) return flight.current;
    setRevalidating(true);
    setValidationError(null);
    const request = async (): Promise<ValidatedCart | null> => {
      try {
        // If a shopper edits during a request, never apply its obsolete snapshot.
        for (let attempt = 0; attempt < 3; attempt++) {
          const revision = revisionRef.current;
          const submitted = itemsRef.current;
          if (!submitted.length) return null;
          const response = await mutateRef.current({ items: submitted.map(i => ({ productId: i.productId, quantity: i.quantity, selectedPrice: i.selectedPrice, surfacing: i.surfacing })) }) as ValidatedCart;
          if (!mounted.current) return null;
          if (revision !== revisionRef.current) continue;
          const applied = applyCartValidation(submitted, response);
          commit(applied.items);
          validatedRevision.current = revision;
          versionRef.current = response.pricingVersion;
          setPricingVersion(response.pricingVersion);
          const now = new Date();
          setLastRevalidated(now);
          setClock(now.getTime());
          if (applied.notices.length) setNotices(previous => Array.from(new Set([...previous, ...applied.notices])));
          return { ...response, changed: applied.changed, validatedItems: applied.items };
        }
        throw new Error("Your selections changed while prices were checked. Please check again.");
      } catch (error) {
        if (mounted.current) {
          validatedRevision.current = null;
          setLastRevalidated(null);
          setValidationError(error instanceof Error ? error.message : "Current prices could not be verified. Please try again.");
        }
        return null;
      } finally {
        flight.current = null;
        if (mounted.current) setRevalidating(false);
      }
    };
    flight.current = request();
    return flight.current;
  }, [commit]);

  useEffect(() => {
    mounted.current = true;
    saveCart(itemsRef.current);
    void revalidate();
    const interval = window.setInterval(() => { if (!document.hidden) void revalidate(); }, CART_FRESHNESS_MS);
    const ageTimer = window.setInterval(() => setClock(Date.now()), 1000);
    const onReturn = () => { if (!document.hidden) { setClock(Date.now()); void revalidate(); } };
    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("focus", onReturn);
    return () => { mounted.current = false; clearInterval(interval); clearInterval(ageTimer); document.removeEventListener("visibilitychange", onReturn); window.removeEventListener("focus", onReturn); };
  }, [revalidate]);
  // This depends only on user edits, NOT on items replaced by server validation.
  useEffect(() => { if (editRevision > 0 && itemsRef.current.length) void revalidate(); }, [editRevision, revalidate]);
  useEffect(() => {
    if (snapshot.data?.version && versionRef.current && snapshot.data.version !== versionRef.current) void revalidate();
  }, [snapshot.data?.version, revalidate]);
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== CART_STORAGE_KEY && event.key !== null) return;
      const next = loadCart();
      if (JSON.stringify(next) === JSON.stringify(itemsRef.current)) return;
      revisionRef.current += 1; validatedRevision.current = null; itemsRef.current = next;
      setItems(next); setLastRevalidated(null); setEditRevision(revisionRef.current);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const addItem = useCallback((item: Omit<CartItem, "quantity">, qty = 1) => dispatch({ type: "add", item, qty }), [dispatch]);
  const removeItem = useCallback((productId: string) => dispatch({ type: "remove", productId }), [dispatch]);
  const updateQuantity = useCallback((productId: string, qty: number) => dispatch({ type: "quantity", productId, qty }), [dispatch]);
  const toggleSurfacing = useCallback((productId: string) => dispatch({ type: "surfacing", productId }), [dispatch]);
  const clearCart = useCallback(() => dispatch({ type: "clear" }), [dispatch]);
  const dismissNotice = useCallback((idx: number) => setNotices(previous => previous.filter((_, i) => i !== idx)), []);
  const getItems = useCallback(() => itemsRef.current, []);
  const totals = useMemo(() => cartTotals(items), [items]);
  const canCheckout = items.length > 0 && !revalidating && !validationError && validatedRevision.current === revisionRef.current && !!lastRevalidated && clock - lastRevalidated.getTime() < CART_FRESHNESS_MS;
  const value = useMemo(() => ({ items, addItem, removeItem, updateQuantity, toggleSurfacing, clearCart, ...totals, notices, dismissNotice, revalidate, revalidating, lastRevalidated, pricingVersion, validationError, canCheckout, getItems }),
    [items, addItem, removeItem, updateQuantity, toggleSurfacing, clearCart, totals, notices, dismissNotice, revalidate, revalidating, lastRevalidated, pricingVersion, validationError, canCheckout, getItems]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
