import React, { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { PricingMethod } from "@shared/pricing";

interface SpeciesRow {
  id: number;
  species: string;
  boardFootRate: string;
  pricingMethod: string;
  status: string;
  effectiveDate?: string | null;
  notes?: string | null;
}
interface SpeciesForm {
  id: number | null;
  species: string;
  rate: string;
  method: PricingMethod;
  status: "active" | "inactive";
  reason: string;
  effectiveDate: string;
  notes: string;
}
interface OverrideForm {
  productId: string;
  method: PricingMethod;
  rate: string;
  fixed: string;
  reason: string;
}
const emptySpecies = (): SpeciesForm => ({ id: null, species: "", rate: "", method: "board_foot", status: "active", reason: "", effectiveDate: "", notes: "" });
const emptyOverride = (): OverrideForm => ({ productId: "", method: "board_foot", rate: "", fixed: "", reason: "" });
const money = (value: string | number | null | undefined) => value != null && Number.isFinite(Number(value)) ? `$${Number(value).toFixed(2)}` : "—";
export function validRate(value: string): boolean { return value.trim() !== "" && /^\d+(?:\.\d{1,2})?$/.test(value.trim()) && Number.isFinite(Number(value)) && Number(value) > 0; }
const selectClass = "mt-2 w-full border border-stone-400 bg-white p-2 text-sm";
const ctaClass = "bg-[#217938] text-white hover:bg-[#1a5a2a]";

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: ReactNode }) {
  return <div><label htmlFor={htmlFor} className="text-sm font-semibold">{label}</label>{children}</div>;
}
function MethodSelect({ id, value, onChange }: { id: string; value: PricingMethod; onChange: (value: PricingMethod) => void }) {
  return <select id={id} className={selectClass} value={value} onChange={event => onChange(event.target.value as PricingMethod)}><option value="board_foot">Board-foot rate</option><option value="fixed">Fixed sale price</option><option value="inquire">Price upon inquiry</option></select>;
}

