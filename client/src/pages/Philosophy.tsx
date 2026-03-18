import { DotPattern } from '@/components/ui/dot-pattern';
import { LightRays } from '@/components/ui/light-rays';
import { cardReveal, cardStack, container, emphasis, fadeLeft, fadeRight, fadeUp, iconPop, iconReveal, principleCard, staggerContainer, word } from '@/components/ui/motions';
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";
import { BookOpen, Target, TrendingDown } from 'lucide-react';
import { AnimatedGridPattern } from '../components/ui/gridPattern';
// import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6 [&:last-child]:pb-6", className)}
      {...props}
    />
  );
}
export function PhilosophyPage() {
  const MotionCard = motion(Card);

  return (
    // bg-background
    <div className="min-h-screen bg-gray-50" style={{
      backgroundColor: "oklch(0.985 0.002 247.839)"
    }}>
      {/* Hero */}
      {/* <section className="bg-primary text-primary-foreground py-20 md:py-24 relative overflow-hidden">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "inset-x-0 inset-y-0 h-full w-full skew-y-12",
          )}
        />
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight font-inter">
            Why Stock Manthan?
          </h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed muted-foreground">
            A thoughtful approach to long-term investing
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

        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          {/* Heading */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight font-inter flex flex-wrap justify-center gap-x-3"
          >
            {"Why Stock Manthan?".split(" ").map((wordText, i) => (
              <motion.span
                key={i}
                variants={word}
                className="inline-block"
              >
                {wordText}
              </motion.span>
            ))}
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto"
          >
            A thoughtful approach to long-term investing
          </motion.p>
        </div>
      </section>


      {/* Section 1: The Real Question */}
      <section className="py-20 md:py-24 bg-gray-50 ">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-10">

            {/* Icon + Heading */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-center space-y-6"
            >
              <motion.div
                variants={iconPop}
                className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/5"
              >
                <TrendingDown className="h-7 w-7 text-primary" />
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl md:text-4xl font-medium text-text-primary"
              >
                The Real Question
              </motion.h2>
            </motion.div>

            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >
              {/* Big Question */}
              <motion.p
                variants={fadeUp}
                transition={{ delay: 0.15 }}
                className="text-2xl md:text-3xl text-center text-foreground leading-relaxed"
              >
                Why do so many investors struggle in the stock market?
              </motion.p>

              {/* Explanation */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-foreground leading-relaxed"
              >
                SEBI itself has highlighted that a majority of retail traders lose
                money over time. Whenever you open your trading app, you will see a
                pop-up for that.
              </motion.p>

              {/* Setup line */}
              <motion.p
                variants={fadeUp}
                className="text-lg text-foreground leading-relaxed"
              >
                The issue is not the stock market.
              </motion.p>

              {/* Emphasis line */}
              <motion.p
                variants={emphasis}
                className="text-xl text-primary leading-relaxed font-medium"
              >
                The issue is speculation without process.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Section 2: What Usually Goes Wrong */}

      <section className="py-20 md:py-24 bg-muted/30 bg-[url('/trial.png')] bg-contain bg-no-repeat bg-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-14">

            {/* Title */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-3xl md:text-4xl font-medium text-center text-text-primary"
            >
              What Usually Goes Wrong
            </motion.h2>

            {/* Intro */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg text-foreground text-center"
            >
              Most people enter markets through:
            </motion.p>

            {/* Cards */}
            <div className="space-y-6">
              {[
                "Tips from friends or social media",
                "Short-term trading ideas",
                "Noise disguised as opportunity",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardStack}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="bg-white border border-border rounded-xl p-6 shadow-sm"
                >
                  <p className="text-foreground leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Closing */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-foreground text-center pt-6 leading-relaxed"
            >
              This approach may feel exciting initially, but it rarely builds
              sustainable wealth.
            </motion.p>

          </div>
        </div>
      </section>



      {/* Section 3: A More Practical Approach */}

      <section className="relative py-20 md:py-24 overflow-hidden">

        {/* Dot background */}
        <DotPattern
          width={18}
          height={18}
          cr={1}
          className="absolute inset-0 z-0 text-neutral-300/60"
        />

        {/* CONTENT WRAPPER */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-14">

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-3xl md:text-4xl font-medium text-center text-text-primary"
            >
              A More Practical Approach
            </motion.h2>

            {/* Highlight Card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/20 to-primary/30 p-0 pb-0">
                <CardContent className="p-10 flex items-center justify-center pb-0 text-center">
                  <p className="text-2xl md:text-3xl font-medium text-primary text-center mb-4">
                    Value investing is not glamorous.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Intro */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg text-foreground"
            >
              It requires:
            </motion.p>

            {/* STACKED CARDS (timeline replaced) */}
            <div className="space-y-6">
              {[
                "Patience",
                "Discipline",
                "The ability to stay calm during volatility",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={cardStack}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="bg-white border border-border rounded-xl p-6 shadow-sm"
                >
                  <p className="text-foreground leading-relaxed">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Supporting text */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-foreground leading-relaxed pt-4"
            >
              But it suits working professionals and long-term investors far better
              than constant trading.
            </motion.p>

            {/* Closing */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-xl text-primary font-medium text-center pt-6"
            >
              Stock Manthan exists to support this approach — thoughtfully and
              responsibly.
            </motion.p>

          </div>
        </div>
      </section>



      {/* Section 4: Vision & Mission */}

      <section className="py-20 md:py-24 bg-muted/30 relative overflow-hidden">
        {/* Background grid */}
        <AnimatedGridPattern
          numSquares={40}
          maxOpacity={0.01}
          duration={4}
          repeatDelay={1}
          className={cn(
            "absolute inset-0 h-full w-full",
            "pointer-events-none",
            "z-0"
          )}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
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
                Vision Mission &
              </h2>
              <p className="text-lg text-muted-foreground">
                What we are really trying to do.
              </p>
            </motion.div>

            {/* Cards */}
            <div className="grid md:grid-cols-2 gap-10">

              {/* Vision */}
              <MotionCard
                variants={fadeLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="border border-border bg-white shadow-sm"
              >
                <CardContent className="p-10 space-y-5">
                  <motion.div
                    variants={iconPop}
                    className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center"
                  >
                    <Target className="h-6 w-6 text-primary" />
                  </motion.div>

                  <h3 className="text-2xl font-medium text-primary">
                    Vision
                  </h3>

                  <p className="text-lg text-foreground leading-relaxed">
                    To help investors sleep peacefully, knowing their money is invested
                    with understanding — not guesswork or shortcuts.
                  </p>
                </CardContent>
              </MotionCard>

              {/* Mission */}
              <MotionCard
                variants={fadeRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 26 }}
                className="border border-border bg-white shadow-sm"
              >
                <CardContent className="p-10 space-y-5">
                  <motion.div
                    variants={iconPop}
                    className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center"
                  >
                    <BookOpen className="h-6 w-6 text-primary" />
                  </motion.div>

                  <h3 className="text-2xl font-medium text-primary">
                    Mission
                  </h3>

                  <p className="text-lg text-foreground leading-relaxed">
                    To share research and perspectives that help investors think for
                    themselves, avoid common mistakes, and stay disciplined across
                    market cycles.
                  </p>
                </CardContent>
              </MotionCard>

            </div>
          </div>
        </div>
      </section>



      {/* Section 5: How It All Started */}
      {
      /* <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-medium text-text-primary">
                How It All Started
              </h2>
            </div>

            <div className="space-y-8">
              <Card className="border border-primary/20 bg-white shadow-sm">
                <CardContent className="p-10 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>

                  <div className="space-y-6 text-lg text-foreground leading-relaxed">
                    <p>
                      Stock Manthan began in 2020 as a book, written to bring value investing clarity into the Indian investor ecosystem.
                    </p>

                    <p className="text-xl text-primary font-medium">
                      At present, it is evolving into a research-driven education platform — focused on clarity, not noise.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        {/* Ambient background */}
        <LightRays
          className="
      absolute inset-0
      z-0
      opacity-30
      pointer-events-none
    "
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
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
                How It All Started
              </h2>
            </motion.div>

            {/* Story Card */}
            <MotionCard
              variants={cardReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="border border-primary/20 bg-white shadow-sm"
            >
              <CardContent className="p-10 space-y-8 text-center">

                <motion.div
                  variants={iconReveal}
                  className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto"
                >
                  <BookOpen className="h-8 w-8 text-primary" />
                </motion.div>

                <div className="space-y-6 text-lg text-foreground leading-relaxed">
                  <motion.p variants={fadeUp}>
                    Stock Manthan began in 2020 as a book, written to bring value
                    investing clarity into the Indian investor ecosystem.
                  </motion.p>

                  <motion.p
                    variants={fadeUp}
                    transition={{ delay: 0.15 }}
                    className="text-xl text-primary font-medium"
                  >
                    At present, it is evolving into a research-driven education
                    platform — focused on clarity, not noise.
                  </motion.p>
                </div>

              </CardContent>
            </MotionCard>

          </div>
        </div>
      </section>



      {/* Core Principles */}
      {/* <section className="py-20 md:py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            <h2 className="text-3xl md:text-4xl font-medium text-text-primary text-center">
              Our Core Principles
            </h2>

            <div className="space-y-6">
              <Card className="border border-border bg-white shadow-sm">
                <CardContent className="p-8">
                  <h4 className="font-medium text-primary mb-3 text-lg">Long-Term Focus</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    We invest for years and decades, not days and weeks. Compounding requires time.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white shadow-sm">
                <CardContent className="p-8">
                  <h4 className="font-medium text-primary mb-3 text-lg">Business Ownership Mindset</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Every stock represents a piece of a real business with real economics. We analyze companies, not tickers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white shadow-sm">
                <CardContent className="p-8">
                  <h4 className="font-medium text-primary mb-3 text-lg">Rational Analysis</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Decisions based on facts, numbers, and logic—not emotions, tips, or market sentiment.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white shadow-sm">
                <CardContent className="p-8">
                  <h4 className="font-medium text-primary mb-3 text-lg">Concentrated Portfolio</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Own fewer, better businesses that you deeply understand. Quality over quantity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-border bg-white shadow-sm">
                <CardContent className="p-8">
                  <h4 className="font-medium text-primary mb-3 text-lg">Margin of Safety</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Buy quality businesses when they're available at reasonable valuations, leaving room for error.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-20 md:py-24 bg-muted/30 bg-[url('/trial.png')] bg-contain bg-no-repeat bg-center">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              className="text-3xl md:text-4xl font-medium text-text-primary text-center"
            >
              Our Core Principles
            </motion.h2>

            {/* Principles */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="space-y-6"
            >

              {[
                {
                  title: "Long-Term Focus",
                  desc:
                    "We invest for years and decades, not days and weeks. Compounding requires time.",
                },
                {
                  title: "Business Ownership Mindset",
                  desc:
                    "Every stock represents a piece of a real business with real economics. We analyze companies, not tickers.",
                },
                {
                  title: "Rational Analysis",
                  desc:
                    "Decisions based on facts, numbers, and logic—not emotions, tips, or market sentiment.",
                },
                {
                  title: "Concentrated Portfolio",
                  desc:
                    "Own fewer, better businesses that you deeply understand. Quality over quantity.",
                },
                {
                  title: "Margin of Safety",
                  desc:
                    "Buy quality businesses when they're available at reasonable valuations, leaving room for error.",
                },
              ].map((item, i) => (
                <MotionCard
                  key={i}
                  variants={principleCard}
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  className="border border-border bg-white shadow-sm"
                >
                  <CardContent className="p-8">
                    <h4 className="font-medium text-primary mb-3 text-lg">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </CardContent>
                </MotionCard>
              ))}

            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default PhilosophyPage;
