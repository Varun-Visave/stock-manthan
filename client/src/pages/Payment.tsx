import { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Shield } from "lucide-react";

export default function Payment() {
  const [, params] = useRoute("/payment/:plan");
  const plan = params?.plan ? params.plan.charAt(0).toUpperCase() + params.plan.slice(1) : "Monthly";
  const [, setLocation] = useLocation();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("upi");

  const prices: Record<string, number> = {
    "Monthly": 899,
    "Quarterly": 1999,
    "Annual": 5999
  };

  const basePrice = prices[plan] || prices["Monthly"];
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(d => {
        setUser(d.user);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Please log in to continue");
        setLocation("/login");
      });
  }, [setLocation]);

  const handlePayment = async () => {
    if (!user) return;
    setProcessing(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan,
          baseAmount: basePrice,
          gstAmount: gst,
          totalAmount: total
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment failed");

      toast.success(`Welcome to ${plan}! Your access is now active.`);
      setTimeout(() => setLocation("/dashboard"), 1500);
    } catch (err: any) {
      toast.error(err.message);
      setProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen pt-32 flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <main className="min-h-screen pt-32 pb-20 bg-[#fdfaf6] dark:bg-[#101922]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-center mb-10">Secure Checkout</h1>
        
        <div className="grid md:grid-cols-2 gap-10">
          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-medium mb-6">Order Summary</h2>
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <span className="font-medium text-foreground">{plan} Plan</span>
                  <span className="font-bold">₹{basePrice}</span>
                </div>
                <div className="flex justify-between items-center mb-4 pb-4 border-b text-sm text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>+ ₹{gst}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-lg">Total Payable</span>
                  <span className="font-bold text-xl text-primary">₹{total}</span>
                </div>
                
                <div className="bg-primary/5 p-4 rounded-lg mt-6">
                  <h3 className="font-medium text-sm mb-2">Member Details</h3>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Method Dummy */}
          <div>
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>
            <div className="flex w-full overflow-hidden rounded-lg border border-border mb-6">
              <button onClick={() => setActiveTab("upi")} className={`flex-1 py-3 text-sm font-medium ${activeTab === "upi" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>UPI</button>
              <button onClick={() => setActiveTab("netbanking")} className={`flex-1 py-3 text-sm font-medium border-l border-r border-border ${activeTab === "netbanking" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>Net Banking</button>
              <button onClick={() => setActiveTab("card")} className={`flex-1 py-3 text-sm font-medium ${activeTab === "card" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>Card</button>
            </div>
            
            <Card className="border border-border mb-6">
              <CardContent className="p-6 text-center text-muted-foreground text-sm">
                <p className="mb-4">This is a simulated payment gateway. No real charges will happen.</p>
                <div className="flex justify-center text-green-600 mb-2">
                  <Shield className="w-8 h-8" />
                </div>
                <p className="font-medium text-green-600 mb-4">Secure Payment</p>
              </CardContent>
            </Card>

            <Button
              onClick={handlePayment}
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-md text-lg h-14"
              disabled={processing}
            >
              {processing ? "Processing..." : `Confirm Payment of ₹${total}`}
            </Button>
            
            <p className="text-center text-xs text-muted-foreground mt-4">
              For support contact manthanstock31@gmail.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
