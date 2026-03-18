import { AnimatedGridPattern } from "@/components/ui/gridPattern";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    type: "Free Telegram Member",
    badge: "FREE",
    badgeColor: "sky",
    premium: false,
    text: "The free Telegram channel alone has changed how I think about investing. No noise, just clear research thoughts. Highly recommend!"
  },
  {
    name: "Priya Sharma",
    type: "Premium Subscriber",
    badge: "PREMIUM",
    premium: true,
    text: "The premium research is worth every rupee. Detailed analysis, clear rationale, and disciplined approach. Finally found research I can trust."
  },
  {
    name: "Amit Patel",
    type: "WhatsApp Community",
    badge: "FREE",
    badgeColor: "green",
    premium: false,
    text: "Low noise, high value. The WhatsApp community sends only what matters. Perfect for busy professionals like me."
  },
  {
    name: "Sneha Reddy",
    type: "Premium Subscriber",
    badge: "PREMIUM",
    premium: true,
    text: "I started with the free channel, loved the approach, and upgraded to premium. The IPO insights and MF recommendations are incredibly helpful!"
  },
  {
    name: "Vikram Singh",
    type: "Free Telegram Member",
    badge: "FREE",
    badgeColor: "sky",
    premium: false,
    text: "As a beginner, the free sample analysis helped me understand how to research stocks properly. No pressure to buy anything. Genuine education."
  },
  {
    name: "Ananya Joshi",
    type: "Premium Subscriber",
    badge: "PREMIUM",
    premium: true,
    text: "The sector outlooks and portfolio frameworks in premium research have transformed my investing strategy. Professional, ethical, and value-driven."
  }
];

