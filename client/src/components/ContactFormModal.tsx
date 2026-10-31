import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { AlertCircle, ArrowRight, CheckCircle, Loader2, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

export const contactProjectTypes = [
  "Private / Residential",
  "Commercial / Hospitality",
  "Tree Re-Use / Sawmilling",
  "Forestry / Tree Service",
  "CAD, CNC, Laser Services",
  "CNC Quote",
  "Laser Quote",
  "Partnership / Collaboration",
  "Other",
];

type ContactFormModalProps = {
  subject: string;
  onClose: () => void;
};

export function ContactFormModal({ subject, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitMutation = trpc.contact.submit.useMutation();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmitting) onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isSubmitting, onClose]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const result = await submitMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      });
      setSuccessMessage(result.message);
      setFormData({ name: "", email: "", phone: "", subject, message: "" });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setFormData({ name: "", email: "", phone: "", subject, message: "" });
    setSuccessMessage(null);
    setErrorMessage(null);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-6 sm:items-center sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl border-2 border-black bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          aria-label="Close message form"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center border border-black text-[#1b1612] transition-colors hover:bg-[#f0ebe2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#217938] disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 id="contact-modal-title" className="pr-12 font-display text-2xl font-semibold text-[#1b1612]">
          Your Information
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#6d5d50]">
          Tell us about your project, and we'll get back to you within 24-48 hours.
        </p>

        {successMessage && (
          <div className="mt-4 flex items-start gap-3 border border-green-200 bg-green-50 p-4">
            <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
            <p className="text-sm font-semibold text-green-800">{successMessage}</p>
          </div>
        )}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-3 border border-red-200 bg-red-50 p-4">
            <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
            <p className="text-sm font-semibold text-red-800">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-name" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">Full Name</label>
              <input id="modal-name" name="name" type="text" value={formData.name} onChange={handleInputChange} required disabled={isSubmitting} placeholder="John Doe" className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50" />
            </div>
            <div>
              <label htmlFor="modal-email" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">Email Address</label>
              <input id="modal-email" name="email" type="email" value={formData.email} onChange={handleInputChange} required disabled={isSubmitting} placeholder="john@example.com" className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="modal-phone" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">Phone Number</label>
              <input id="modal-phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} disabled={isSubmitting} placeholder="(512) 555-0000" className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50" />
            </div>
            <div>
              <label htmlFor="modal-subject" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">Subject</label>
              <select id="modal-subject" name="subject" value={formData.subject} onChange={handleInputChange} required disabled={isSubmitting} className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50">
                <option value="">Select a subject...</option>
                {contactProjectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="modal-message" className="block text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612]">Message</label>
            <textarea id="modal-message" name="message" value={formData.message} onChange={handleInputChange} required disabled={isSubmitting} rows={4} placeholder="Tell us about your project..." className="mt-2 w-full border border-[#d7a469] bg-white px-3 py-2 text-sm text-[#1b1612] placeholder-[#a08860] focus:border-[#d7a469] focus:outline-none focus:ring-1 focus:ring-[#d7a469] disabled:opacity-50" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={isSubmitting} className="flex-1 inline-flex items-center justify-center rounded-sm bg-[#217938] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#1a5a2a] disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : <>Send Message<ArrowRight className="ml-2 h-4 w-4" /></>}
            </button>
            <button type="button" onClick={handleClear} disabled={isSubmitting} className="flex-1 inline-flex items-center justify-center rounded-sm border border-[#d7a469] bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#1b1612] transition-colors duration-300 hover:bg-[#f0ebe2] disabled:cursor-not-allowed disabled:opacity-50">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
}

type ContactFormTriggerProps = {
  subject: string;
  children: ReactNode;
  className?: string;
};

export function ContactFormTrigger({ subject, children, className }: ContactFormTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>
      {isOpen && <ContactFormModal subject={subject} onClose={() => setIsOpen(false)} />}
    </>
  );
}
