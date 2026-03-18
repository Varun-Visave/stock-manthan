import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Webinar() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/webinar-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || "Registration failed");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24 bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-xl overflow-hidden shadow-md border border-border">
        
        {/* Info Side */}
        <div className="bg-primary text-white p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-4 leading-tight">Value Investing Masterclass</h1>
          <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
            Join our exclusive webinar to learn the core principles of value investing. Discover how to evaluate businesses, find long-term growth opportunities, and build a resilient portfolio.
          </p>
          <div className="space-y-4 font-medium">
            <div className="bg-white/10 p-4 rounded-lg backdrop-blur text-sm text-center">
              Webinar link will be shared via our Telegram and WhatsApp channels. Make sure you register to gain access!
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="p-10 flex flex-col justify-center">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
              <h2 className="text-2xl font-bold text-foreground">You're Registered!</h2>
              <p className="text-muted-foreground">Please check your email for the confirmation. We will send the webinar link to the communication channels prior to the event.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6 text-foreground">Secure your spot</h2>
              {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="10-digit number" />
                </div>
                
                <Button type="submit" disabled={loading} className="w-full py-6 mt-4 text-base">
                  {loading ? "Completing Registration..." : "Register Now"}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
