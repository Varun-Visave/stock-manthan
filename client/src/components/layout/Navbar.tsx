import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, TrendingUp, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";


const getNavLinks = (user: any) => {
  const baseLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Research Services" },
    { href: "/philosophy", label: "Philosophy" },
    { href: "/community", label: "Community" },
    { href: "/webinar", label: "Webinar" },
  ];
  return baseLinks;
};

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.user && setUser(d.user))
      .catch(() => {});
  }, [location]); // re-check if location changes

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    setUser(null);
    setLocation("/");
  };

  const navLinks = getNavLinks(user);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-4 rounded-2xl bg-background/70 backdrop-blur-md border border-white/20 shadow-lg">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/" data-testid="link-home-logo">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 rounded-xl gradient-warm-blue flex items-center justify-center shadow-md">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-xl font-serif font-bold text-foreground">
                  Stock Manthan
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Button>
                </Link>
              ))}
              {!user ? (
                <Link href="/login">
                  <Button
                    variant="ghost"
                    className={`relative px-4 py-2 text-sm font-medium transition-colors ${location === "/login" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Login
                    {location === "/login" && (
                      <motion.div layoutId="navbar-indicator" className="absolute bottom-0 left-2 right-2 h-0.5 bg-primary rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                    )}
                  </Button>
                </Link>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative px-4 py-2 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
                      {user.name.split(" ")[0]}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLocation("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 hover:text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <Link key={"Services"} href={"/services"}>
                <Button
                  variant="default"
                  size="sm"
                  data-testid="button-get-started"
                  className="gradient-warm-blue border-0 shadow-md hover:shadow-lg transition-shadow"
                >
                  Get Started
                </Button>
              </Link>
              {user ? (
                <Link key={"Dashboard"} href={"/dashboard"}>
                  <Button
                    variant="default"
                    size="sm"
                    className="gradient-warm-blue border-0 shadow-md hover:shadow-lg transition-shadow"
                  >
                    My Dashboard
                  </Button>
                </Link>
              ) : (
                <Link key={"Register"} href={"/register"}>
                  <Button
                    variant="default"
                    size="sm"
                    data-testid="button-register"
                    className="gradient-warm-blue border-0 shadow-md hover:shadow-lg transition-shadow"
                  >
                    Join Free
                  </Button>
                </Link>
              )}
            </div>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 rounded-2xl bg-background/95 backdrop-blur-md border border-white/20 shadow-lg overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location === link.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted text-muted-foreground"
                        }`}
                    >
                      {link.label}
                    </button>
                  </Link>
                ))}
                <Button
                  className="w-full mt-4 gradient-warm-blue border-0"
                  data-testid="button-mobile-get-started"
                >
                  Get Started
                </Button>
                {user ? (
                  <>
                    <Link href="/dashboard">
                      <Button className="w-full mt-2 gradient-warm-blue border-0">My Dashboard</Button>
                    </Link>
                    <Button variant="outline" className="w-full mt-2 border-red-500 text-red-500 hover:bg-red-50" onClick={handleLogout}>Logout</Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full mt-2" data-testid="button-mobile-login">Login</Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full mt-2 gradient-warm-blue border-0" data-testid="button-mobile-register">Join Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}