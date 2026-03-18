import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Instagram,
  Linkedin,
  MessageCircle
} from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* SEBI Registration */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">
              SEBI Registered Firm
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              SEBI Registered Research Analyst – INH000014128<br></br>
              Educational content only. No personalised investment advice.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <Link href="/compliance/sebi-disclosure" className="text-primary hover:underline">
                SEBI Disclosure
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/conflict-of-interest" className="text-primary hover:underline">
                Conflict of Interest
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/research-methodology" className="text-primary hover:underline">
                Research Methodology
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/risk-disclosure" className="text-primary hover:underline">
                Risk Disclosure
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/grievance-redressal" className="text-primary hover:underline">
                Grievance Redressal
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/refund-policy" className="text-primary hover:underline">
                Refund Policy
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link href="/compliance/terms-and-conditions" className="text-primary hover:underline">
                Terms & Conditions
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">
              Stay Updated
            </h4>

            <form onSubmit={handleSubscribe} className="flex gap-2 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />

              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60"
                disabled={subscribed}
              >
                {subscribed ? "Subscribed!" : "Subscribe"}
              </button>
            </form>

            <div className="flex justify-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>


          {/* Contact */}
          <div>
            <h4 className="font-serif font-bold text-foreground mb-4">
              Contact Us
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>support@stockmanthan.com</p>
              <p>Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mb-8" />



        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Stock Manthan Research. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
