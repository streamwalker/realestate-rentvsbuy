import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional(),
  persona: z.string().max(60).optional(),
  budget: z.string().max(60).optional(),
  message: z.string().trim().max(2000).optional(),
});

interface Props {
  source?: string;
  variant?: "full" | "compact";
}

export const LeadForm = ({ source = "homepage", variant = "full" }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    persona: "",
    budget: "",
    message: "",
    website: "", // honeypot
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = FormSchema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast({ title: "Please check your info", description: first ?? "Invalid input", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { ...form, source_page: source },
      });
      if (error) throw error;
      navigate("/thank-you");
    } catch (err) {
      console.error(err);
      toast({
        title: "Could not send",
        description: "Please try again or call Emily directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input type="text" name="website" value={form.website} onChange={onChange("website")}
        className="absolute -left-[9999px] opacity-0" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className={variant === "full" ? "grid sm:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" required maxLength={100} value={form.name} onChange={onChange("name")} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" required maxLength={255} value={form.email} onChange={onChange("email")} className="mt-1.5" />
        </div>
      </div>

      {variant === "full" && (
        <>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" maxLength={40} value={form.phone} onChange={onChange("phone")} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="budget">Budget Range</Label>
              <Select value={form.budget} onValueChange={(v) => setForm((f) => ({ ...f, budget: v }))}>
                <SelectTrigger id="budget" className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-200k">Under $200K</SelectItem>
                  <SelectItem value="200-300k">$200K – $300K</SelectItem>
                  <SelectItem value="300-500k">$300K – $500K</SelectItem>
                  <SelectItem value="500k-1m">$500K – $1M</SelectItem>
                  <SelectItem value="1m-plus">$1M+</SelectItem>
                  <SelectItem value="not-sure">Not sure yet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="persona">What describes you best?</Label>
            <Select value={form.persona} onValueChange={(v) => setForm((f) => ({ ...f, persona: v }))}>
              <SelectTrigger id="persona" className="mt-1.5"><SelectValue placeholder="Select…" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="first-time">First-Time Buyer</SelectItem>
                <SelectItem value="relocating">Moving to San Antonio</SelectItem>
                <SelectItem value="military">Military / Veteran</SelectItem>
                <SelectItem value="upgrading">Upgrading</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="exploring">Just Exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" maxLength={2000} rows={variant === "full" ? 4 : 3}
          placeholder="Tell Emily what you're working on…" value={form.message} onChange={onChange("message")} className="mt-1.5" />
      </div>

      <Button type="submit" disabled={submitting} size="lg"
        className="w-full bg-gold hover:bg-gold/90 text-navy font-semibold shadow-gold">
        {submitting ? "Sending…" : "Send Emily a Message →"}
      </Button>
      <p className="text-[11px] text-foreground/60 text-center">
        We respect your privacy. Your info goes to Emily Russell only — never sold or shared.
      </p>
    </form>
  );
};
