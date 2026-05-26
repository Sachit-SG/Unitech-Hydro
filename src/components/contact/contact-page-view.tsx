"use client";

import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 placeholder-slate-400 transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00EAFF]";

const contactItems = [
  {
    icon: Mail,
    title: "Email Us",
    value: "unitechhydropower@gmail.com",
    href: "mailto:unitechhydropower@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "01-4106123",
    href: "tel:+97714106123",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    value: "Lalitpur-01, Kupondole",
    href: undefined,
  },
] as const;

export function ContactPageView() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-32 pt-24 md:px-8">
      <div className="mx-auto flex max-w-[1200px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] lg:flex-row">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease }}
          className="flex w-full flex-col justify-between bg-[#0B2043] p-10 md:p-16 lg:w-5/12"
        >
          <div>
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Let&apos;s build the future of energy.
            </h1>
            <p className="text-lg text-slate-300">
              Whether you are an investor, partner, or community member, our team is ready
              to answer your questions.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-8 lg:mt-16">
            {contactItems.map(({ icon: Icon, title, value, href }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="shrink-0 rounded-lg bg-[#00EAFF]/10 p-3 text-[#00EAFF]">
                  <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-white">{title}</h3>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm text-slate-400 transition-colors hover:text-[#00EAFF]"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-slate-400">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
          className="w-full bg-white p-10 md:p-16 lg:w-7/12"
        >
          <h2 className="mb-2 font-heading text-2xl font-bold text-[#0B2043] md:text-3xl">
            Send us a message
          </h2>
          <p className="mb-8 text-sm text-slate-500 md:text-base">
            We typically respond within two business days.
          </p>

          {submitted ? (
            <p
              className="rounded-xl border border-[#00EAFF]/30 bg-[#00EAFF]/5 px-4 py-6 text-center text-sm text-[#0B2043] md:text-base"
              role="status"
            >
              Thank you — your message has been recorded. Our team will be in touch shortly.
            </p>
          ) : (
            <form
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label htmlFor="contact-name" className="sr-only">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Full name"
                  className={inputClassName}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Email address"
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  placeholder="Subject"
                  className={inputClassName}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className={`${inputClassName} h-32 resize-none`}
                />
              </div>
              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B2043] px-8 py-4 font-semibold text-white transition-all hover:bg-[#0B2043]/90 md:col-span-2"
              >
                Send Message
                <ArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
