import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Check } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { SERVICES } from "@/constants/data";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fmtDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

const nextNDays = (n) => {
  const arr = [];
  const today = new Date();
  for (let i = 0; i < n; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    arr.push(d);
  }
  return arr;
};

export const Booking = ({ open, onClose, preselectedService }) => {
  const today = new Date();
  const [date, setDate] = useState(fmtDate(today));
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState({ available: [], booked: [], all_slots: [] });
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: preselectedService || SERVICES[0].title,
    notes: "",
  });

  // Preselect service when opened from a card
  useEffect(() => {
    if (open && preselectedService) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }
  }, [open, preselectedService]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setSuccess(null);
      setTime("");
    }
  }, [open]);

  // Lock scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fetch slots when date changes
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    setLoadingSlots(true);
    setTime("");
    api
      .get("/slots", { params: { date } })
      .then((res) => {
        if (!cancelled) setSlots(res.data);
      })
      .catch(() => {
        if (!cancelled) toast.error("Couldn't load slots. Try again.");
      })
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [date, open]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Name and phone are required.");
      return;
    }
    if (!time) {
      toast.error("Please pick a time slot.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post("/bookings", {
        ...form,
        email: form.email || undefined,
        date,
        time,
      });
      setSuccess(res.data);
      toast.success("Booking confirmed");
    } catch (err) {
      const msg =
        err?.response?.data?.detail || "Couldn't create booking. Try again.";
      toast.error(typeof msg === "string" ? msg : "Failed to book");
    } finally {
      setSubmitting(false);
    }
  };

  const days = nextNDays(14);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-background/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6"
          onClick={onClose}
          data-testid="booking-overlay"
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl bg-secondary ring-soft overflow-hidden max-h-[92vh] overflow-y-auto"
            data-testid="booking-dialog"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-foreground/60 hover:text-primary z-10"
              aria-label="close"
              data-testid="booking-close"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="p-10 md:p-14 text-center">
                <div
                  className="w-16 h-16 rounded-full border border-primary/50 mx-auto flex items-center justify-center mb-6"
                  data-testid="booking-success"
                >
                  <Check className="w-7 h-7 text-primary" />
                </div>
                <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">
                  Confirmed
                </p>
                <h3 className="font-serif-display text-4xl md:text-5xl tracking-tighter">
                  See you soon,<br />
                  <em className="gold-text">{success.name.split(" ")[0]}.</em>
                </h3>
                <p className="mt-6 text-sm md:text-base text-foreground/70">
                  Your <span className="text-primary">{success.service}</span>{" "}
                  appointment is locked for{" "}
                  <span className="text-primary">{success.date}</span> at{" "}
                  <span className="text-primary">{success.time}</span>.
                </p>
                <p className="mt-3 text-xs text-foreground/50">
                  Booking ref: {success.id.slice(0, 8).toUpperCase()}
                </p>
                <button
                  onClick={onClose}
                  className="mt-10 inline-flex items-center px-6 py-3 text-xs tracking-[0.22em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors"
                  data-testid="booking-close-confirmed"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={submit}
                className="p-8 md:p-12"
                data-testid="booking-form"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-3">
                  — Reserve
                </p>
                <h3 className="font-serif-display text-4xl md:text-5xl tracking-tighter">
                  Book your <em className="gold-text">visit.</em>
                </h3>
                <p className="mt-3 text-sm text-foreground/60 max-w-md">
                  Select a date and time — we&apos;ll confirm instantly. We reach out
                  on phone if anything needs to be rescheduled.
                </p>

                {/* Date picker */}
                <div className="mt-8">
                  <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-3 flex items-center gap-2">
                    <CalendarDays className="w-3.5 h-3.5" /> Choose a date
                  </Label>
                  <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {days.map((d) => {
                      const v = fmtDate(d);
                      const active = v === date;
                      return (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setDate(v)}
                          data-testid={`booking-date-${v}`}
                          className={`flex-shrink-0 min-w-[64px] py-3 px-3 border text-center transition-colors ${
                            active
                              ? "border-primary bg-primary text-primary-foreground"
                              : "border-white/10 hover:border-primary/60 text-foreground/80"
                          }`}
                        >
                          <span className="block text-[10px] tracking-[0.2em] uppercase">
                            {d.toLocaleString("en", { weekday: "short" })}
                          </span>
                          <span className="block font-serif-display text-2xl mt-1">
                            {d.getDate()}
                          </span>
                          <span className="block text-[10px] tracking-widest uppercase mt-0.5">
                            {d.toLocaleString("en", { month: "short" })}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Slots */}
                <div className="mt-8">
                  <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-3 block">
                    Pick a time slot
                  </Label>
                  {loadingSlots ? (
                    <p className="text-sm text-foreground/50">Loading slots…</p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {slots.all_slots.map((s) => {
                        const isBooked = slots.booked.includes(s);
                        const active = time === s;
                        return (
                          <button
                            key={s}
                            type="button"
                            disabled={isBooked}
                            onClick={() => setTime(s)}
                            data-testid={`booking-slot-${s}`}
                            className={`py-2.5 text-sm border transition-colors ${
                              isBooked
                                ? "border-white/5 text-foreground/30 line-through cursor-not-allowed"
                                : active
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-white/15 text-foreground/85 hover:border-primary/60"
                            }`}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Personal fields */}
                <div className="mt-10 grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-2 block">
                      Full Name *
                    </Label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="bg-background border-white/10 focus-visible:ring-primary"
                      data-testid="booking-name"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-2 block">
                      Phone *
                    </Label>
                    <Input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="bg-background border-white/10 focus-visible:ring-primary"
                      data-testid="booking-phone"
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-2 block">
                      Email (optional)
                    </Label>
                    <Input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="bg-background border-white/10 focus-visible:ring-primary"
                      data-testid="booking-email"
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-2 block">
                      Service
                    </Label>
                    <select
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      data-testid="booking-service"
                      className="w-full h-10 bg-background border border-white/10 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.key} value={s.title} className="bg-secondary text-foreground">
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="text-[10px] tracking-[0.3em] uppercase text-foreground/60 mb-2 block">
                      Notes (optional)
                    </Label>
                    <Textarea
                      value={form.notes}
                      onChange={(e) =>
                        setForm({ ...form, notes: e.target.value })
                      }
                      placeholder="Anything we should know in advance?"
                      className="bg-background border-white/10 focus-visible:ring-primary min-h-[90px]"
                      data-testid="booking-notes"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  data-testid="booking-submit"
                  className="mt-10 w-full inline-flex items-center justify-center px-6 py-4 text-xs tracking-[0.28em] uppercase bg-primary text-primary-foreground hover:bg-[#D8B485] transition-colors disabled:opacity-50"
                >
                  {submitting ? "Reserving…" : "Confirm booking"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
