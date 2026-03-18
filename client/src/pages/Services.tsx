import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { motion, type Variants } from "framer-motion";
import { AlertTriangle, Check, FileText, Mail, Shield } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { AnimatedGridPattern } from "../components/ui/gridPattern";


export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className
      )}
      {...props}
    />
  );
}

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Individual card animation
export const cardFadeUp: Variants = {
  initial: {
    opacity: 0,
    y: 28,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut" as const,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

const listContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const badge: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function ServicesPage() {
  const [, setLocation] = useLocation();
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard")
      .then(r => r.ok ? r.json() : null)
      .then(d => d?.user && setUser(d.user))
      .catch(() => {});
  }, []);

  const handleSubscribe = (plan: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (user.memberType === "free") {
      setLocation("/dashboard?tab=upgrade");
      return;
    }
    if (user.memberType === plan) {
      return; // Already on this plan
    }
    setLocation(`/payment/${plan}`);
  };

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email)) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/; // Must start with 6-9, exactly 10 digits
    if (!phoneRegex.test(contactForm.phone)) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          setContactForm({ name: "", email: "", phone: "", message: "" });
          setSubmitStatus("idle");
        }, 2500);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 3000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }
  };

  const title = "Premium Research Services";
  const MotionCard = motion(Card);
  const MotionButton = motion(Button);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      {/* <section className="bg-primary text-primary-foreground py-20 md:py-24 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn("inset-x-0 inset-y-0 h-full w-full skew-y-12")}
        />
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight font-inter ">
            Premium Research Services
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed muted-foreground">
            Rational research for disciplined long-term investors
          </p>
        </div>
      </section> */}
      <section className="bg-primary text-primary-foreground py-20 md:py-24 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn("inset-x-0 inset-y-0 h-full w-full skew-y-12")}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10"
        >

          <motion.h1
            className="text-4xl md:text-6xl text-white font-bold mb-6 leading-tight font-inter flex flex-wrap justify-center gap-x-3"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {
              title.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={textVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-xl text-primary-foreground/90 leading-relaxed"
          >
            Rational research for disciplined long-term investors
          </motion.p>
        </motion.div>
      </section>


      {/* Section 1: Introduction (No Selling) */}
      {/* <section className="py-20 md:py-24">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="space-y-8 text-center">
              <p className="text-xl md:text-2xl text-foreground leading-relaxed">
                Premium research is not for everyone. It is designed for investors
                who have already decided to take a long-term, rational approach to
                wealth creation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                There are no promises here. No guaranteed returns. No magic
                formulas. Just rigorous analysis, business fundamentals, and
                transparent reasoning.
              </p>
            </div>
          </div>
        </section> */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="space-y-8 text-center">
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-foreground leading-relaxed"
            >
              Premium research is not for everyone. It is designed for investors
              who have already decided to take a long-term, rational approach to
              wealth creation.
            </motion.p>

            <motion.p
              variants={fadeUp}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              There are no promises here. No guaranteed returns. No magic formulas.
              Just rigorous analysis, business fundamentals, and transparent
              reasoning.
            </motion.p>
          </div>
        </motion.div>
      </section>


      {/* Section 2: What Subscribers Receive */}
      <section className="py-20 md:py-24 bg-[url('/trial.png')] bg-contain bg-no-repeat bg-center bg-gray-50" >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">

          <div className="space-y-12">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-foreground text-center">
                What Subscribers Receive
              </h2>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 gap-6"
            >
              {[
                {
                  title: "Research-Backed Stock Ideas",
                  desc:
                    "In-depth fundamental analysis of quality businesses with long-term potential",
                },
                {
                  title: "Detailed Company Reports",
                  desc:
                    "Comprehensive reports with financials, moat analysis, and valuation frameworks",
                },
                {
                  title: "Sector & Thematic Views",
                  desc:
                    "Industry-level analysis and themes for portfolio construction",
                },
                {
                  title: "Mutual Fund Insights",
                  desc:
                    "Portfolio reviews and fund selection guidance",
                },
                {
                  title: "IPO Analysis",
                  desc:
                    "Objective analysis of new listings and fair valuations",
                },
                {
                  title: "Quarterly Updates",
                  desc:
                    "Ongoing tracking of recommended ideas and portfolio reviews",
                },
              ].map((item, i) => (
                <MotionCard
                  key={i}
                  variants={cardFadeUp}
                  whileHover={{
                    y: -4,
                    boxShadow: "0px 12px 24px rgba(0,0,0,0.06)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="border border-border bg-white shadow-sm"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-primary mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Section 3: Who It Is For / Not For */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-3xl md:text-4xl font-medium text-text-primary text-center"
            >
              Is This Right for You?
            </motion.h2>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-8">

              {/* Who Should Subscribe */}
              <MotionCard
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="border-2 border-primary/30 bg-white shadow-sm"
              >
                <CardContent className="p-10 space-y-6">
                  <h3 className="text-2xl font-medium text-primary">
                    Who Should Subscribe
                  </h3>

                  <motion.ul
                    variants={listContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4 text-foreground"
                  >
                    {[
                      "Long-term investors with a 5+ year horizon",
                      "Those who want to understand businesses fundamentally",
                      "Investors who prefer quality over quantity",
                      "Those comfortable with market volatility",
                      "Independent thinkers who value research-backed logic",
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        variants={listItem}
                        className="flex items-start space-x-3"
                      >
                        <span className="text-primary mt-1 font-medium">✓</span>
                        <span className="leading-relaxed">{text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </MotionCard>

              {/* Who Should NOT Subscribe */}
              <MotionCard
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                className="border-2 border-muted bg-white shadow-sm"
              >
                <CardContent className="p-10 space-y-6">
                  <h3 className="text-2xl font-medium text-primary">
                    Who Should NOT Subscribe
                  </h3>

                  <motion.ul
                    variants={listContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-4 text-foreground"
                  >
                    {[
                      "Those expecting guaranteed returns or quick profits",
                      "Traders looking for frequent tips or intraday calls",
                      "Investors needing immediate results",
                      "Those seeking ready-made buy/sell signals without understanding",
                      "Anyone looking for personalized portfolio management",
                    ].map((text, i) => (
                      <motion.li
                        key={i}
                        variants={listItem}
                        className="flex items-start space-x-3"
                      >
                        <span className="text-muted-foreground mt-1 font-medium">
                          ✗
                        </span>
                        <span className="leading-relaxed">{text}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </CardContent>
              </MotionCard>
            </div>

            {/* Reminder */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <Card className="border border-border bg-muted/50">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <AlertTriangle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <p className="font-medium text-primary">
                        Important Reminder
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>No promises. No guaranteed returns.</strong> We provide
                        research and analysis. Investment decisions and outcomes
                        remain your responsibility. Past performance is not
                        indicative of future results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Section 4: Transparent Pricing */}
      <section id="pricing" className="py-20 md:py-24 bg-muted/30" >
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">

            {/* Heading */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
                Transparent Pricing
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple. Clear. No hidden costs.
              </p>
            </motion.div>

            {/* Cards */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >

              {/* Quarterly */}
              <MotionCard
                variants={card}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="border-2 border-border bg-white hover:border-primary/50 shadow-sm"
              >
                <CardContent className="p-10 space-y-6">
                  <div className="text-center space-y-4 pb-6 border-b border-border">
                    <h3 className="text-2xl font-medium text-primary">Quarterly</h3>
                    <div>
                      <div className="text-5xl font-medium text-foreground">
                        ₹4,999
                      </div>
                      <div className="text-muted-foreground mt-1">
                        /3 months
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "All research reports",
                      "Stock ideas & updates",
                      "Sector analysis",
                      "IPO & MF views",
                      "Email support",
                    ].map((text, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <MotionButton
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-primary hover:bg-primary/90 mt-6"
                  >
                    Subscribe Quarterly
                  </MotionButton>
                </CardContent>
              </MotionCard>

              {/* Annual */}
              <MotionCard
                variants={card}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="border-2 border-primary bg-white relative shadow-md"
              >
                <motion.div
                  variants={badge}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 text-sm font-medium rounded-full"
                >
                  Best Value
                </motion.div>

                <CardContent className="p-10 space-y-6">
                  <div className="text-center space-y-4 pb-6 border-b border-border">
                    <h3 className="text-2xl font-medium text-primary">Annual</h3>
                    <div>
                      <div className="text-5xl font-medium text-foreground">
                        ₹15,999
                      </div>
                      <div className="text-muted-foreground mt-1">/year</div>
                      <div className="text-sm text-primary mt-2">
                        Save ₹4,000 vs quarterly
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {[
                      "All research reports",
                      "Stock ideas & updates",
                      "Sector analysis",
                      "IPO & MF views",
                      "Priority email support",
                    ].map((text, i) => (
                      <li key={i} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-primary" />
                        <span className="text-sm text-foreground">{text}</span>
                      </li>
                    ))}
                  </ul>

                  <MotionButton
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-primary hover:bg-primary/90 mt-6"
                  >
                    Subscribe Annually
                  </MotionButton>
                </CardContent>
              </MotionCard>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 5: Compliance & Disclosures */}
      <section className="py-20 md:py-24 border-t-2 border-primary/10 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none
    bg-[url('/grid.png')]
    bg-repeat
    bg-[size:24px_24px]
    opacity-10 " />

        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <Shield className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
                SEBI Registration & Compliance
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Transparency, accountability, and investor protection
              </p>
            </div>

            {/* SEBI Registration & Grievance */}
            <div className="grid md:grid-cols-2 gap-8 ">
              <Card className="border border-primary/30 bg-white shadow-sm">
                <CardContent className="p-10 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-primary">
                      SEBI Registration
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">
                        Registration Number
                      </p>
                      <p className="font-medium text-foreground">
                        INH000XXXXXX
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Registered Name</p>
                      <p className="font-medium text-foreground">
                        Stock Manthan Research Services
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Valid Until</p>
                      <p className="font-medium text-foreground">
                        December 31, 2028
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-primary/30 bg-white shadow-sm">
                <CardContent className="p-10 space-y-5">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-primary">
                      Grievance Redressal
                    </h3>
                  </div>

                  <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium text-foreground">
                        grievance@stockmanthan.com
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium text-foreground">
                        +91 XXXXX XXXXX
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-medium text-foreground">
                        Within 7 working days
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Risk Disclosures */}
            <Card className="border border-border bg-white shadow-sm">
              <CardContent className="p-10 space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium text-primary">
                    Mandatory Risk Disclosures
                  </h3>
                </div>

                <div className="space-y-5 text-sm text-foreground leading-relaxed">
                  <div className="space-y-2">
                    <p className="font-medium text-primary">
                      1. No Guaranteed Returns
                    </p>
                    <p className="text-muted-foreground">
                      Stock market investments are subject to market risks.
                      There is no guarantee of profits or returns on any
                      investment recommendation provided.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-primary">
                      2. General Research Only
                    </p>
                    <p className="text-muted-foreground">
                      All research and recommendations provided by Stock Manthan
                      are general in nature and do not constitute personalized
                      investment advice tailored to your specific financial
                      situation.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-primary">
                      3. Investment Risks
                    </p>
                    <p className="text-muted-foreground">
                      Equity investments carry inherent risks including market
                      volatility, business-specific risks, economic and
                      regulatory changes, liquidity risk, and possibility of
                      partial or complete capital loss.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-primary">
                      4. Independent Decision
                    </p>
                    <p className="text-muted-foreground">
                      All investment decisions remain your sole responsibility.
                      You should conduct your own due diligence and/or consult
                      with a qualified financial advisor before making any
                      investment.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium text-primary">
                      5. Conflict of Interest
                    </p>
                    <p className="text-muted-foreground">
                      Stock Manthan and its associates may hold positions in
                      stocks covered in our research. All such holdings are
                      disclosed in individual research reports as per SEBI
                      guidelines.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Section */}
            <div className="flex justify-center px-4 sm:px-0">
              <Card className="w-full max-w-full sm:max-w-xl lg:max-w-3xl border border-border bg-white shadow-sm">
                <CardContent className="p-6 sm:p-8 md:p-10">
                  <div className="space-y-6">

                    {/* Header */}
                    <div className="text-center space-y-3">
                      <h3 className="text-xl sm:text-2xl font-medium text-primary">
                        Contact us
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        For any questions about our services, subscription plans, or research
                        methodology, feel free to reach out.
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5 mt-6">

                      {/* Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Name
                        </label>
                        <input
                          type="text"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Email
                        </label>
                        <input
                          type="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={contactForm.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            if (value.length <= 10) {
                              setContactForm({ ...contactForm, phone: value });
                            }
                          }}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="10-digit mobile number"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Enter a valid 10-digit Indian mobile number
                        </p>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">
                          Message
                        </label>
                        <textarea
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      {/* Button */}
                      <Button
                        type="submit"
                        disabled={submitStatus === "sending"}
                        className={`w-full transition-all duration-300 ${submitStatus === "success"
                          ? "bg-green-600 hover:bg-green-700"
                          : submitStatus === "error"
                            ? "bg-red-600 hover:bg-red-700"
                            : "bg-primary hover:bg-primary/90"
                          }`}
                        size="lg"
                      >
                        {submitStatus === "sending" && "Sending..."}
                        {submitStatus === "idle" && "Send Message"}
                        {submitStatus === "success" && "Message Sent!"}
                        {submitStatus === "error" && "Try Again"}
                      </Button>

                    </form>
                  </div>
                </CardContent>
              </Card>
            </div>


            {/* FAQ Section */}
            <div className="space-y-8">
              <h3 className="text-2xl font-medium text-text-primary text-center">
                Frequently Asked Questions
              </h3>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="bg-white border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                    Is this personalized investment advice?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    <strong>No.</strong> As a SEBI Registered Research Analyst,
                    we provide general research and analysis. We do not offer
                    personalized investment advice tailored to your specific
                    financial situation, goals, or risk profile. All investment
                    decisions remain your responsibility.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                    What are the risks involved?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Stock market investments carry inherent risks including
                    market volatility and price fluctuations, business-specific
                    risks, economic and regulatory changes, and possibility of
                    capital loss. Past performance does not guarantee future
                    results. Please invest only what you can afford to hold for
                    the long term.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                    What is your refund policy?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Due to the nature of research content (immediate access upon
                    subscription), we do not offer refunds. Please review all
                    information carefully and consider starting with our free
                    community resources before subscribing to premium services.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white border border-border rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left font-medium text-primary hover:no-underline">
                    How do I raise a grievance?
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    For general queries, email us at support@stockmanthan.com.
                    For formal grievances, please contact
                    grievance@stockmanthan.com. We respond to all queries within
                    48 business hours and resolve grievances within 7 working
                    days as per SEBI guidelines.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      {/* Newly Appended Pricing Section */}
      <section className="py-20 md:py-24 bg-white border-t border-border">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
                Membership Plans
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our community to access high-quality research and insights.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
              {/* Monthly Plan */}
              <Card className="border border-border bg-white shadow-sm flex flex-col">
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="text-center space-y-4 pb-6 border-b border-border">
                    <h3 className="text-2xl font-medium text-primary">Monthly</h3>
                    <div>
                      <div className="text-4xl font-medium text-foreground">₹899</div>
                      <div className="text-muted-foreground mt-1">+ GST</div>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 text-left mt-4">
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2">Included in Paid membership:</li>
                    {["Full research reports (organized by stock)", "Price targets and buy/sell recommendations", "IPO reports and verdict", "Sector outlook reports", "Coverage universe list (Nifty 50 tagged)", "Model portfolio (Elite phase — coming soon)", "Update log"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2 mt-4">Included in Free (Community):</li>
                    {["Educational content", "Telegram & WhatsApp channel access (after registration)"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                  </ul>
                  {(!user || user.memberType === "free") ? (
                    <Button onClick={() => handleSubscribe("Monthly")} className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">Subscribe Now</Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubscribe("Monthly")} 
                      className={`w-full mt-6 ${user.memberType === "Monthly" ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`} 
                      size="lg"
                      disabled={user.memberType === "Monthly"}
                    >
                      {user.memberType === "Monthly" ? `Current Plan (Expires: ${new Date(user.subscriptionExpiry).toLocaleDateString()})` : "Switch Plan"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quarterly Plan */}
              <Card className="border border-border bg-white shadow-sm flex flex-col">
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col">
                  <div className="text-center space-y-4 pb-6 border-b border-border">
                    <h3 className="text-2xl font-medium text-primary">Quarterly</h3>
                    <div>
                      <div className="text-4xl font-medium text-foreground">₹1,999</div>
                      <div className="text-muted-foreground mt-1">+ GST</div>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 text-left mt-4">
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2">Included in Paid membership:</li>
                    {["Full research reports (organized by stock)", "Price targets and buy/sell recommendations", "IPO reports and verdict", "Sector outlook reports", "Coverage universe list (Nifty 50 tagged)", "Model portfolio (Elite phase — coming soon)", "Update log"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2 mt-4">Included in Free (Community):</li>
                    {["Educational content", "Telegram & WhatsApp channel access (after registration)"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                  </ul>
                  {(!user || user.memberType === "free") ? (
                    <Button onClick={() => handleSubscribe("Quarterly")} className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">Subscribe Now</Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubscribe("Quarterly")} 
                      className={`w-full mt-6 ${user.memberType === "Quarterly" ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`} 
                      size="lg"
                      disabled={user.memberType === "Quarterly"}
                    >
                      {user.memberType === "Quarterly" ? `Current Plan (Expires: ${new Date(user.subscriptionExpiry).toLocaleDateString()})` : "Switch Plan"}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Annual Plan */}
              <Card className="border-2 border-primary bg-white relative shadow-md flex flex-col">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 text-sm font-medium rounded-full">
                  Best Value
                </div>
                <CardContent className="p-8 space-y-6 flex-1 flex flex-col pt-10">
                  <div className="text-center space-y-4 pb-6 border-b border-border">
                    <h3 className="text-2xl font-medium text-primary">Annual</h3>
                    <div>
                      <div className="text-4xl font-medium text-foreground">₹5,999</div>
                      <div className="text-muted-foreground mt-1">+ GST</div>
                    </div>
                  </div>
                  <ul className="space-y-3 flex-1 text-left mt-4">
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2">Included in Paid membership:</li>
                    {["Full research reports (organized by stock)", "Price targets and buy/sell recommendations", "IPO reports and verdict", "Sector outlook reports", "Coverage universe list (Nifty 50 tagged)", "Model portfolio (Elite phase — coming soon)", "Update log"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                    <li className="font-semibold text-foreground text-sm border-b pb-2 mb-2 mt-4">Included in Free (Community):</li>
                    {["Educational content", "Telegram & WhatsApp channel access (after registration)"].map((text, i) => (
                      <li key={i} className="flex items-start space-x-3 text-sm">
                        <Check className="h-5 w-5 text-green-500 shrink-0" />
                        <span className="text-foreground">{text}</span>
                      </li>
                    ))}
                  </ul>
                  {(!user || user.memberType === "free") ? (
                    <Button onClick={() => handleSubscribe("Annual")} className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">Subscribe Now</Button>
                  ) : (
                    <Button 
                      onClick={() => handleSubscribe("Annual")} 
                      className={`w-full mt-6 ${user.memberType === "Annual" ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`} 
                      size="lg"
                      disabled={user.memberType === "Annual"}
                    >
                      {user.memberType === "Annual" ? `Current Plan (Expires: ${new Date(user.subscriptionExpiry).toLocaleDateString()})` : "Switch Plan"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-card p-8 rounded-xl max-w-sm w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-semibold text-center text-foreground">Authentication Required</h3>
            <p className="text-muted-foreground text-center text-sm">Please create a free account or log in to subscribe to a paid plan.</p>
            <div className="space-y-3">
              <Button onClick={() => setLocation("/register")} className="w-full">Register Free Account</Button>
              <Button onClick={() => setLocation("/login")} variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">Log In</Button>
              <Button onClick={() => setShowAuthModal(false)} variant="ghost" className="w-full text-muted-foreground">Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServicesPage;