/** Mounted only after auth.me verifies the server-assigned administrator role. */
function PricingWorkspace({ isAdmin }: { isAdmin: boolean }) {
  const [tab, setTab] = useState("species");
  const [search, setSearch] = useState("");
  const [historyFilter, setHistoryFilter] = useState("");
  const [speciesForm, setSpeciesForm] = useState<SpeciesForm | null>(null);
  const [overrideForm, setOverrideForm] = useState<OverrideForm | null>(null);
  const [defaultRate, setDefaultRate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const utils = trpc.useUtils();
  const snapshot = trpc.pricing.snapshot.useQuery(undefined, { enabled: isAdmin, retry: false, staleTime: 0 });
  const species = trpc.pricing.speciesList.useQuery(undefined, { enabled: isAdmin, retry: false });
  const overrides = trpc.pricing.overrides.useQuery(undefined, { enabled: isAdmin, retry: false });
  const history = trpc.pricing.history.useQuery(historyFilter ? { species: historyFilter } : undefined, { enabled: isAdmin, retry: false });
  const updateSpecies = trpc.pricing.updateSpecies.useMutation();
  const addSpecies = trpc.pricing.addSpecies.useMutation();
  const upsertOverride = trpc.pricing.upsertOverride.useMutation();
  const deleteOverride = trpc.pricing.deleteOverride.useMutation();
  const setDefault = trpc.pricing.setDefaultRate.useMutation();
  const invalidateCache = trpc.pricing.invalidateCache.useMutation();
  const speciesRows: SpeciesRow[] = species.data ?? [];
  const queryError = snapshot.error ?? species.error ?? overrides.error ?? history.error;
  const forbidden = queryError?.data?.code === "UNAUTHORIZED" || queryError?.data?.code === "FORBIDDEN";
  const locked = pending || forbidden || !isAdmin;
  const refresh = async () => {
    await Promise.all([utils.pricing.snapshot.invalidate(), utils.pricing.speciesList.invalidate(), utils.pricing.overrides.invalidate(), utils.pricing.history.invalidate(), utils.pricing.catalog.invalidate(), utils.pricing.product.invalidate()]);
  };
  const run = async (operation: () => Promise<unknown>, success: string, close?: () => void) => {
    if (locked) return;
    setPending(true); setError(""); setMessage("");
    try { await operation(); close?.(); setMessage(success); await refresh(); }
    catch (failure) {
      const code = (failure as { data?: { code?: string } })?.data?.code;
      if (code === "UNAUTHORIZED" || code === "FORBIDDEN") {
        await utils.auth.me.invalidate();
        setError("Administrator authorization is required. Your change was not saved.");
      } else setError(failure instanceof Error ? failure.message : "The change could not be saved. Please retry.");
    } finally { setPending(false); }
  };
  const editSpecies = (row: SpeciesRow) => setSpeciesForm({ id: row.id, species: row.species, rate: row.boardFootRate, method: row.pricingMethod as PricingMethod, status: row.status as "active" | "inactive", reason: "", effectiveDate: row.effectiveDate ?? "", notes: row.notes ?? "" });
  const saveSpecies = (event: FormEvent) => {
    event.preventDefault();
    if (!speciesForm || !validRate(speciesForm.rate) || !speciesForm.reason.trim() || !speciesForm.species.trim()) return;
    const form = speciesForm;
    const common = { pricingMethod: form.method, status: form.status, effectiveDate: form.effectiveDate || undefined, notes: form.notes.trim() || undefined };
    void run(() => form.id !== null
      ? updateSpecies.mutateAsync({ id: form.id, newRate: Number(form.rate).toFixed(2), ...common, changeReason: form.reason.trim() })
      : addSpecies.mutateAsync({ species: form.species.trim(), boardFootRate: Number(form.rate).toFixed(2), ...common, createdReason: form.reason.trim() }), "Species pricing saved. The pricing version and history have been refreshed.", () => setSpeciesForm(null));
  };
  const saveOverride = (event: FormEvent) => {
    event.preventDefault();
    if (!overrideForm || !overrideForm.productId.trim() || !overrideForm.reason.trim() ||
      (overrideForm.method === "board_foot" && !validRate(overrideForm.rate)) || (overrideForm.method === "fixed" && !validRate(overrideForm.fixed))) return;
    const form = overrideForm;
    void run(() => upsertOverride.mutateAsync({ productId: form.productId.trim(), pricingMethod: form.method,
      boardFootRateOverride: form.method === "board_foot" ? Number(form.rate).toFixed(2) : null,
      fixedPrice: form.method === "fixed" ? Number(form.fixed).toFixed(2) : null, overrideReason: form.reason.trim(), active: 1 }), "Product override saved. Current pricing has been refreshed.", () => setOverrideForm(null));
  };

  return <>
    <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 py-8"><div className="container max-w-6xl flex flex-wrap items-center justify-between gap-5">
      <div><p className="text-sm font-semibold">Pricing version: {snapshot.data?.version ?? "Loading…"}</p><p className="mt-2 text-sm">{speciesRows.length} species rates · Default {money(snapshot.data?.defaultRate)}/BF · {overrides.data?.filter(row => row.active === 1).length ?? 0} active overrides</p></div>
      <Button className={ctaClass} disabled={locked} onClick={() => void run(() => invalidateCache.mutateAsync(), "Pricing version bumped and catalog cache refreshed.")}>Bump pricing version</Button>
    </div></section>
    <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container max-w-6xl">
      <div aria-live="polite" aria-atomic="true" className="mb-5 space-y-3">
        {message && <p role="status" className="border border-green-400 bg-green-50 p-4 text-green-950">{message}</p>}
        {(error || queryError) && <p role="alert" className="border border-red-300 bg-red-50 p-4 text-red-900">{error || queryError?.message}</p>}
        {pending && <p>Saving and refreshing current pricing…</p>}
      </div>
      {forbidden ? <p>Administrator access is no longer available. Sign in with an authorized account to continue.</p> : <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="h-auto max-w-full flex-wrap justify-start gap-2"><TabsTrigger value="species">Species rates</TabsTrigger><TabsTrigger value="overrides">Product overrides</TabsTrigger><TabsTrigger value="defaults">Defaults</TabsTrigger><TabsTrigger value="history">Change history</TabsTrigger></TabsList>
        <TabsContent value="species" className="mt-6 space-y-5">
          <div className="flex flex-wrap justify-between gap-4"><Field label="Filter generic species" htmlFor="species-search"><Input id="species-search" value={search} onChange={event => setSearch(event.target.value)} className="mt-2 bg-white" /></Field><Button className={ctaClass} disabled={locked} onClick={() => setSpeciesForm(emptySpecies())}>Add species rate</Button></div>
          <p className="text-sm text-muted-foreground">Use generic species names rather than provenance duplicates. Changes are attributed to the signed-in administrator by the server. Deactivate unused rates instead of deleting audit history.</p>
          {speciesForm && <form onSubmit={saveSpecies} className="space-y-4 border border-stone-400 bg-white p-6">
            <h2 className="text-xl font-bold">{speciesForm.id === null ? "Add species rate" : `Edit ${speciesForm.species}`}</h2>
            <fieldset disabled={locked} className="grid gap-4 sm:grid-cols-2">
              <Field label="Generic species name" htmlFor="rate-species"><Input id="rate-species" value={speciesForm.species} readOnly={speciesForm.id !== null} required onChange={event => setSpeciesForm({ ...speciesForm, species: event.target.value })} className="mt-2" /></Field>
              <Field label="Rate ($/BF)" htmlFor="rate-value"><Input id="rate-value" type="number" min="0.01" step="0.01" value={speciesForm.rate} required onChange={event => setSpeciesForm({ ...speciesForm, rate: event.target.value })} className="mt-2" /></Field>
              <Field label="Pricing method" htmlFor="rate-method"><MethodSelect id="rate-method" value={speciesForm.method} onChange={method => setSpeciesForm({ ...speciesForm, method })} /></Field>
              <Field label="Status" htmlFor="rate-status"><select id="rate-status" className={selectClass} value={speciesForm.status} onChange={event => setSpeciesForm({ ...speciesForm, status: event.target.value as "active" | "inactive" })}><option value="active">Active</option><option value="inactive">Inactive</option></select></Field>
              <Field label="Effective date" htmlFor="rate-date"><Input id="rate-date" type="date" value={speciesForm.effectiveDate} onChange={event => setSpeciesForm({ ...speciesForm, effectiveDate: event.target.value })} className="mt-2" /></Field>
              <Field label="Change reason (required for audit)" htmlFor="rate-reason"><Input id="rate-reason" required value={speciesForm.reason} onChange={event => setSpeciesForm({ ...speciesForm, reason: event.target.value })} className="mt-2" /></Field>
              <Field label="Internal notes" htmlFor="rate-notes"><Textarea id="rate-notes" value={speciesForm.notes} onChange={event => setSpeciesForm({ ...speciesForm, notes: event.target.value })} className="mt-2" /></Field>
            </fieldset>
            <div className="flex gap-3"><Button type="submit" disabled={locked || !validRate(speciesForm.rate) || !speciesForm.reason.trim() || !speciesForm.species.trim()} className={ctaClass}>Save species pricing</Button><Button type="button" variant="outline" disabled={pending} onClick={() => setSpeciesForm(null)}>Cancel</Button></div>
          </form>}
          <div className="overflow-x-auto border border-stone-400 bg-white"><Table><TableHeader><TableRow><TableHead>Species</TableHead><TableHead>Rate / BF</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead><TableHead>Effective</TableHead><TableHead>Notes</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>
            {species.isLoading && <TableRow><TableCell colSpan={7}>Loading species rates…</TableCell></TableRow>}
            {speciesRows.filter(row => row.species.toLowerCase().includes(search.toLowerCase())).map(row => <TableRow key={row.id}><TableCell className="font-semibold">{row.species}</TableCell><TableCell>{money(row.boardFootRate)}</TableCell><TableCell>{row.pricingMethod}</TableCell><TableCell>{row.status}</TableCell><TableCell>{row.effectiveDate || "—"}</TableCell><TableCell>{row.notes || "—"}</TableCell><TableCell><Button type="button" variant="outline" disabled={locked} aria-label={`Edit ${row.species} pricing`} onClick={() => editSpecies(row)}>Edit</Button></TableCell></TableRow>)}
            {!species.isLoading && !speciesRows.length && <TableRow><TableCell colSpan={7}>No species rates configured.</TableCell></TableRow>}
          </TableBody></Table></div>
        </TabsContent>
        <TabsContent value="overrides" className="mt-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-sm">Approved product overrides take precedence over species rates.</p><Button className={ctaClass} disabled={locked} onClick={() => setOverrideForm(emptyOverride())}>Add product override</Button></div>
          {overrideForm && <form onSubmit={saveOverride} className="space-y-4 border border-stone-400 bg-white p-6"><h2 className="text-xl font-bold">Save product override</h2><fieldset disabled={locked} className="grid gap-4 sm:grid-cols-2">
            <Field label="Product ID" htmlFor="override-product"><Input id="override-product" value={overrideForm.productId} required onChange={event => setOverrideForm({ ...overrideForm, productId: event.target.value })} className="mt-2" /></Field>
            <Field label="Override method" htmlFor="override-method"><MethodSelect id="override-method" value={overrideForm.method} onChange={method => setOverrideForm({ ...overrideForm, method })} /></Field>
            {overrideForm.method !== "inquire" && <Field label={overrideForm.method === "fixed" ? "Fixed price ($)" : "Override rate ($/BF)"} htmlFor="override-value"><Input id="override-value" type="number" min="0.01" step="0.01" required value={overrideForm.method === "fixed" ? overrideForm.fixed : overrideForm.rate} onChange={event => setOverrideForm({ ...overrideForm, [overrideForm.method === "fixed" ? "fixed" : "rate"]: event.target.value })} className="mt-2" /></Field>}
            <Field label="Override reason (required)" htmlFor="override-reason"><Input id="override-reason" required value={overrideForm.reason} onChange={event => setOverrideForm({ ...overrideForm, reason: event.target.value })} className="mt-2" /></Field>
          </fieldset><div className="flex gap-3"><Button type="submit" className={ctaClass} disabled={locked || !overrideForm.productId.trim() || !overrideForm.reason.trim() || (overrideForm.method !== "inquire" && !validRate(overrideForm.method === "fixed" ? overrideForm.fixed : overrideForm.rate))}>Save override</Button><Button type="button" variant="outline" disabled={pending} onClick={() => setOverrideForm(null)}>Cancel</Button></div></form>}
          <div className="overflow-x-auto border border-stone-400 bg-white"><Table><TableHeader><TableRow><TableHead>Product ID</TableHead><TableHead>Method</TableHead><TableHead>Override price / rate</TableHead><TableHead>Reason</TableHead><TableHead>Active</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader><TableBody>
            {overrides.data?.map(row => <TableRow key={row.productId}><TableCell>{row.productId}</TableCell><TableCell>{row.pricingMethod}</TableCell><TableCell>{row.pricingMethod === "fixed" ? money(row.fixedPrice) : row.pricingMethod === "board_foot" ? `${money(row.boardFootRateOverride)}/BF` : "Upon inquiry"}</TableCell><TableCell>{row.overrideReason || "—"}</TableCell><TableCell>{row.active === 1 ? "Yes" : "No"}</TableCell><TableCell><div className="flex gap-2"><Button variant="outline" disabled={locked} aria-label={`Edit override for ${row.productId}`} onClick={() => setOverrideForm({ productId: row.productId, method: row.pricingMethod as PricingMethod, rate: row.boardFootRateOverride ?? "", fixed: row.fixedPrice ?? "", reason: row.overrideReason ?? "" })}>Edit</Button><Button variant="outline" disabled={locked} aria-label={`Delete override for ${row.productId}`} onClick={() => { if (window.confirm(`Remove the pricing override for ${row.productId}? Its audit history will remain.`)) void run(() => deleteOverride.mutateAsync({ productId: row.productId }), "Product override removed; audit history retained."); }}>Remove</Button></div></TableCell></TableRow>)}
            {!overrides.data?.length && <TableRow><TableCell colSpan={6}>{overrides.isLoading ? "Loading overrides…" : "No product overrides configured."}</TableCell></TableRow>}
          </TableBody></Table></div>
        </TabsContent>
        <TabsContent value="defaults" className="mt-6"><form className="max-w-xl space-y-5 border border-stone-400 bg-white p-6" onSubmit={event => { event.preventDefault(); if (validRate(defaultRate)) void run(() => setDefault.mutateAsync({ rate: Number(defaultRate).toFixed(2) }), "Default rate saved and pricing version refreshed.", () => setDefaultRate("")); }}>
          <h2 className="text-2xl font-bold">Default board-foot rate</h2><p className="text-sm">Applied when a board-foot product has no active species rate or approved override. Current default: {money(snapshot.data?.defaultRate)}/BF.</p>
          <Field label="New default rate ($/BF)" htmlFor="default-rate"><Input id="default-rate" type="number" min="0.01" step="0.01" required value={defaultRate} onChange={event => setDefaultRate(event.target.value)} disabled={locked} className="mt-2" /></Field><Button type="submit" className={ctaClass} disabled={locked || !validRate(defaultRate)}>Save default rate</Button>
        </form></TabsContent>
        <TabsContent value="history" className="mt-6 space-y-5"><Field label="Filter audit history by species" htmlFor="history-filter"><select id="history-filter" className={`${selectClass} max-w-sm`} value={historyFilter} onChange={event => setHistoryFilter(event.target.value)}><option value="">All species and changes</option>{speciesRows.map(row => <option key={row.id} value={row.species}>{row.species}</option>)}</select></Field>
          <p className="text-sm">Append-only change history. Existing entries cannot be edited or deleted here.</p>
          <div className="overflow-x-auto border border-stone-400 bg-white"><Table><TableHeader><TableRow><TableHead>Timestamp</TableHead><TableHead>Species / rule</TableHead><TableHead>Previous rate</TableHead><TableHead>New rate</TableHead><TableHead>Administrator</TableHead><TableHead>Reason</TableHead></TableRow></TableHeader><TableBody>
            {history.data?.map(row => <TableRow key={row.id}><TableCell>{new Date(row.changedAt).toLocaleString()}</TableCell><TableCell>{row.species}</TableCell><TableCell>{money(row.oldRate)}</TableCell><TableCell>{money(row.newRate)}</TableCell><TableCell>{row.changedBy || "—"}</TableCell><TableCell>{row.changeReason || "—"}</TableCell></TableRow>)}
            {!history.data?.length && <TableRow><TableCell colSpan={6}>{history.isLoading ? "Loading audit history…" : "No recorded changes."}</TableCell></TableRow>}
          </TableBody></Table></div>
        </TabsContent>
      </Tabs>}
    </div></section>
  </>;
}

export function AdminPricing() {
  const auth = trpc.auth.me.useQuery(undefined, { retry: false, staleTime: 0, refetchOnWindowFocus: true });
  const [loginError, setLoginError] = useState("");
  const isAdmin = auth.data?.role === "admin";
  const signIn = () => {
    try { window.location.assign(getLoginUrl()); }
    catch { setLoginError("Sign-in is not configured in this environment. Contact the site administrator."); }
  };
  return <div className="min-h-screen bg-[#f0f0f0] text-foreground">
    <SEOHead title="Admin Pricing | Texas Urban Sawmill" description="Protected Texas Urban Sawmill species pricing, product overrides, defaults and audit history." url="https://txurbansawmill.com/admin/pricing" noindex />
    <Navigation />
    <main>
      <section className="bg-[#f0f0f0] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container max-w-6xl"><Link href="/shop" className="text-sm font-semibold text-[#217938]">Back to shop</Link><p className="eyebrow mt-6">Internal administration</p><h1 className="section-title">Master species pricing</h1><p className="section-copy mt-5 max-w-3xl">Manage generic species rates, approved product overrides and pricing defaults. The server enforces administrator access and records every change.</p></div></section>
      {auth.isLoading ? <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container" role="status">Checking administrator access…</div></section>
        : isAdmin && !auth.error ? <PricingWorkspace isAdmin={isAdmin} />
        : <section className="bg-[#f5f1e8] border-t-2 border-b-2 border-stone-400 section-shell"><div className="container max-w-6xl"><div className="max-w-xl space-y-5 border border-stone-400 bg-white p-8"><h2 className="text-2xl font-bold">Administrator access required</h2><p>{auth.data ? "Your signed-in account does not have the administrator role. Contact TXUS to request authorized access." : "Sign in with your authorized TXUS administrator account to manage pricing."}</p>{(auth.error || loginError) && <p role="alert" className="text-red-900">{loginError || auth.error?.message}</p>}{!auth.data && <Button className={ctaClass} onClick={signIn}>Sign in</Button>}<Button variant="outline" onClick={() => void auth.refetch()}>Check access again</Button></div></div></section>}
    </main>
    <Footer />
  </div>;
}
export default AdminPricing;
