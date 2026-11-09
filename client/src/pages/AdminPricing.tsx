import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  History,
  ShieldCheck,
  Lock,
  ArrowRight,
  Sliders,
  DollarSign,
  TrendingUp,
} from "lucide-react";

export function AdminPricing() {
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [tab, setTab] = useState<string>("species");

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editSpecies, setEditSpecies] = useState("");
  const [editRate, setEditRate] = useState("12.00");
  const [editMethod, setEditMethod] = useState<"board_foot" | "fixed" | "inquire">("board_foot");
  const [editStatus, setEditStatus] = useState<"active" | "inactive">("active");
  const [editDate, setEditDate] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editReason, setEditReason] = useState("");

  const [addOpen, setAddOpen] = useState(false);
  const [addSpecies, setAddSpecies] = useState("");
  const [addRate, setAddRate] = useState("12.00");
  const [addMethod, setAddMethod] = useState<"board_foot" | "fixed" | "inquire">("board_foot");
  const [addReason, setAddReason] = useState("");

  const [ovOpen, setOvOpen] = useState(false);
  const [ovProduct, setOvProduct] = useState("");
  const [ovMethod, setOvMethod] = useState<"board_foot" | "fixed" | "inquire">("board_foot");
  const [ovRate, setOvRate] = useState("");
  const [ovFixed, setOvFixed] = useState("");
  const [ovReason, setOvReason] = useState("");

  const [historyFilter, setHistoryFilter] = useState("");
  const [speciesSearch, setSpeciesSearch] = useState("");
  const [defaultRateInput, setDefaultRateInput] = useState("");

  const utils = trpc.useUtils();
  const { data: adminStatus } = trpc.auth.adminStatus.useQuery();
  const adminLogin = trpc.auth.adminLogin.useMutation({
    onSuccess: () => {
      setPin("");
      setPinError("");
      utils.auth.adminStatus.invalidate();
    },
    onError: (e) => setPinError(e.message),
  });
  const adminLogout = trpc.auth.adminLogout.useMutation({
    onSuccess: () => utils.auth.adminStatus.invalidate(),
  });

  const { data: snapshot } = trpc.pricing.snapshot.useQuery();
  const { data: speciesList = [] } = trpc.pricing.speciesList.useQuery();
  const { data: overrides = [] } = trpc.pricing.overrides.useQuery(undefined, {
    enabled: !!adminStatus?.isAdmin,
  });
  const { data: history = [] } = trpc.pricing.history.useQuery(
    historyFilter ? { species: historyFilter } : undefined,
  );

  const updateSpecies = trpc.pricing.updateSpecies.useMutation({
    onSuccess: () => {
      utils.pricing.speciesList.invalidate();
      utils.pricing.snapshot.invalidate();
      utils.pricing.history.invalidate();
      setEditOpen(false);
    },
  });
  const addSpeciesMut = trpc.pricing.addSpecies.useMutation({
    onSuccess: () => {
      utils.pricing.speciesList.invalidate();
      utils.pricing.snapshot.invalidate();
      utils.pricing.history.invalidate();
      setAddOpen(false);
      setAddSpecies("");
      setAddReason("");
    },
  });
  const deleteSpecies = trpc.pricing.deleteSpecies.useMutation({
    onSuccess: () => {
      utils.pricing.speciesList.invalidate();
      utils.pricing.snapshot.invalidate();
    },
  });
  const upsertOv = trpc.pricing.upsertOverride.useMutation({
    onSuccess: () => {
      utils.pricing.overrides.invalidate();
      utils.pricing.snapshot.invalidate();
      setOvOpen(false);
    },
  });
  const deleteOv = trpc.pricing.deleteOverride.useMutation({
    onSuccess: () => {
      utils.pricing.overrides.invalidate();
      utils.pricing.snapshot.invalidate();
    },
  });
  const setDefaultRate = trpc.pricing.setDefaultRate.useMutation({
    onSuccess: () => {
      utils.pricing.snapshot.invalidate();
    },
  });
  const invalidateCache = trpc.pricing.invalidateCache.useMutation({
    onSuccess: () => {
      utils.pricing.snapshot.invalidate();
    },
  });

  const filteredSpecies = useMemo(
    () =>
      speciesList.filter((s) =>
        s.species.toLowerCase().includes(speciesSearch.toLowerCase()),
      ),
    [speciesList, speciesSearch],
  );

  const startEdit = (s: (typeof speciesList)[number]) => {
    setEditId(s.id);
    setEditSpecies(s.species);
    setEditRate(s.boardFootRate);
    setEditMethod(s.pricingMethod as "board_foot" | "fixed" | "inquire");
    setEditStatus(s.status as "active" | "inactive");
    setEditDate(s.effectiveDate ?? "");
    setEditNotes(s.notes ?? "");
    setEditReason("");
    setEditOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editId) return;
    updateSpecies.mutate({
      id: editId,
      newRate: editRate,
      pricingMethod: editMethod,
      status: editStatus,
      effectiveDate: editDate,
      notes: editNotes,
      changeReason: editReason || `Rate adjusted to $${editRate}/BF`,
      changedBy: "admin",
    });
  };

  const handleSaveAdd = () => {
    if (!addSpecies.trim()) return;
    addSpeciesMut.mutate({
      species: addSpecies.trim(),
      boardFootRate: addRate,
      pricingMethod: addMethod,
      createdReason: addReason || "Added via admin manager",
      changedBy: "admin",
    });
  };

  const handleSaveOverride = () => {
    if (!ovProduct.trim()) return;
    upsertOv.mutate({
      productId: ovProduct.trim(),
      pricingMethod: ovMethod,
      boardFootRateOverride: ovMethod === "board_foot" ? ovRate || null : null,
      fixedPrice: ovMethod === "fixed" ? ovFixed || null : null,
      overrideReason: ovReason || null,
      active: 1,
    });
  };

  const isAdmin = !!adminStatus?.isAdmin;

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-[#1b1612]">
      <SEOHead
        title="Admin Pricing Manager | Texas Urban Sawmill"
        description="Internal master board-foot table and live species-rate pricing manager for TXUS."
        url="https://txurbansawmill.com/admin/pricing"
      />
      <Navigation />

      {/* Hero */}
      <section className="bg-[#1a4d2e] px-6 py-12 lg:px-8 lg:py-16 text-white border-t-2 border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#c9bfae]">Internal Tool</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
              Master Board-Foot Table &amp; Species Pricing
            </h1>
            <p className="mt-2 text-sm text-[#e5decf] max-w-2xl">
              Centralized species-rate pricing for slabs, lumber, mantels, beams, and cookies.
              Changes propagate to catalog and cart in near-real-time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 text-white border-white/40 hover:bg-white/20"
              onClick={() => invalidateCache.mutate()}
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Bump Version
            </Button>
            {isAdmin ? (
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 text-white border-white/40 hover:bg-white/20"
                onClick={() => adminLogout.mutate()}
              >
                Exit Admin Mode
              </Button>
            ) : null}
          </div>
        </div>
      </section>

      {/* Version strip */}
      <div className="bg-[#e5decf] px-6 py-2 text-xs text-[#5a5247] border-b-2 border-stone-400">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>Pricing version:</strong> {snapshot?.version ?? "loading..."}
          </span>
          <span>Snapshot cache TTL ≈ 15s • Client poll ≈ 25s</span>
        </div>
      </div>

      {/* PIN Gate */}
      {!isAdmin && (
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-md rounded bg-white p-8 shadow-[0_20px_40px_rgba(0,0,0,0.15)] border border-stone-300 text-center">
            <Lock className="mx-auto h-10 w-10 text-[#217938]" />
            <h2 className="mt-3 text-xl font-bold">Admin Access Required</h2>
            <p className="mt-2 text-xs text-[#7a7268]">
              Enter the admin PIN to manage rates. In prototype mode the PIN is{" "}
              <code className="font-mono font-semibold">txus2026</code>.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                adminLogin.mutate({ pin });
              }}
              className="mt-6 flex flex-col gap-3"
            >
              <Input
                type="password"
                placeholder="Admin PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="text-center font-mono tracking-widest text-lg"
              />
              {pinError && <p className="text-xs text-red-600">{pinError}</p>}
              <Button
                type="submit"
                disabled={adminLogin.isPending}
                className="bg-[#217938] hover:bg-[#1a5a2a] text-white uppercase text-xs tracking-[0.18em]"
              >
                Unlock Pricing Manager
              </Button>
            </form>
          </div>
        </section>
      )}

      {isAdmin && (
        <>
          {/* KPI Strip */}
          <section className="px-6 py-10 lg:px-8 bg-[#f5f1e8] border-b-2 border-stone-400">
            <div className="mx-auto max-w-7xl grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded bg-white p-4 shadow-sm border border-stone-300">
                <p className="text-xs uppercase tracking-wide text-[#7a7268]">Species Configured</p>
                <p className="mt-2 text-2xl font-bold">{speciesList.length}</p>
                <p className="text-xs text-[#7a7268]">20 from master inventory</p>
              </div>
              <div className="rounded bg-white p-4 shadow-sm border border-stone-300">
                <p className="text-xs uppercase tracking-wide text-[#7a7268]">Default Working Rate</p>
                <p className="mt-2 text-2xl font-bold">${(snapshot?.defaultRate ?? 12).toFixed(2)}/BF</p>
                <p className="text-xs text-[#7a7268]">Dev’s working rate</p>
              </div>
              <div className="rounded bg-white p-4 shadow-sm border border-stone-300">
                <p className="text-xs uppercase tracking-wide text-[#7a7268]">Product Overrides</p>
                <p className="mt-2 text-2xl font-bold">{overrides.filter((o) => o.active === 1).length}</p>
                <p className="text-xs text-[#7a7268]">outrank species rate</p>
              </div>
              <div className="rounded bg-white p-4 shadow-sm border border-stone-300">
                <p className="text-xs uppercase tracking-wide text-[#7a7268]">Change History</p>
                <p className="mt-2 text-2xl font-bold">{history.length}</p>
                <p className="text-xs text-[#7a7268]">audit entries logged</p>
              </div>
            </div>
          </section>

          {/* Main workspace */}
          <section className="px-6 py-12 lg:px-8 lg:py-16">
            <div className="mx-auto max-w-7xl">
              <Tabs value={tab} onValueChange={setTab}>
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300 pb-4">
                  <TabsList>
                    <TabsTrigger value="species">Species Rates</TabsTrigger>
                    <TabsTrigger value="overrides">Product Overrides</TabsTrigger>
                    <TabsTrigger value="history">Change History</TabsTrigger>
                    <TabsTrigger value="defaults">Defaults</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    {tab === "species" && (
                      <Button
                        size="sm"
                        className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
                        onClick={() => setAddOpen(true)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add Species
                      </Button>
                    )}
                    {tab === "overrides" && (
                      <Button
                        size="sm"
                        className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
                        onClick={() => setOvOpen(true)}
                      >
                        <Plus className="mr-1 h-4 w-4" /> Add Override
                      </Button>
                    )}
                  </div>
                </div>

                {/* TAB: Species Rates */}
                <TabsContent value="species" className="mt-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <Input
                      placeholder="Filter species by name..."
                      value={speciesSearch}
                      onChange={(e) => setSpeciesSearch(e.target.value)}
                      className="max-w-xs bg-white"
                    />
                    <p className="text-xs text-[#7a7268]">
                      Click <strong>Edit</strong> to change a rate. Every change writes to the audit log and bumps the pricing version.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-300">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Species</TableHead>
                          <TableHead className="text-right">Rate ($/BF)</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Effective Date</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSpecies.map((s) => (
                          <TableRow key={s.id}>
                            <TableCell className="font-semibold">{s.species}</TableCell>
                            <TableCell className="text-right font-mono text-base font-bold text-[#217938]">
                              ${parseFloat(s.boardFootRate).toFixed(2)}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{s.pricingMethod}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  s.status === "active"
                                    ? "bg-[#217938] text-white"
                                    : "bg-stone-300 text-stone-700"
                                }
                              >
                                {s.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-[#7a7268]">{s.effectiveDate || "—"}</TableCell>
                            <TableCell className="text-xs text-[#7a7268] max-w-xs truncate">{s.notes || "—"}</TableCell>
                            <TableCell className="text-right space-x-1">
                              <Button size="sm" variant="outline" onClick={() => startEdit(s)}>
                                <Edit2 className="h-3 w-3 mr-1" /> Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => deleteSpecies.mutate({ id: s.id })}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB: Overrides */}
                <TabsContent value="overrides" className="mt-6">
                  <div className="mb-4 text-xs text-[#7a7268]">
                    Overrides take precedence over the species rate. Use for clearance, promotions, or fixed-price pieces.
                  </div>
                  <div className="overflow-x-auto rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-300">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product ID</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Override</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Active</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {overrides.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-sm text-[#7a7268] py-8">
                              No overrides defined.
                            </TableCell>
                          </TableRow>
                        ) : (
                          overrides.map((o) => (
                            <TableRow key={o.productId}>
                              <TableCell className="font-mono font-semibold">{o.productId}</TableCell>
                              <TableCell>
                                <Badge variant="outline">{o.pricingMethod}</Badge>
                              </TableCell>
                              <TableCell className="font-mono">
                                {o.pricingMethod === "board_foot" && o.boardFootRateOverride
                                  ? `$${parseFloat(o.boardFootRateOverride).toFixed(2)}/BF`
                                  : o.pricingMethod === "fixed" && o.fixedPrice
                                  ? `$${parseFloat(o.fixedPrice).toFixed(2)}`
                                  : "inquire"}
                              </TableCell>
                              <TableCell className="text-xs text-[#7a7268] max-w-xs">{o.overrideReason || "—"}</TableCell>
                              <TableCell>
                                <Badge className={o.active === 1 ? "bg-[#217938] text-white" : "bg-stone-300 text-stone-700"}>
                                  {o.active === 1 ? "yes" : "paused"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right space-x-1">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => deleteOv.mutate({ productId: o.productId })}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB: Change History */}
                <TabsContent value="history" className="mt-6">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <Select value={historyFilter} onValueChange={(v) => setHistoryFilter(v === "__all__" ? "" : v)}>
                      <SelectTrigger className="w-56 bg-white">
                        <SelectValue placeholder="All species" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__all__">All species</SelectItem>
                        {speciesList.map((s) => (
                          <SelectItem key={s.species} value={s.species}>
                            {s.species}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-[#7a7268]">
                      Append-only log of every rate change with author and reason.
                    </p>
                  </div>
                  <div className="overflow-x-auto rounded bg-white shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-300">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Species</TableHead>
                          <TableHead>Change</TableHead>
                          <TableHead>By</TableHead>
                          <TableHead>Reason</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {history.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center text-sm text-[#7a7268] py-8">
                              No history yet.
                            </TableCell>
                          </TableRow>
                        ) : (
                          history.map((h) => (
                            <TableRow key={h.id}>
                              <TableCell className="text-xs font-mono text-[#7a7268]">
                                {new Date(h.changedAt).toLocaleString()}
                              </TableCell>
                              <TableCell className="font-semibold">{h.species}</TableCell>
                              <TableCell className="font-mono text-sm">
                                {h.oldRate ? `$${parseFloat(h.oldRate).toFixed(2)}` : "—"} →{" "}
                                <strong className="text-[#217938]">
                                  ${parseFloat(h.newRate ?? "0").toFixed(2)}/BF
                                </strong>
                              </TableCell>
                              <TableCell className="text-xs">{h.changedBy}</TableCell>
                              <TableCell className="text-xs text-[#7a7268] max-w-sm">{h.changeReason || "—"}</TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* TAB: Defaults */}
                <TabsContent value="defaults" className="mt-6">
                  <div className="rounded bg-white p-6 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-stone-300 max-w-xl">
                    <h3 className="text-lg font-bold">Global Default Board-Foot Rate</h3>
                    <p className="mt-1 text-xs text-[#7a7268]">
                      Applied to any BF-category product when its species lacks an explicit rate.
                    </p>
                    <div className="mt-4 flex gap-3">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder={(snapshot?.defaultRate ?? 12).toFixed(2)}
                        value={defaultRateInput}
                        onChange={(e) => setDefaultRateInput(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button
                        className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
                        onClick={() => {
                          if (defaultRateInput) setDefaultRate.mutate({ rate: defaultRateInput });
                        }}
                      >
                        Save
                      </Button>
                    </div>
                    <p className="mt-3 text-xs text-[#7a7268]">
                      Current: <strong>${(snapshot?.defaultRate ?? 12).toFixed(2)}/BF</strong>. Dev’s working rate from the
                      master inventory Pricing Rules sheet is $12/BF.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </>
      )}

      {/* Edit rate dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit rate — {editSpecies}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 text-sm">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Rate ($/BF)</label>
              <Input
                type="number"
                step="0.01"
                value={editRate}
                onChange={(e) => setEditRate(e.target.value)}
                className="mt-1 font-mono text-base"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Method</label>
                <Select value={editMethod} onValueChange={(v) => setEditMethod(v as any)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board_foot">board_foot</SelectItem>
                    <SelectItem value="fixed">fixed</SelectItem>
                    <SelectItem value="inquire">inquire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Status</label>
                <Select value={editStatus} onValueChange={(v) => setEditStatus(v as any)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Effective Date</label>
              <Input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Change Reason (audit log)</label>
              <Input
                placeholder="e.g. Pecan market rate adjustment"
                value={editReason}
                onChange={(e) => setEditReason(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Notes</label>
              <Textarea
                placeholder="Optional notes"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
              onClick={handleSaveEdit}
              disabled={updateSpecies.isPending}
            >
              Save Rate Change
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add species dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add species rate</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 text-sm">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Species name</label>
              <Input
                placeholder="e.g. Bodark / Osage Orange"
                value={addSpecies}
                onChange={(e) => setAddSpecies(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Rate ($/BF)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={addRate}
                  onChange={(e) => setAddRate(e.target.value)}
                  className="mt-1 font-mono"
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Method</label>
                <Select value={addMethod} onValueChange={(v) => setAddMethod(v as any)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="board_foot">board_foot</SelectItem>
                    <SelectItem value="fixed">fixed</SelectItem>
                    <SelectItem value="inquire">inquire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Creation Reason</label>
              <Input
                placeholder="e.g. New species added for 2027 harvest"
                value={addReason}
                onChange={(e) => setAddReason(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
              onClick={handleSaveAdd}
              disabled={addSpeciesMut.isPending}
            >
              Add Species
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add override dialog */}
      <Dialog open={ovOpen} onOpenChange={setOvOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add product override</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2 text-sm">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Product ID</label>
              <Input
                placeholder="e.g. 108-010"
                value={ovProduct}
                onChange={(e) => setOvProduct(e.target.value)}
                className="mt-1 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Method</label>
              <Select value={ovMethod} onValueChange={(v) => setOvMethod(v as any)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board_foot">board_foot (override $/BF)</SelectItem>
                  <SelectItem value="fixed">fixed price</SelectItem>
                  <SelectItem value="inquire">inquire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {ovMethod === "board_foot" && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Override $/BF</label>
                <Input
                  type="number"
                  step="0.01"
                  value={ovRate}
                  onChange={(e) => setOvRate(e.target.value)}
                  className="mt-1 font-mono"
                />
              </div>
            )}
            {ovMethod === "fixed" && (
              <div>
                <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Fixed price ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={ovFixed}
                  onChange={(e) => setOvFixed(e.target.value)}
                  className="mt-1 font-mono"
                />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-[#7a7268]">Reason</label>
              <Input
                placeholder="e.g. Clearance pricing — special piece"
                value={ovReason}
                onChange={(e) => setOvReason(e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOvOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-[#217938] hover:bg-[#1a5a2a] text-white"
              onClick={handleSaveOverride}
              disabled={upsertOv.isPending}
            >
              Save Override
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
export default AdminPricing;
