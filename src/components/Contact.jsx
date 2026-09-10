"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Icon from "./Icon";
import { legal } from "../config/legal";

const socials = [
  { icon: "mail", size: 26, href: "mailto:contact@garfishdigital.com",
    label: "Email Garfish Digital" },
  { icon: "linkedin", size: 22, href: "https://linkedin.com/in/robertchambers12372",
    label: "Robert Chambers on LinkedIn (opens in a new tab)", external: true },
  { icon: "instagram", size: 22, href: "https://instagram.com/garfishdigital",
    label: "Garfish Digital on Instagram (opens in a new tab)", external: true },
];

export default function Contact() {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const previousOverflow = useRef("");
  const reduced = useReducedMotion();
  const [policyOpen, setPolicyOpen] = useState(false);
  const [socialsRevealed, setSocialsRevealed] = useState(false);
  const [policy, setPolicy] = useState("privacy");
  const [status, setStatus] = useState("idle");

  function openPolicy(value, event) {
    trigger.current = event.currentTarget;
    setPolicy(value);
    setPolicyOpen(true);
    previousOverflow.current = document.documentElement.style.overflow;
    dialog.current.showModal();
    document.documentElement.style.overflow = "hidden";
  }
  function closePolicy() {
    setPolicyOpen(false);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      const response = await fetch("/__forms.html", {
        method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return <section id="contact" className="contact-section page-width" aria-labelledby="contact-title">
    <div className="contact-layout">
      <div className="contact-intro"><p className="eyebrow">02 / Contact</p>
        <h2 id="contact-title">Let&apos;s Get Started</h2>
        <p>Tell us how to reach you</p>
      </div>
      <form onSubmit={handleSubmit} name="contact" method="POST" action="/__forms.html"
        data-netlify="true" data-netlify-honeypot="bot-field" className="contact-form">
        <input type="hidden" name="form-name" value="contact" />
        <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" hidden />
        <fieldset disabled={status === "sending"}>
          <legend>Contact Us</legend>
          <label className="sr-only" htmlFor="name">Your name</label>
          <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
          <label className="sr-only" htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" />
          <label className="sr-only" htmlFor="business">Your project (optional)</label>
          <input id="business" name="business" placeholder="Your project (optional)" />
          <button className="garfish-button" type="submit">{status === "sending" ? "Sending…" : "Send"}</button>
        </fieldset>
        <div className="form-status" role="status" aria-live="polite" aria-atomic="true">
          {status === "success" && <><strong>Message Sent</strong><p>We&apos;ll get back to you within 48 hours.</p></>}
          {status === "error" && <p>There was an error sending your message. Please try again, or <a href="mailto:contact@garfishdigital.com">email us</a>.</p>}
        </div>
      </form>
    </div>
    <footer className="contact-footer">
      <div className="footer-row">
        <div className="legal-links"><button onClick={(e) => openPolicy("privacy", e)}>Privacy Policy</button><button onClick={(e) => openPolicy("terms", e)}>Terms of Service</button></div>
        <div className="contact-channels">
          {/* <a className="email-address" href="mailto:contact@garfishdigital.com">contact@garfishdigital.com</a> */}
          <motion.div className={`social-links${socialsRevealed ? " socials-revealed" : ""}`}
            onViewportEnter={() => setSocialsRevealed(true)} viewport={{ once: true, amount: 0.5 }}>
            {socials.map(({ icon, size, href, label, external }, index) => (
              <a key={icon} href={href} aria-label={label}
                style={{ "--icon-size": `${size}px`, "--icon-index": index }}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <Icon name={icon} size={size} solid />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Garfish Digital. All rights reserved.</p>
    </footer>
    <dialog ref={dialog} className="legal-dialog" aria-label={policy === "privacy" ? "Privacy Policy" : "Terms of Service"}
      onCancel={(event) => { event.preventDefault(); closePolicy(); }}
      onClose={() => { document.documentElement.style.overflow = previousOverflow.current; trigger.current?.focus({ preventScroll: true }); }}>
      <AnimatePresence onExitComplete={() => dialog.current?.close()}>
        {policyOpen && <motion.div key={policy} className="legal-overlay"
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: reduced ? "blur(0px)" : "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          transition={{ duration: reduced ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }} onClick={closePolicy}>
          <motion.div className="legal-panel" onClick={(event) => event.stopPropagation()}
            initial={{ opacity: 0, scale: 0.8, y: 20, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20, rotate: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}>
            <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.1, duration: reduced ? 0 : 0.4 }}>
              <h2>{policy === "privacy" ? "Privacy Policy" : "Terms of Service"}</h2>
              <motion.button onClick={closePolicy} aria-label="Close legal information" className="dialog-close"
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0 : 0.3 }}
                whileHover={reduced ? {} : { scale: 1.1, rotate: 90 }} whileTap={reduced ? {} : { scale: 0.9 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </motion.button>
            </motion.header>
            <motion.div className="legal-content" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.2, duration: reduced ? 0 : 0.4 }}>
              {legal[policy].map(([title, content], index) => <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.3 + index * 0.1, duration: reduced ? 0 : 0.4 }}>
                <h3>{title}</h3><p>{content}</p>
              </motion.div>)}
            </motion.div>
            <motion.p className="legal-date" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduced ? 0 : 0.4, duration: reduced ? 0 : 0.4 }}>Last updated: September 2026</motion.p>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </dialog>
  </section>;
}
