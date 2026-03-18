import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        if (data.isAdmin) {
          setLocation("/admin");
        } else {
          setLocation("/dashboard");
        }
      } else {
        setError(data.error || "Login failed");
        if (res.status === 403) {
          // Provide resend option
          setError(<div className="flex flex-col gap-2">
            <span>{data.error}</span>
            <button 
              type="button" 
              className="text-primary underline text-xs w-fit"
              onClick={async () => {
                await fetch("/api/resend-verification", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: form.email })
                });
                setError("Verification email resent! Check your inbox.");
              }}
            >
              Resend verification email
            </button>
          </div> as any);
        }
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#0a0f16]">
      <div className="bg-white dark:bg-card p-10 rounded-xl shadow-sm border border-border w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Member Login</h1>
          <p className="text-muted-foreground mt-2">Access your research and insights.</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium">Password</label>
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot Password?</Link>
            </div>
            <input type="password" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" />
          </div>

          <Button type="submit" disabled={loading} className="w-full py-6 mt-6">
            {loading ? "Authenticating..." : "Login"}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