export default function Community() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [paginationEl, setPaginationEl] = useState<HTMLElement | null>(null);

  const nextSlide = () => {
    swiperInstance?.slideNext();
  };

  const prevSlide = () => {
    swiperInstance?.slidePrev();
  };

  const handleInteraction = (pause: boolean) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && swiperInstance && swiperInstance.autoplay) {
      if (pause) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
    }
  };

  return (
    <main className="min-h-screen pt-20 bg-[#fdfaf6] dark:bg-[#101922] text-[#1a1c1e] dark:text-slate-50">
      <style>{`
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        
        .ecosystem-gradient {
          background: radial-gradient(circle at center, rgba(19, 127, 236, 0.05) 0%, transparent 70%);
        }

        /* Swiper Custom Pagination */
        .swiper-pagination-custom .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background-color: rgba(76, 115, 154, 0.3);
            opacity: 1;
            border-radius: 9999px;
            transition: all 0.3s ease;
            margin: 0 4px !important;
            display: inline-block;
        }

        .swiper-pagination-custom .swiper-pagination-bullet-active {
            background-color: #137fec !important;
            width: 32px;
            border-radius: 9999px;
        }

        .swiper-pagination-custom {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen px-6 py-16 md:py-24 text-center flex flex-col items-center justify-center overflow-hidden">


        <AnimatedGridPattern
          className="absolute inset-0 text-blue-500/30"
          width={40}
          height={40}
          numSquares={70}
          maxOpacity={0.35}
          duration={4}
          repeatDelay={0.5}
        />
        <div className="relative z-10">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-100 text-orange-800 rounded-full mb-8 animate-fade-in">
            <span className="text-sm">✓</span>
            <span className="text-xs font-bold uppercase tracking-wider">
              SEBI Registered Research Analyst
            </span>
          </div>

          <h1 className="font-sans text-[#0d141b] dark:text-white text-4xl lg:text-6xl font-black leading-tight tracking-tight max-w-4xl animate-fade-in-up delay-100">
            Start Where You're Comfortable
          </h1>

          <p className="mt-6 mx-auto text-center text-[#137fec] text-2xl font-semibold leading-relaxed max-w-2xl animate-fade-in-up delay-200">
            Learn first. Decide later.
          </p>

          <p className="mt-4 mx-auto text-center text-[#4c739a] dark:text-slate-400 text-lg leading-relaxed max-w-2xl animate-fade-in-up delay-200">
            Stock Manthan offers multiple free learning channels so you can
            understand the approach before choosing anything paid.
          </p>
        </div>
      </section>

      {/* Community Options with Center Column Design */}
      <section className="relative px-6 pb-32 overflow-hidden">


        <div className="absolute inset-0 bg-gradient-to-br from-[#137fec]/20 via-[#137fec]/10 to-transparent"></div>

        <div className="ecosystem-gradient absolute inset-0 -z-10"></div>
        <div className="relative max-w-6xl mx-auto py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start" style={{ minHeight: "600px" }}>

          {/* LEFT - Telegram */}
          <div className="animate-fade-in-up delay-300 lg:mt-20">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-3xl border border-[#e8e2d9] dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-sky-600 text-2xl">
                  send
                </span>

              </div>
              <h4 className="font-bold text-lg mb-2">Free Telegram Channel</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-[#4c739a]">
                  <span className="text-sky-500">→</span>
                  Research thoughts
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4c739a]">
                  <span className="text-sky-500">→</span>
                  Sample stock analysis
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4c739a]">
                  <span className="text-sky-500">→</span>
                  Market and sector perspectives
                </li>
              </ul>
              <button className="w-full py-2 rounded-full border border-sky-200 text-sky-600 text-sm font-bold group-hover:bg-sky-600 group-hover:text-white transition-all">
                Join Free Channel
              </button>
            </div>
          </div>

          {/* CENTER COLUMN - Premium Top, Circle Middle, Message Bottom */}
          <div className="flex flex-col items-center justify-start gap-8">
            {/* Premium Research - TOP */}
            <div className="animate-fade-in-up delay-400 w-full">
              <div className="bg-[#137fec] p-1 rounded-3xl shadow-xl">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[calc(1.5rem-4px)] text-center">
                  <div className="w-14 h-14 rounded-full bg-[#137fec]/10 flex items-center justify-center mb-4 mx-auto">
                    <span className="material-symbols-outlined text-[#137fec] text-3xl">
                      workspace_premium
                    </span>

                  </div>
                  <h4 className="font-bold text-xl mb-2">Premium Research</h4>
                  <p className="text-sm text-[#4c739a] mb-4">
                    The endgame. Buy/Sell models, intrinsic value sheets, and long-term portfolio strategies.
                  </p>
                  <button className="w-full py-3 rounded-full bg-[#137fec] text-white text-sm font-bold hover:bg-[#137fec]/90 transition-all shadow-lg">
                    View Premium Research
                  </button>
                </div>
              </div>
            </div>

            {/* Center Circle - MIDDLE */}
            <div className="animate-fade-in delay-500 animate-pulse-slow flex flex-col items-center">
              <div className="bg-white dark:bg-slate-800 p-8 rounded-full border-4 border-[#137fec]/20 shadow-2xl flex flex-col items-center text-center w-64 h-64 justify-center">
                <div className="bg-[#137fec]/10 p-4 rounded-full mb-3">
                  <span className="material-symbols-outlined text-[#137fec] text-4xl">
                    target
                  </span>

                </div>
                <h3 className="font-bold text-lg">The Smart Investor</h3>
                <p className="text-xs text-[#4c739a] mt-2">Empowered by Research & Community</p>
              </div>

              {/* No Obligation Message - Below Circle */}
              <div className="mt-8 space-y-4 text-center max-w-md px-4">
                <p className="text-[#4c739a] dark:text-slate-400 text-sm">
                  You can remain part of free communities without any obligation.
                </p>
                <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4 rounded-2xl border border-[#e8e2d9] dark:border-slate-700">
                  <p className="text-[#4c739a] dark:text-slate-400 text-sm mb-1">
                    For investors seeking deeper research and structured rationales, a premium research channel is available.
                  </p>
                  <p className="text-xs text-[#4c739a] dark:text-slate-400 italic">
                    There is no pressure to upgrade.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - WhatsApp */}
          <div className="animate-fade-in-up delay-600 lg:mt-20">
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-6 rounded-3xl border border-[#e8e2d9] dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-green-600 text-2xl">
                  chat
                </span>

              </div>
              <h4 className="font-bold text-lg mb-2">WhatsApp Community</h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-[#4c739a]">
                  <span className="text-green-500">→</span>
                  Important highlights only
                </li>
                <li className="flex items-start gap-2 text-sm text-[#4c739a]">
                  <span className="text-green-500">→</span>
                  Low noise, high relevance
                </li>
              </ul>
              <button className="w-full py-2 rounded-full border border-green-200 text-green-600 text-sm font-bold group-hover:bg-green-600 group-hover:text-white transition-all">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-gradient-to-b from-[#fdfaf6] to-white dark:from-[#101922] dark:to-slate-900 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#137fec]/10 text-[#137fec] rounded-full mb-4">
              <span className="text-xs font-bold uppercase tracking-wider">Testimonials</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0d141b] dark:text-white mb-4">
              What Our Community Says
            </h2>
            <p className="text-[#4c739a] dark:text-slate-400 max-w-2xl mx-auto">
              Real feedback from investors who trust Stock Manthan for research and education
            </p>
          </div>

          <div className="relative">
            <Swiper
              onSwiper={setSwiperInstance}
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              pagination={{
                el: paginationEl,
                clickable: true,
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active"
              }}
              navigation={false}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-20" // Add padding for pagination
            >
              {testimonials.map((testimonial, i) => (
                <SwiperSlide key={i} className="h-auto">
                  <article
                    className={`h-full
        p-4 sm:p-5 md:p-6
        rounded-3xl shadow-lg transition-transform duration-300 hover:scale-[1.02]
        ${testimonial.premium
                        ? "bg-gradient-to-br from-[#137fec] to-blue-600 text-white"
                        : "bg-white dark:bg-slate-800 border border-[#e8e2d9] dark:border-slate-700"
                      }`}
                    onMouseEnter={() => handleInteraction(true)}
                    onMouseLeave={() => handleInteraction(false)}
                    onFocus={() => handleInteraction(true)}
                    onBlur={() => handleInteraction(false)}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center
            ${testimonial.premium
                            ? "bg-white/20"
                            : testimonial.badgeColor === "sky"
                              ? "bg-sky-100"
                              : "bg-green-100"
                          }`}
                      >
                        <span
                          className={testimonial.premium
                            ? "text-white"
                            : testimonial.badgeColor === "sky"
                              ? "text-sky-600"
                              : "text-green-600"
                          }
                        >
                          👤
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-sm sm:text-base">
                          {testimonial.name}
                        </h4>

                        <div className="flex items-center gap-1">
                          <span
                            className={`text-xs ${testimonial.premium ? "text-white/80" : "text-[#4c739a]"}`}
                          >
                            {testimonial.type}
                          </span>

                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold
                ${testimonial.premium
                                ? "bg-white/20 text-white"
                                : testimonial.badgeColor === "sky"
                                  ? "bg-sky-100 text-sky-600"
                                  : "bg-green-100 text-green-600"
                              }`}
                          >
                            {testimonial.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => (
                        <span
                          key={j}
                          className={testimonial.premium ? "text-yellow-300" : "text-yellow-500"}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>

                    <p
                      className={`text-xs sm:text-sm leading-relaxed
            ${testimonial.premium
                          ? "text-white/90"
                          : "text-[#4c739a] dark:text-slate-300"
                        }`}
                    >
                      "{testimonial.text}"
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="mt-8 flex justify-center">
              <div
                ref={setPaginationEl}
                className="swiper-pagination-custom"
              />
            </div>

            {/* Mobile Controls */}
            {/* Mobile arrows only */}
            <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
              <button
                onClick={prevSlide}
                className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center"
                aria-label="Previous testimonial"
              >
                ←
              </button>

              <button
                onClick={nextSlide}
                className="w-9 h-9 rounded-full bg-white dark:bg-slate-800 shadow flex items-center justify-center"
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>



            {/* Desktop arrows (side positioned) */}
            {/* Desktop arrows */}
            <button
              onClick={prevSlide}
              className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2
    w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg
    items-center justify-center hover:bg-[#137fec] hover:text-white transition-all z-10"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            <button
              onClick={nextSlide}
              className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2
    w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg
    items-center justify-center hover:bg-[#137fec] hover:text-white transition-all z-10"
              aria-label="Next testimonial"
            >
              →
            </button>

          </div>
        </div>
      </section>
    </main>
  );
}