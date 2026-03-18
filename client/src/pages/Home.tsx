import { AmazonReviewCard } from "@/components/ui/amazonComment";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedGridPattern } from "@/components/ui/gridPattern";
import { Marquee } from "@/components/ui/marquee";
import { ShineBorder } from "@/components/ui/shineBorder";
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronRight,
  FileText,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  Play,
  Youtube
} from "lucide-react";

import { Link } from "wouter";

// import heroImage from "@assets/generated_images/abstract_3d_blue_geometric_shapes.png";
// import heroImage from "@blueBackground.png";



const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section */}

      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden grain">
        <div className="absolute inset-0">
          {/* <img
      src={"/blueBackground.png"}
      alt="Abstract 3D geometric shapes"
      className="w-full h-full object-cover opacity-40"
    /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/5 to-background" />
        </div>

        {/* Decorative blob - positioned on right side */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pt-26 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            {/* Left Content */}
            <div className="text-left">
              {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary uppercase tracking-wider">SEBI Registered Research</span>
        </div> */}

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-inter font-bold text-foreground leading-[1.1] mb-6">
                Wealth creation,{" "}
                <span className="gradient-text block mt-2">rooted in value.</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                SEBI-registered research focused on high-conviction value investing and the power of long-term compounding. We find the signal in the noise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/community" data-testid="link-community-button">
                <Button
                  size="lg"
                  className="gradient-warm-blue border-0 shadow-lg hover:shadow-xl transition-all text-base px-8 py-3 h-fit rounded-md"
                  data-testid="button-join-community"
                >
                  Explore Research
                </Button>
                </Link>
                <Link href="/philosophy" data-testid="link-philosophy-button">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/80 backdrop-blur-sm border-2 border-primary text-primary px-8 py-3 h-fit rounded-md hover:bg-white"
                  data-testid="button-our-philosophy"
                >
                  Our Philosophy
                </Button>
                </Link>
              </div>

              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider">
                Registration No. INH000014128
              </p>
            </div>

            {/* Right Visual Element */}
            <div className="relative hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative"
              >
                {/* Decorative blob behind card */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-20" />
                <div className="opacity-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 w-full aspect-485/514 bg-[url('/grid.png')] bg-contain" ></div>
                {/* Add your visual content here */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-64 aspect-485/514 bg-[url('/candlesticks.png')] bg-contain" ></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Video Section */}
      <section className="relative py-32 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <AnimatedGridPattern className="text-blue-300/50 stroke-blue-400/10" />
            {/* Left: Text Block */}
            <div className="lg:col-span-3">

              <div className="max-w-[600px]">
                {/* Opening line */}
                <p className="text-2xl font-medium text-foreground mb-8 leading-snug">
                  Let's be clear.
                </p>

                {/* Core problem statement */}
                <div className="space-y-5 mb-8 text-lg leading-[1.7] text-foreground/90">
                  <p>
                    Most investors don't lose money because markets are bad.
                  </p>
                  <p>
                    They lose money because decisions are rushed, emotional, and made without a clear process.
                  </p>
                </div>

                {/* Emotional validation */}
                <p className="text-lg leading-[1.7] text-muted-foreground/80 mb-12 italic">
                  If you've felt confusion during market falls, fear in volatile phases, or regret after chasing "hot ideas" — you're not alone.
                </p>

                {/* Boundary setting */}
                <div className="mb-12 pl-6 border-l-2 border-gray-200">
                  <p className="text-base font-medium text-foreground/70 mb-4 uppercase tracking-wide text-sm">
                    We deliberately stay away from:
                  </p>
                  <ul className="space-y-3 text-lg text-muted-foreground/70">
                    <li>Intraday trading</li>
                    <li>Options and speculative strategies</li>
                    <li>Tips, targets, and promises</li>
                  </ul>
                </div>

                {/* Closing philosophy */}
                <p className="text-lg leading-[1.7] text-foreground font-medium border-t-2 border-gray-100 pt-8">
                  We focus on value investing, business fundamentals, and disciplined thinking — the approach that actually survives market cycles.
                </p>
              </div>

            </div>

            {/* Right: Video */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="sticky top-24"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl group cursor-pointer border border-gray-700/50">

                  {/* Subtle texture overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-white/20 transition-all duration-300">
                      <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Video info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <h4 className="text-white text-xl font-serif font-semibold mb-2">
                      Why Value Investing Works
                    </h4>
                    <p className="text-white/70 text-sm">
                      A 90-second introduction to our philosophy
                    </p>
                  </div>

                  {/* Hover state indicator */}
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300" />
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-[url('/trial.png')] bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/trial.png')" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              What We Do
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Focused research and education to help you become a better investor
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: FileText,
                title: "Equity Research & Rational Reports",
                description: "Deep-dive analysis on quality businesses with clear investment rationale"
              },
              {
                icon: Briefcase,
                title: "Portfolio Thinking",
                description: "Framework for building and managing a concentrated portfolio"
              },
              {
                icon: GraduationCap,
                title: "Investor Education",
                description: "Free and premium content to improve your investment thinking"
              }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all group" data-testid={`card-service-${index}`}>
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-2xl gradient-warm-blue flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full">
            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-16">
              Authority & Trust
            </h2>

            {/* Three Blocks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl">
              {/* Block 1 */}
              <div className="h-[150px] flex items-center justify-center text-center">
                <div className="h-[90px] aspect-[2/3] bg-[url('/1.png')] bg-contain bg-no-repeat">

                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium text-foreground mb-3">
                    Regulated & Transparent
                  </h3>
                  <p className="max-w-[250px] text-muted-foreground leading-relaxed">
                    SEBI Registered Research Analyst (Reg. No. INH000014128)
                  </p>
                </div>
              </div>

              {/* Block 2 */}
              <div className="h-[150px] flex items-center justify-center text-center">
                <div className="h-[90px] aspect-[84/125] bg-[url('/2.png')] bg-contain bg-no-repeat">

                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium text-foreground mb-3">
                    Professional Background
                  </h3>
                  <p className="max-w-[250px] text-muted-foreground leading-relaxed">
                    Chartered Accountant with deep interest in businesses and capital markets
                  </p>
                </div>
              </div>

              {/* Block 3 */}
              <div className="h-[150px] flex items-center justify-center text-center">
                <div className="h-[90px] aspect-[41/62] bg-[url('/3.png')] bg-contain bg-no-repeat">

                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium text-foreground mb-3">
                    Education First Approach
                  </h3>
                  <p className="max-w-[250px] text-muted-foreground leading-relaxed">
                    Author of <em>Stock Manthan</em> — value investing in the Indian market context
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full">
            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-16">
              What You Can Do Here
            </h2>

            {/* Two Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Card 1 - Free/Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-gray-200 rounded-lg p-8 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Free Tag */}
                <div className="inline-flex items-center mb-4">
                  <span className="px-4 py-1.5 bg-green-50 text-green-700 text-sm font-semibold rounded-full border border-green-200">
                    FREE
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Start with learning - at your own pace
                </h3>

                {/* Subtitle */}
                <p className="text-lg font-semibold text-foreground mb-3">
                  Free Investor Community
                </p>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                  Access research thinking, sample analysis, and calm market insights without pressure or urgency.
                </p>

                {/* CTA Button */}
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-none"
                >
                  Join Free Community
                </Button>
              </motion.div>

              {/* Card 2 - Premium/Structured */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white border-2 rounded-lg p-8 flex flex-col h-full shadow-md hover:shadow-lg transition-shadow"
                >
                  {/* Premium Tag */}
                  <div className="inline-flex items-center mb-4">
                    <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold rounded-full shadow-sm">
                      PREMIUM
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                    For investors seeking deeper structure
                  </h3>

                  {/* Subtitle */}
                  <p className="text-lg font-semibold text-foreground mb-3">
                    Stock Manthan – Premium Research
                  </p>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">
                    Detailed research, rationales, and frameworks designed for disciplined long-term investors.
                  </p>

                  {/* CTA Button */}
                  <Link href="/services#pricing">
                  <Button
                    size="lg"
                    className="w-full gradient-warm-blue text-white border-0 shadow-lg hover:scale-105 transition-transform rounded-none"
                  >
                    Explore Premium Service
                  </Button>
                  </Link>
                </motion.div>
                <ShineBorder borderWidth={2} shineColor={["#0051ff", "#00ccff", "#93d6fd"]} className="absolute inset-0 rounded-lg pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Book Authority Section */}
      <section className="py-24 bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center w-full">
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="w-fit text-4xl sm:text-5xl font-serif font-bold text-foreground mb-2">
                  StockManthan
                </h2>
                <span className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
                  Published 2020
                </span>
              </div>

              <div className="h-fit flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12 w-full max-w-5xl mx-auto">
                {/* Book Cover */}
                <div className="flex-shrink-0 w-72 lg:w-82">
                  <div
                    className="aspect-[288/521] bg-contain bg-no-repeat bg-center"
                    style={{ backgroundImage: "url('/book.png')" }}
                  >
                  </div>
                </div>

                {/* Content Section */}

                <div className="p-10 h-full flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">


                  <div className="space-y-6 mb-8">
                    <div>
                      <h3 className="text-2xl font-serif font-semibold text-foreground mb-3">
                        The idea behind Stock Manthan
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Stock Manthan was written with a simple intention — to introduce value investing
                        principles in the Indian context, at a time when most conversations revolved around
                        trading and shortcuts.
                      </p>
                    </div>

                    <div>
                      <p className="w-fit text-foreground font-medium mb-3">The book discusses:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Why patience matters more than predictions</span>

                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>How to think like a business owner</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>Common mistakes investors make & how to avoid them</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-muted-foreground italic">
                      It laid the foundation for everything you see here today.
                    </p>
                  </div>

                  <a
                    href="https://www.amazon.in/STOCK-MANTHAN-Hunt-Multi-Bagger-Stocks/dp/1649519974"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="lg"
                      className="transition-transform duration-200 hover:scale-105 rounded-none gradient-warm-blue px-6 border-0 shadow-lg"
                      data-testid="button-view-amazon"
                    >
                      View Book on Amazon
                      <ChevronRight className="scale-[1.4] w-5 h-5 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>

              {/* Customer Reviews Section */}
              <div className="mt-16 w-full">
                <h3 className="mb-8 text-3xl sm:text-4xl font-serif font-bold text-foreground text-center">
                  Customer Reviews
                </h3>
                <section className="h-fit py-2 w-[90%] mx-auto relative">
                  {/* Smooth blur merge - left */}
                  <div className="absolute z-5 top-0 bottom-0 w-[10%] bg-gradient-to-r from-[#f6f8fa] to-transparent"></div>

                  {/* Marquee */}
                  <Marquee>
                    <div className="w-80 h-60 rounded-lg mx-2">
                      <AmazonReviewCard
                        userName="Praveen Jha"
                        rating={5}
                        description="Good to read for every one desiring to learn seriously the art of identifying stocks with potential of superlative returns for long term investing purpose. Easy to grasp language and link between concepts is quite good. It generates a firm belief that value investing is the only way to make wealth in market"
                      />
                    </div>
                    <div className="w-80 h-60 rounded-lg mx-2">
                      <AmazonReviewCard
                        userName="Srijan Saha"
                        rating={4}
                        description="-1 star as the flow of words could have been a bit more lucid. Otherwise, a great book on growth investing."
                      />
                    </div>
                    <div className="w-80 h-60 rounded-lg mx-2">
                      <AmazonReviewCard
                        userName="nitish"
                        rating={5}
                        description="If you want to read only one book on stock market investment then this is for you. Easy to read,even your English is not good. If you are new to investing the follow this chronology of the books 1) Investonomy by Pranjal kamra (2)Share market guide by Sudha srimaali (3) Fundamental analysis by jitendra gala (4) Investing 101 ebook by Young investor Society (5)Once upon wall Street by Peter lynch (6) Books written by Pat Dorsey (7)The intelligent Investor by Benjamin Graham (8) Value investing and Behaviour psychology by Parag parekh (9)Rage to Riche by Parag Parekh (10) Stock Manthan by CA Nithin sharma. (11)100 bagger by Mayer"
                      />
                    </div>
                  </Marquee>

                  {/* Smooth blur merge - right */}
                  <div className="absolute z-5 top-0 bottom-0 right-0 w-[10%] bg-gradient-to-l from-[#f6f8fa] to-transparent"></div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Free Community Section */}
      <section className="py-24 bg-[url('/trial.png')] bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/trial.png')" }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
              Join Our Free Community
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              All content across platforms is educational in nature, designed to help you think independently
            </p>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Youtube, label: "Whatsapp", desc: "Important highlights only", color: "from-green-500 to-green-600" },
              { icon: MessageCircle, label: "Telegram", desc: "Research thoughts, sample analysis, market perspective", color: "from-blue-400 to-blue-500" },
              { icon: Linkedin, label: "LinkedIn", desc: " Frameworks, reflections, and long-term thinking", color: "from-blue-600 to-blue-700" },
              { icon: Instagram, label: "Instagram", desc: "Short lessons on investing behaviour and discipline", color: "from-purple-500 via-pink-500 to-yellow-500" }
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer group text-center" data-testid={`card-community-${item.label.toLowerCase()}`}>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                      {
                        item.label === "Whatsapp" ?
                          <FontAwesomeIcon icon={faWhatsapp} size="2x" style={{ color: '#ffffff' }} />
                          :
                          <item.icon className="w-6 h-6 text-white" />
                      }

                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            {/* <Button
              size="lg"
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-2"
              data-testid="button-join-community"
            >
              Start with our free investor community
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button> */}
          </motion.div>
        </div>
      </section>

      {/* Disclaimer Strip */}
      <section className="py-8 bg-muted/50 border-t border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            Stock Manthan provides research and educational content. No personalized investment advice.
            Investment in securities market are subject to market risks. Read all related documents carefully before investing.
          </p>
        </div>
      </section>
    </main>
  );
}