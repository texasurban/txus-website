import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { trpc } from "./trpc";
import {
  type PricingResult,
  type CartValidationResult,
  type CartItemValidation,
} from "@shared/pricing";

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
}

interface CartContextValue {
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
  revalidate: () => Promise<CartValidationResult | null>;
  revalidating: boolean;
  lastRevalidated: Date | null;
  pricingVersion: string | null;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "txus_cart_v1";

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [notices, setNotices] = useState<string[]>([]);
  const [revalidating, setRevalidating] = useState(false);
  const [lastRevalidated, setLastRevalidated] = useState<Date | null>(null);
  const [pricingVersion, setPricingVersion] = useState<string | null>(null);

  const revalMutation = trpc.pricing.revalidateCart.useMutation();

  const applyValidation = useCallback((res: CartValidationResult) => {
    setPricingVersion(res.pricingVersion);
    setLastRevalidated(new Date());

    setItems((prev) => {
      const map: Record<string, CartItemValidation> = {};
      for (const v of res.items) map[v.productId] = v;
      const next = prev.map((it) => {
        const v = map[it.productId];
        if (!v) return it;
        return {
          ...it,
          selectedPrice: v.newPrice,
          pricingResult: v.pricingResult,
        };
      });
      saveCart(next);
      return next;
    });

    const newNotices = res.items
      .filter((i) => i.priceChanged && i.changeNotice)
      .map((i) => i.changeNotice as string);
    if (newNotices.length > 0) {
      setNotices((p) => Array.from(new Set([...p, ...newNotices])));
    }
  }, []);

  const revalidate = useCallback(async (): Promise<CartValidationResult | null> => {
    if (items.length === 0) return null;
    try {
      setRevalidating(true);
      const res = await revalMutation.mutateAsync({
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
          selectedPrice: i.selectedPrice,
          surfacing: i.surfacing,
        })),
      });
      applyValidation(res as CartValidationResult);
      return res as CartValidationResult;
    } catch {
      return null;
    } finally {
      setRevalidating(false);
    }
  }, [items, applyValidation, revalMutation]);

  // Polling revalidation every 25s while tab is visible
  useEffect(() => {
    if (items.length === 0) return;
    const t = setInterval(() => {
      if (!document.hidden) revalidate();
    }, 25_000);
    return () => clearInterval(t);
  }, [items.length, revalidate]);

  // Revalidate on tab return (visibilitychange)
  useEffect(() => {
    if (items.length === 0) return;
    const onVis = () => {
      if (!document.hidden) revalidate();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [items.length, revalidate]);

  // Revalidate whenever cart items change
  useEffect(() => {
    saveCart(items);
    if (items.length > 0) revalidate();
  }, [items.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, qty = 1) => {
      setItems((prev) => {
        const idx = prev.findIndex((i) => i.productId === item.productId);
        let next: CartItem[];
        if (idx >= 0) {
          next = prev.map((it, i) =>
            i === idx ? { ...it, quantity: it.quantity + qty } : it,
          );
        } else {
          next = [...prev, { ...item, quantity: qty }];
        }
        saveCart(next);
        return next;
      });
    },
    [],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.productId !== productId);
      saveCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, qty: number) => {
    setItems((prev) => {
      const next =
        qty <= 0
          ? prev.filter((i) => i.productId !== productId)
          : prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i));
      saveCart(next);
      return next;
    });
  }, []);

  const toggleSurfacing = useCallback((productId: string) => {
    setItems((prev) => {
      const next = prev.map((i) =>
        i.productId === productId ? { ...i, surfacing: !i.surfacing } : i,
      );
      saveCart(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    saveCart([]);
    setNotices([]);
  }, []);

  const dismissNotice = useCallback((idx: number) => {
    setNotices((p) => p.filter((_, i) => i !== idx));
  }, []);

  const subtotal = useMemo(
    () =>
      items.reduce((s, i) => s + (i.selectedPrice ?? 0) * (i.quantity ?? 1), 0),
    [items],
  );

  const surfacingTotal = useMemo(
    () =>
      items.reduce(
        (s, i) =>
          s +
          (i.surfacing && i.pricingResult?.surfacingFee
            ? i.pricingResult.surfacingFee
            : 0),
        0,
      ),
    [items],
  );

  const total = subtotal + surfacingTotal;
  const count = items.reduce((s, i) => s + i.quantity, 0);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      toggleSurfacing,
      clearCart,
      subtotal,
      surfacingTotal,
      total,
      count,
      notices,
      dismissNotice,
      revalidate,
      revalidating,
      lastRevalidated,
      pricingVersion,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      toggleSurfacing,
      clearCart,
      subtotal,
      surfacingTotal,
      total,
      count,
      notices,
      dismissNotice,
      revalidate,
      revalidating,
      lastRevalidated,
      pricingVersion,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
