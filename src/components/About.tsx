"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Shield, Clock, ThumbsUp } from "lucide-react";
import Image from "next/image";

function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  inView,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const counterRef = useRef<HTMLDivElement>(null);
  const countersInView = useInView(counterRef, { once: true, margin: "-50px" });

  const stats = [
    { icon: Clock, value: 5, suffix: "+", label: "Years of Service" },
    { icon: ThumbsUp, value: 500, suffix: "+", label: "Projects Completed" },
    { icon: Shield, value: 100, suffix: "%", label: "Satisfaction Rate" },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-green/10">
              <Image
                src="/images/about-community.jpg"
                alt="Rochester NY community neighborhoods"
                width={700}
                height={500}
                className="object-cover w-full h-[400px] lg:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -right-4 sm:right-8 bg-white rounded-2xl p-5 shadow-xl shadow-black/10 border border-brand-green/10"
            >
              <p className="font-display text-3xl font-bold text-brand-green-dark">
                5+
              </p>
              <p className="text-brand-muted text-sm font-medium">
                Years Serving
                <br />
                Rochester
              </p>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <span className="inline-block text-brand-green-dark text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Our Story
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Rooted in Rochester,
              <br />
              <span className="text-brand-green-dark">
                Growing with You
              </span>
            </h2>
            <div className="space-y-4 text-brand-muted leading-relaxed">
              <p>
                Adjacent Property Management has been a trusted name in the
                Rochester community for over five years. What started as a
                passion for transforming outdoor spaces has grown into a
                full-service property maintenance company serving both
                residential homeowners and commercial businesses throughout the
                Greater Rochester area.
              </p>
              <p>
                We take pride in our attention to detail, reliability, and the
                lasting relationships we build with our clients. Whether
                it&apos;s a simple yard cleanup or a complete landscape
                transformation, we approach every project with the same level of
                care and professionalism.
              </p>
              <p>
                Our team specializes in creating and maintaining beautiful
                outdoor environments that enhance curb appeal and property
                value. We understand Rochester&apos;s unique climate and seasonal
                needs, allowing us to provide tailored solutions that keep your
                property looking its best all year round.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div ref={counterRef} className="mt-20 sm:mt-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={countersInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="text-center bg-white rounded-2xl p-8 border border-brand-green/5 shadow-sm"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-brand-green/10 rounded-xl mb-4">
                    <Icon size={24} className="text-brand-green-dark" />
                  </div>
                  <p className="font-display text-4xl sm:text-5xl font-bold text-brand-dark mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      inView={countersInView}
                    />
                  </p>
                  <p className="text-brand-muted text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
