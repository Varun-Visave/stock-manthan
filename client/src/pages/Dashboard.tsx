import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Check, Download, AlertTriangle } from "lucide-react";

export default function Dashboard() {
  const [location, setLocation] = useLocation();
  const [data, setData] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Custom tabs: "research", "upgrade", "billing", "profile"
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get("tab") || "research";
  const [activeTab, setActiveTab] = useState(initialTab);

  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showExpiredModal, setShowExpiredModal] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then(d => {
        setData(d);
        if (d.user) {
          // Check Onboarding
          if (localStorage.getItem("onboarding_shown") === "false") {
            setShowOnboarding(true);
            localStorage.setItem("onboarding_shown", "true");
          }
          
          // Check Expiry Logic
          if (d.user.memberType !== "free" && d.user.subscriptionExpiry) {
            const expiryDate = new Date(d.user.subscriptionExpiry);
            const now = new Date();
            if (expiryDate < now) {
              // Expired
              setShowExpiredModal(true);
              // auto downgrade in UI
              d.user.memberType = "free"; 
            }
          }
        }
        return fetch("/api/user/invoices");
      })
      .then(res => res.json())
      .then(invs => {
        if(Array.isArray(invs)) setInvoices(invs);
      })
      .catch(() => setLocation("/login"))
      .finally(() => setLoading(false));
  }, [setLocation]);

  if (loading) return <div className="min-h-screen flex items-center justify-center pt-20">Loading...</div>;
  if (!data) return null;

  const { user, reports, announcements } = data;
  const isPaid = user.memberType !== "free";

  let daysToExpiry = null;
  if (isPaid && user.subscriptionExpiry) {
    const diffTime = new Date(user.subscriptionExpiry).getTime() - new Date().getTime();
    daysToExpiry = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  const handleSubscribe = (plan: string) => {
    setLocation(`/payment/${plan}`);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-[#fdfaf6] dark:bg-[#101922]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-8">
        
        {/* Banners */}
        {!user.emailVerified && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg shadow-sm flex justify-between items-center">
            <p className="text-yellow-700 text-sm font-medium">Please verify your email address to secure your account.</p>
          </div>
        )}

        {/* Announcements / Notice Board */}
        {Array.isArray(announcements) && announcements.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Notice Board
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {announcements.map((ann: any) => (
                <div key={ann.id} className="min-w-[300px] md:min-w-[400px] bg-white dark:bg-card p-5 rounded-xl border border-primary/20 shadow-sm">
                  <h3 className="font-bold text-foreground mb-1">{ann.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{ann.content}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-[10px] text-muted-foreground font-medium uppercase">{new Date(ann.date).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isPaid && activeTab !== "upgrade" && (
          <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg flex justify-between items-center max-sm:flex-col gap-4">
            <p className="text-foreground text-sm font-medium">You are on the Free plan. Upgrade to access full research reports, IPO verdicts, and sector outlooks.</p>
            <Button size="sm" onClick={() => setActiveTab("upgrade")}>Upgrade Now</Button>
          </div>
        )}

        {daysToExpiry !== null && daysToExpiry <= 7 && daysToExpiry > 0 && (
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg flex justify-between items-center max-sm:flex-col gap-4">
            <p className="text-orange-800 text-sm font-medium text-left">
              <AlertTriangle className="inline-block w-4 h-4 mr-2 mb-1" />
              Your {user.memberType} subscription expires in {daysToExpiry} days.
            </p>
            <Button size="sm" variant="destructive" onClick={() => setActiveTab("upgrade")}>Renew Now</Button>
          </div>
        )}

        <div className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}</h1>
            <p className="text-muted-foreground mt-1">
              Member Status: <span className="font-semibold text-primary capitalize">{user.memberType}</span>
              {user.subscriptionExpiry && isPaid && ` (Valid till: ${new Date(user.subscriptionExpiry).toLocaleDateString()})`}
            </p>
          </div>
        </div>

        {/* Custom Tabs */}
        <div className="flex border-b border-border overflow-x-auto gap-8 text-sm font-medium">
          {["research", "upgrade", "billing", "profile"].map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              className={`pb-3 capitalize transition-colors whitespace-nowrap ${activeTab === tab ? "border-b-2 border-primary text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              {tab === "upgrade" ? "Upgrade Plan" : tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-2">
          
          {/* RESEARCH TAB */}
          {activeTab === "research" && (
            <>
              {!isPaid ? (
                <div className="bg-white dark:bg-card p-12 text-center rounded-xl shadow-sm border border-border">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
                  <h2 className="text-2xl font-bold mb-4">Research Access Locked</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Upgrade to a paid plan to access our full equity research reports, IPO analysis, and sector outlook views.
                  </p>
                  <Button size="lg" onClick={() => setActiveTab("upgrade")}>View Subscription Plans</Button>
                </div>
              ) : (
                <div className="space-y-8">
                  {["Research", "IPO", "Sector Outlook", "Coverage Universe", "Update Log"].map(category => (
                    <div key={category} className="bg-white dark:bg-card p-6 rounded-xl shadow-sm border border-border">
                      <h3 className="text-xl font-bold text-foreground mb-4 border-b pb-2">{category} Reports</h3>
                      <div className="space-y-4">
                        {reports.filter((r: any) => r.type === category).map((report: any) => (
                          <div key={report.id} className="p-4 border border-border rounded-lg hover:border-primary/30 transition shadow-sm">
                            <div className="flex justify-between items-start flex-wrap gap-4">
                              <div>
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-lg text-primary">{report.stockName}</h4>
                                  <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">v{report.version}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">Published: {new Date(report.publishedAt).toLocaleDateString()}</p>
                                {report.sebiDisclosure && (
                                  <div className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 p-2 rounded mt-2 border border-gray-200 dark:border-gray-700">
                                    <span className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">SEBI INH000XXXXXX - Mandatory Risk Disclosure</span>
                                    This report is for informational purposes only and does not constitute investment advice.
                                  </div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" asChild>
                                  <a href={report.pdfPath} target="_blank" rel="noreferrer">View Online</a>
                                </Button>
                                <Button size="sm" asChild>
                                  <a href={report.pdfPath} download>Download PDF</a>
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                        {reports.filter((r: any) => r.type === category).length === 0 && (
                          <p className="text-muted-foreground text-sm italic">No reports available in this category yet.</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* UPGRADE TAB */}
          {activeTab === "upgrade" && (
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Monthly", price: 899, },
                { name: "Quarterly", price: 1999, },
                { name: "Annual", price: 5999, isBest: true }
              ].map(plan => (
                <Card key={plan.name} className={`relative flex flex-col ${plan.isBest ? 'border-2 border-primary shadow-md' : 'border border-border'}`}>
                  {plan.isBest && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Best Value</div>}
                  <CardContent className="p-6 pt-8 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold justify-center flex mb-2">{plan.name}</h3>
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold text-foreground">₹{plan.price}</span>
                      <span className="text-muted-foreground text-sm block mt-1">+ GST</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0" /> Full research reports</li>
                      <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0" /> IPO verdicts</li>
                      <li className="flex gap-2 text-sm"><Check className="w-4 h-4 text-primary shrink-0" /> Sector Outlook</li>
                    </ul>
                    
                    {user.memberType === plan.name ? (
                      <Button disabled className="w-full bg-gray-400">Current Plan</Button>
                    ) : (
                      <Button onClick={() => handleSubscribe(plan.name)} className="w-full text-white">
                        Proceed to Payment
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* BILLING TAB */}
          {activeTab === "billing" && (
            <div className="bg-white dark:bg-card rounded-xl p-6 border border-border shadow-sm overflow-x-auto">
              <h2 className="text-xl font-bold mb-6">Billing History</h2>
              {invoices.length === 0 ? (
                <p className="text-muted-foreground italic text-center py-6">No past payments found.</p>
              ) : (
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b text-sm text-muted-foreground">
                      <th className="pb-3 px-2">Date</th>
                      <th className="pb-3 px-2">Invoice #</th>
                      <th className="pb-3 px-2">Plan</th>
                      <th className="pb-3 px-2">Amount</th>
                      <th className="pb-3 px-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(inv => (
                      <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30">
                        <td className="py-4 px-2 text-sm">{new Date(inv.date).toLocaleDateString()}</td>
                        <td className="py-4 px-2 text-sm font-medium">{inv.invoiceNumber}</td>
                        <td className="py-4 px-2 text-sm capitalize">{inv.plan}</td>
                        <td className="py-4 px-2 text-sm">₹{inv.totalAmount}</td>
                        <td className="py-4 px-2 text-right">
                          <Button variant="ghost" size="sm" className="text-primary gap-2" onClick={() => toast.info("PDF downloading is coming soon!")}>
                            <Download className="w-4 h-4" /> Download PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="max-w-2xl bg-white dark:bg-card border border-border shadow-sm rounded-xl p-6 md:p-8">
              <h2 className="text-xl font-bold mb-6">Profile Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="font-medium text-foreground">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="font-medium text-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground mt-1">Contact support to change email.</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="font-medium text-foreground">{user.phone}</p>
                </div>
                <div className="pt-6 border-t border-border mt-6">
                  <h3 className="font-bold mb-4">Security</h3>
                  <Button variant="outline" onClick={() => toast.info("Password change feature coming soon!")}>Change Password</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ONBOARDING MODAL */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-card p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95">
            <h3 className="text-2xl font-serif font-bold text-center text-primary">Welcome, {user.name.split(" ")[0]}!</h3>
            <p className="text-muted-foreground text-center">You now have free access to our investor community. Join below to get market updates instantly.</p>
            <div className="space-y-3 pt-2">
              <a href="https://t.me/your_channel" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#0088cc] text-white py-3 rounded-lg font-medium hover:bg-[#0077b3] transition">
                Join Telegram Channel
              </a>
              <a href="https://whatsapp.com/channel/your_channel" target="_blank" rel="noreferrer" className="flex items-center justify-center w-full bg-[#25D366] text-white py-3 rounded-lg font-medium hover:bg-[#20bd5a] transition">
                Join WhatsApp Channel
              </a>
            </div>
            <div className="pt-4 border-t border-border space-y-3">
              <Button onClick={() => { setShowOnboarding(false); setActiveTab("upgrade"); }} className="w-full bg-primary hover:bg-primary/90 text-white">Explore Paid Plans</Button>
              <Button onClick={() => setShowOnboarding(false)} variant="ghost" className="w-full text-muted-foreground">Dismiss</Button>
            </div>
          </div>
        </div>
      )}

      {/* EXPIRED SUBSCRIPTION MODAL */}
      {showExpiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-card p-8 rounded-2xl max-w-sm w-full shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95">
            <div className="mx-auto w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><AlertTriangle className="w-8 h-8" /></div>
            <h3 className="text-2xl font-bold text-foreground">Subscription Expired</h3>
            <p className="text-muted-foreground text-sm">Your premium access has expired. Renew to regain access to deep research reports and insights.</p>
            <Button onClick={() => { setShowExpiredModal(false); setActiveTab("upgrade"); }} className="w-full mt-4 bg-primary text-white">Renew Now</Button>
          </div>
        </div>
      )}

    </div>
  );
}
