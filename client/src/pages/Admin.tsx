import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, User, Eye, Lock } from "lucide-react";

export default function Admin() {
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState<any[]>([]);
  const [webinars, setWebinars] = useState<any[]>([]);
  const [reportForm, setReportForm] = useState({
    type: "Research",
    stockName: "",
    reportDate: "",
    pdfPath: "#",
    sebiDisclosure: true,
  });
  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    content: "",
  });

  const [inviteForm, setInviteForm] = useState({
    subject: "Joining Link for Stock Manthan Webinar",
    body: `Hello [NAME],\n\nThank you for registering for our upcoming masterclass.\n\nDate: [DATE]\nTime: [TIME]\nPlatform: [PLATFORM]\nLink to join: [LINK]\n\nSee you there!\nStock Manthan Team`,
  });

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const loadData = async () => {
    try {
      const uRes = await fetch("/api/admin/members");
      if (uRes.status === 401 || uRes.status === 403) {
        setIsAuthorized(false);
        setLoading(false);
        return;
      }

      const wRes = await fetch("/api/admin/webinars");
      if (!uRes.ok || !wRes.ok) throw new Error("Unauthorized");

      const [uData, wData] = await Promise.all([uRes.json(), wRes.json()]);
      setUsers(uData);
      setWebinars(wData);
      setIsAuthorized(true);
    } catch (e: any) {
      setError("Session expired or unauthorized.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.isAdmin) {
        setIsAuthorized(true);
        loadData();
      } else {
        setLoginError("Invalid admin credentials or not an admin account.");
      }
    } catch {
      setLoginError("Login failed. Check your connection.");
    }
  };

  const handleUpdateRole = async (userId: string, memberType: string) => {
    await fetch("/api/admin/update-member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, memberType }),
    });
    loadData();
  };

  const handleDeleteUser = async (userId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    )
      return;

    await fetch(`/api/admin/members/${userId}`, {
      method: "DELETE",
    });
    loadData();
    if (selectedUser?.id === userId) setSelectedUser(null);
  };
  
  const handleDeleteWebinarAttendee = async (id: string) => {
    if (!confirm("Remove this attendee?")) return;
    await fetch(`/api/admin/webinars/${id}`, { method: "DELETE" });
    loadData();
  };

  const handleUploadReport = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/upload-report", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reportForm),
    });
    alert("Report published successfully!");
    setReportForm({ ...reportForm, stockName: "", reportDate: "" });
  };

  const handlePostAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/announcement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(announcementForm),
    });
    alert("Announcement posted to user dashboards!");
    setAnnouncementForm({ title: "", content: "" });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#101922] p-6">
        <Card className="w-full max-w-md shadow-xl border-t-4 border-t-primary">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-primary h-6 w-6" />
            </div>
            <CardTitle className="text-2xl font-serif">Admin Login</CardTitle>
            <p className="text-muted-foreground text-sm">
              Please enter your administrative credentials
            </p>
          </CardHeader>
          <CardContent>
            {loginError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs mb-4 border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {loginError}
              </div>
            )}
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Admin Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                  value={loginForm.email}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, email: e.target.value })
                  }
                  placeholder="admin@stockmanthan.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  required
                  className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary/20"
                  value={loginForm.password}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </div>
              <Button
                type="submit"
                className="w-full py-6 text-base font-semibold"
              >
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-gray-50 dark:bg-[#101922]">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="flex justify-between items-center bg-white dark:bg-card p-6 rounded-xl border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-serif font-bold text-foreground">
              Admin Control Center
            </h1>
            <p className="text-muted-foreground">
              Manage users, reports, and site-wide broadcasts
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              fetch("/api/logout", { method: "POST" }).then(() =>
                setLocation("/"),
              );
            }}
          >
            Logout
          </Button>
        </div>

        {error && (
          <div className="text-red-500 bg-red-50 p-4 rounded border border-red-100 italic">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="members" className="space-y-6">
              <TabsList className="bg-white dark:bg-card border border-border">
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="reports">Publish Reports</TabsTrigger>
                <TabsTrigger value="announcements">Broadcasting</TabsTrigger>
                <TabsTrigger value="webinars">Webinar Attendees</TabsTrigger>
                <TabsTrigger value="invites">Send Webinar Invite</TabsTrigger>
              </TabsList>

              <TabsContent value="members">
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto text-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="p-3">Name</th>
                            <th className="p-3">Plan</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((u) => (
                            <tr
                              key={u.id}
                              className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${selectedUser?.id === u.id ? "bg-primary/5" : ""}`}
                            >
                              <td className="p-3">
                                <span className="font-semibold block">
                                  {u.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {u.email}
                                </span>
                              </td>
                              <td className="p-3 capitalize">{u.memberType}</td>
                              <td className="p-3 text-right">
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSelectedUser(u)}
                                    title="View Details"
                                  >
                                    <Eye className="h-4 w-4 text-blue-500" />
                                  </Button>
                                  <select
                                    className="px-2 py-1 border rounded text-xs bg-white dark:bg-card outline-none"
                                    value={u.memberType}
                                    onChange={(e) =>
                                      handleUpdateRole(u.id, e.target.value)
                                    }
                                  >
                                    <option value="free">Free</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                  </select>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteUser(u.id)}
                                    title="Delete User"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reports">
                <Card>
                  <CardContent className="p-6">
                    <form
                      className="grid md:grid-cols-2 gap-6"
                      onSubmit={handleUploadReport}
                    >
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Content Category
                          </label>
                          <select
                            className="w-full border p-2 rounded-lg text-sm bg-white dark:bg-card"
                            value={reportForm.type}
                            onChange={(e) =>
                              setReportForm({
                                ...reportForm,
                                type: e.target.value,
                              })
                            }
                          >
                            <option>Research</option>
                            <option>IPO</option>
                            <option>Sector Outlook</option>
                            <option>Coverage Universe</option>
                            <option>Update Log</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Title
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full border p-2 rounded-lg text-sm bg-white dark:bg-card"
                            value={reportForm.stockName}
                            onChange={(e) =>
                              setReportForm({
                                ...reportForm,
                                stockName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            required
                            className="w-full border p-2 rounded-lg text-sm bg-white dark:bg-card"
                            value={reportForm.reportDate}
                            onChange={(e) =>
                              setReportForm({
                                ...reportForm,
                                reportDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="pt-2">
                          <label className="flex items-center gap-3 text-sm font-medium cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-primary rounded"
                              checked={reportForm.sebiDisclosure}
                              onChange={(e) =>
                                setReportForm({
                                  ...reportForm,
                                  sebiDisclosure: e.target.checked,
                                })
                              }
                            />
                            Attach SEBI Disclosure
                          </label>
                        </div>
                        <Button type="submit" className="w-full">
                          Publish Content
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="announcements">
                <Card>
                  <CardContent className="p-6">
                    <form
                      className="space-y-4 max-w-xl"
                      onSubmit={handlePostAnnouncement}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Headline
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full border p-2 rounded-lg text-sm bg-white dark:bg-card"
                          value={announcementForm.title}
                          onChange={(e) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          className="w-full border p-2 rounded-lg text-sm bg-white dark:bg-card"
                          value={announcementForm.content}
                          onChange={(e) =>
                            setAnnouncementForm({
                              ...announcementForm,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button type="submit">Broadcast to All Users</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="invites">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold mb-2 text-primary">
                        Webinar Broadcast
                      </h2>
                      <p className="text-sm text-muted-foreground italic">
                        Send personalized joining details to all{" "}
                        {webinars.length} registrants.
                      </p>
                    </div>
                    <form
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        if (
                          !confirm(
                            `Send this email to all ${webinars.length} registrants?`,
                          )
                        )
                          return;
                        setLoading(true);
                        const res = await fetch(
                          "/api/admin/send-webinar-invite",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              subject: inviteForm.subject,
                              bodyTemplate: inviteForm.body,
                            }),
                          },
                        );
                        setLoading(false);
                        if (res.ok) alert("Invitations sent successfully!");
                        else alert("Failed to send invitations.");
                      }}
                    >
                      <div className="space-y-4">
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                          <h4 className="text-sm font-semibold mb-2">
                            Available Placeholders
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {["[NAME]", "[EMAIL]"].map((p) => (
                              <code
                                key={p}
                                className="bg-white dark:bg-card px-2 py-1 rounded text-xs border border-border"
                              >
                                {p}
                              </code>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Subject
                          </label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-card outline-none"
                            value={inviteForm.subject}
                            onChange={(e) =>
                              setInviteForm({
                                ...inviteForm,
                                subject: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Email Body (HTML supported via line breaks)
                          </label>
                          <textarea
                            required
                            rows={8}
                            className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-card outline-none font-mono text-sm"
                            value={inviteForm.body}
                            onChange={(e) =>
                              setInviteForm({
                                ...inviteForm,
                                body: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full py-6 text-lg font-bold bg-green-600 hover:bg-green-700"
                        >
                          Send Live Invite to {webinars.length} Members
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="webinars">
                <Card>
                  <CardContent className="p-6">
                    <div className="overflow-x-auto text-sm">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b text-muted-foreground">
                            <th className="p-3">Attendee</th>
                            <th className="p-3">Contact</th>
                            <th className="p-3">Date</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {webinars.map((w) => (
                            <tr
                              key={w.id}
                              className="border-b last:border-0 hover:bg-muted/30"
                            >
                              <td className="p-3 font-semibold">{w.name}</td>
                              <td className="p-3">
                                <div>{w.email}</div>
                                <div className="text-[10px] text-muted-foreground">
                                  {w.phone}
                                </div>
                              </td>
                              <td className="p-3 text-muted-foreground text-xs">
                                {new Date(w.registeredAt).toLocaleDateString()}
                              </td>
                              <td className="p-3 text-right">
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteWebinarAttendee(w.id)}>
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card className="sticky top-24 border-primary/20 shadow-lg">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  User Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {selectedUser ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Personal info
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Name:
                          </span>
                          <span className="text-sm font-semibold">
                            {selectedUser.name}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Email:
                          </span>
                          <span className="text-sm font-semibold truncate max-w-[150px]">
                            {selectedUser.email}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-sm text-muted-foreground">
                            Phone:
                          </span>
                          <span className="text-sm font-semibold">
                            {selectedUser.phone}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        Subscription
                      </h3>
                      <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs">Current Plan:</span>
                          <span className="px-2 py-0.5 bg-primary text-white text-[10px] rounded font-bold uppercase">
                            {selectedUser.memberType}
                          </span>
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Member since:{" "}
                          {new Date(
                            selectedUser.createdAt,
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => handleDeleteUser(selectedUser.id)}
                    >
                      Delete This Account
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground italic">
                    <User className="h-12 w-12 mx-auto mb-4 opacity-10" />
                    Select a user from the list to view their full profile
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
