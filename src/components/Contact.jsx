import { useState } from 'react';
import FadeIn from './FadeIn.jsx';
import { personal } from '../utils/data.js';

const contactItems = [
  { icon: '✉', label: 'Email',    value: personal.email,    href: `mailto:${personal.email}` },
  { icon: '☎', label: 'Phone',    value: personal.phone,    href: `tel:+27615803040`          },
  { icon: '◈', label: 'Website',  value: personal.website,  href: `https://${personal.website}` },
  { icon: '◉', label: 'Location', value: personal.location, href: null                         },
];

const formFields = [
  { name: 'name',  label: 'Name *',  type: 'text',  placeholder: 'Your name',     required: true },
  { name: 'email', label: 'Email *', type: 'email', placeholder: 'your@email.com', required: true },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">

        <FadeIn className="mb-14">
          <span className="eyebrow">06 — Contact</span>
          <h2 className="section-heading">
            Let's Build<br />
            <span className="italic font-normal text-accent">Something Great.</span>
          </h2>
          <p className="text-muted mt-3 max-w-[520px]">
            Available for freelance projects, full-time roles, and consulting engagements across Gauteng and South Africa.
          </p>
        </FadeIn>

        <div className="contact-grid">

          {/* Info column */}
          <FadeIn delay={0.1}>
            <div className="flex flex-col gap-4 mb-8">
              {contactItems.map(({ icon, label, value, href }) => (
                <div key={label} className="contact-card flex gap-4 items-start p-4 md:p-5">
                  <div className="contact-icon-box">{icon}</div>
                  <div>
                    <div className="font-mono uppercase text-muted text-[0.65rem] tracking-[0.1em] mb-[3px]">{label}</div>
                    {href
                      ? <a href={href} className="text-text text-[0.92rem] font-medium no-underline hover:text-accent transition-colors duration-200">{value}</a>
                      : <span className="text-text text-[0.92rem] font-medium">{value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>
            <div className="badge-open">
              <div className="flex items-center gap-2 mb-2">
                <span className="dot-open" />
                <span className="font-mono uppercase text-green text-[0.72rem] tracking-[0.08em]">Open to Opportunities</span>
              </div>
              <p className="text-muted text-[0.85rem] leading-[1.6]">
                Available for freelance projects, contract work, and full-time positions. Based in Johannesburg with remote capacity.
              </p>
            </div>
          </FadeIn>

          {/* Form column */}
          <FadeIn delay={0.2}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formFields.map(f => (
                  <div key={f.name}>
                    <label className="block font-mono uppercase text-muted text-[0.68rem] tracking-[0.1em] mb-[6px]">{f.label}</label>
                    <input type={f.type} name={f.name} required={f.required}
                           value={form[f.name]} onChange={handleChange}
                           placeholder={f.placeholder} className="form-input" />
                  </div>
                ))}
              </div>
              <div>
                <label className="block font-mono uppercase text-muted text-[0.68rem] tracking-[0.1em] mb-[6px]">Subject</label>
                <input type="text" name="subject" value={form.subject} onChange={handleChange}
                       placeholder="Project inquiry, job opportunity…" className="form-input" />
              </div>
              <div>
                <label className="block font-mono uppercase text-muted text-[0.68rem] tracking-[0.1em] mb-[6px]">Message *</label>
                <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
                          placeholder="Tell me about your project or opportunity…"
                          className="form-input resize-y leading-[1.6]" />
              </div>
              <button type="submit" className={`btn-primary justify-center ${sent ? 'btn-sent' : ''}`}>
                {sent ? '✓ Opening Mail Client' : 'Send Message →'}
              </button>
              <p className="font-mono text-dim text-[0.65rem] tracking-[0.04em]">
                This will open your mail client. You can also email directly: {personal.email}
              </p>
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
