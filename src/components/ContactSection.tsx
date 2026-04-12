import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="relative py-28 section-padding">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-3">
          Get In Touch
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-balance">
          Let's Light Up Your Space
        </h1>
        <p className="text-muted-foreground text-sm max-w-lg mx-auto mb-12">
          Ready to start your project? Reach out for a free consultation and transparent quote.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 mb-12">
          {[
            { icon: Phone, label: "+254 722 648 765", href: "tel:+254722648765" },
            { icon: Mail, label: "Briskelectricals2407@gmail.com", href: "mailto:Briskelectricals2407@gmail.com" },
            { icon: MapPin, label: "Nairobi, Kenya", href: "#" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="glass-card-hover p-5 flex flex-col items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                <c.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all text-center">
                {c.label}
              </span>
            </a>
          ))}
        </div>

        {/* Google Maps - Nairobi */}
        <div className="rounded-xl overflow-hidden border border-border mb-12 aspect-video max-h-[400px]">
          <iframe
            title="Brisk Electricals Location - Nairobi"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.35853743783!2d36.68219669716468!3d-1.3028617913503518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1700000000000!5m2!1sen!2ske"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>

        <a
          href="https://wa.me/254722648765?text=Hello%20Brisk%20Electricals!%20I'd%20like%20to%20get%20a%20free%20quote%20for%20my%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-whatsapp px-10 py-4 text-base inline-flex"
        >
          <MessageCircle className="w-5 h-5" />
          Start a Conversation on WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
