import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [, setLocation] = useLocation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", consentGiven: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPasswordStrength = (pass: string) => {
    if (!pass) return { label: "", color: "bg-gray-200" };
    const hasAlpha = /[a-zA-Z]/.test(pass);
    const hasNum = /[0-9]/.test(pass);
    const isLong = pass.length >= 8;
    const isVeryLong = pass.length >= 12;
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    let strength = 0;
    if (isLong) strength += 1;
    if (hasAlpha && hasNum) strength += 1;
    if (isVeryLong || hasSpecial) strength += 1;

    if (strength === 0) return { label: "Weak", color: "bg-red-500" };
    if (strength === 1) return { label: "Weak", color: "bg-red-500" };
    if (strength === 2) return { label: "Medium", color: "bg-yellow-500" };
    return { label: "Strong", color: "bg-green-500" };
  };

  const strength = getPasswordStrength(form.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consentGiven) {
      setError("You must consent to receive communications.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8 || !/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      setError("Password must be at least 8 characters long and contain numbers and letters.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // send only necessary fields
        body: JSON.stringify({
          name: form.name, email: form.email, phone: form.phone, consentGiven: form.consentGiven, password: form.password
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Account created! Please check your email to verify.");
        // Mark for onboarding modal in dashboard
        localStorage.setItem("onboarding_shown", "false");
        setLocation("/verify-pending");
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
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 dark:bg-[#0a0f16]">
      <div className="bg-white dark:bg-card p-8 md:p-10 rounded-xl shadow-sm border border-border w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Join Free</h1>
          <p className="text-muted-foreground mt-2">Create your account to access educational content and community channels.</p>
        </div>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="john@example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="10-digit number" />
          </div>

          <div className="space-y-2 relative">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none pr-10 bg-background text-foreground" 
                value={form.password} 
                onChange={e => setForm({...form, password: e.target.value})} 
                placeholder="Min 8 chars, 1 letter, 1 number" 
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.password && (
              <div className="flex items-center gap-2 mt-1">
                <div className="h-1.5 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.label === 'Weak' ? '33%' : strength.label === 'Medium' ? '66%' : '100%' }}></div>
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">{strength.label}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none bg-background text-foreground" 
              value={form.confirmPassword} 
              onChange={e => setForm({...form, confirmPassword: e.target.value})} 
              placeholder="Confirm password" 
            />
          </div>
          
          <label className="flex items-start space-x-3 cursor-pointer mt-4">
            <input type="checkbox" className="mt-1 w-4 h-4" checked={form.consentGiven} onChange={e => setForm({...form, consentGiven: e.target.checked})} />
            <span className="text-sm text-muted-foreground">I consent to receive communications via email, WhatsApp, and Telegram.</span>
          </label>

          <Button type="submit" disabled={loading} className="w-full py-6 mt-6">
            {loading ? "Registering..." : "Create Free Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-4">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
