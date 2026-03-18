import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Check } from "lucide-react";

export default function Checkout() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const plan = searchParams.get("plan") || "Monthly";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Basic pre-fill if available
    fetch("/api/dashboard")
       .then(r => {
          if (r.ok) return r.json();
          throw new Error("unauthed");
       })
       .then(d => {
          if (d.user) {
             setFormData({ name: d.user.name, email: d.user.email, phone: d.user.phone || "" });
          }
       })
       .catch(e => { /* Ignore, just let them type */ });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, plan }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");

      toast.success("Payment successful! You are now a premium member.");
      setTimeout(() => setLocation("/dashboard"), 1500);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const prices: Record<string, string> = {
    "Monthly": "₹899 + GST",
    "Quarterly": "₹1,999 + GST",
    "Annual": "₹5,999 + GST"
  };

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#fdfaf6] dark:bg-[#101922]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-center mb-10">Complete Your Subscription</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <span className="font-medium text-foreground">{plan} Plan</span>
                  <span className="font-bold text-lg">{prices[plan] || "₹0"}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-500 shrink-0"/><span>Full research reports (organized by stock)</span></li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-500 shrink-0"/><span>Price targets and buy/sell recommendations</span></li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-500 shrink-0"/><span>IPO reports and verdict</span></li>
                  <li className="flex items-start space-x-2 text-sm text-muted-foreground"><Check className="w-4 h-4 text-green-500 shrink-0"/><span>Premium Community Access</span></li>
                </ul>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm font-medium text-primary text-center">Simulated Payment Environment</p>
                  <p className="text-xs text-muted-foreground text-center mt-1">No real charges will be made. Click the button below to complete the flow.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Form */}
          <div>
            <h2 className="text-xl font-medium mb-6">Your Details</h2>
            <form onSubmit={handleCheckout} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white shadow-md text-lg h-12"
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay ${prices[plan].split(" ")[0]} Now`}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
