import { type FormEvent, type ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X, Mail } from "lucide-react";
import { categories } from "@/data/content";

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const active = (href: string) => location === href || (href !== "/" && location.startsWith(href));
  return (
    <div className="paper-grain min-h-[100dvh]">
      <div className="bg-[hsl(var(--foreground))] px-4 py-2 text-center text-[10px] uppercase tracking-[0.16em] text-[hsl(var(--background))]">
        <span className="font-mono">Good rooms, no landlord required.</span>
      </div>
      <header className="relative z-40 border-b border-[hsl(var(--foreground)/.24)] bg-[hsl(var(--background)/.94)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[hsl(var(--foreground))] font-display text-2xl italic transition-transform group-hover:rotate-12">C</span>
            <span className="hidden text-[11px] font-bold uppercase leading-[1.05] tracking-[.13em] sm:block">The<br />Curated Renter</span>
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {[
              ["/category/rental-upgrades", "Read"],
              ["/category/room-tours", "Room Tours"],
              ["/shop/", "The Shop"],
              ["/about/", "Our Point of View"],
            ].map(([href, label]) => (
              <Link key={href} href={href} data-testid={`link-nav-${label.toLowerCase().replaceAll(" ", "-")}`} className={`font-mono text-[11px] uppercase tracking-[.11em] transition-colors hover:text-[hsl(var(--primary))] ${active(href) ? "text-[hsl(var(--primary))]" : ""}`}>{label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/shop/" className="hidden items-center gap-2 border border-[hsl(var(--foreground))] px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors hover:bg-[hsl(var(--accent))] sm:flex" data-testid="link-shop-edit">Shop the edit <ArrowUpRight size={13} /></Link>
            <button onClick={() => setOpen(!open)} className="flex h-9 w-9 items-center justify-center border border-[hsl(var(--foreground))] lg:hidden" aria-label="Toggle navigation" data-testid="button-toggle-menu">{open ? <X size={17} /> : <Menu size={17} />}</button>
          </div>
        </div>
        {open && <div className="border-t border-[hsl(var(--foreground)/.24)] bg-[hsl(var(--secondary))] px-5 py-7 lg:hidden">
          <div className="grid gap-5">
            <Link onClick={() => setOpen(false)} href="/" className="font-display text-3xl italic" data-testid="link-mobile-home">Latest</Link>
            {categories.map((category) => <Link onClick={() => setOpen(false)} href={`/category/${category.slug}`} key={category.slug} className="font-mono text-xs uppercase tracking-[.13em]" data-testid={`link-mobile-category-${category.slug}`}>{category.name}</Link>)}
            <Link onClick={() => setOpen(false)} href="/shop/" className="font-mono text-xs uppercase tracking-[.13em]" data-testid="link-mobile-shop">The Shop</Link>
          </div>
        </div>}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => { event.preventDefault(); if (email.includes("@")) setSent(true); };
  return <footer className="mt-24 bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
    <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-[1.15fr_.85fr] md:px-10 md:py-24">
      <div>
        <p className="eyebrow opacity-70">The Curated Renter, est. somewhere between leases</p>
        <h2 className="mt-5 max-w-lg font-display text-6xl leading-[.9] md:text-8xl">Make room for a life.</h2>
        <p className="mt-8 max-w-md text-sm leading-6 opacity-75">A weekly dispatch of rental-safe ideas, homes with a point of view, and objects that earn their footprint.</p>
      </div>
      <div className="md:pt-8">
        <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em]"><Mail size={14} /> No beige in your inbox</div>
        {sent ? <div className="border border-[hsl(var(--secondary-foreground)/.4)] p-5 font-display text-2xl italic" data-testid="status-newsletter-success">You're on the list. See you Sunday.</div> : <form onSubmit={submit} className="flex border-b border-[hsl(var(--secondary-foreground)/.45)] pb-3">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="min-w-0 flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-[hsl(var(--secondary-foreground)/.55)]" aria-label="Email address" data-testid="input-newsletter-email" />
          <button type="submit" className="font-mono text-[10px] uppercase tracking-[.13em] hover:text-[hsl(var(--accent))]" data-testid="button-newsletter-submit">Sign me up <ArrowUpRight className="ml-1 inline" size={13} /></button>
        </form>}
        <div className="mt-14 grid grid-cols-2 gap-4 text-xs leading-7">
          <div><p className="eyebrow opacity-60">Explore</p><Link href="/category/small-space" className="block mt-3 hover:text-[hsl(var(--accent))]" data-testid="link-footer-small-space">Small Space</Link><Link href="/category/color" className="block hover:text-[hsl(var(--accent))]" data-testid="link-footer-color">Color</Link><Link href="/shop/" className="block hover:text-[hsl(var(--accent))]" data-testid="link-footer-shop">The Shop</Link></div>
          <div><p className="eyebrow opacity-60">Fine print</p><Link href="/about/" className="block mt-3 hover:text-[hsl(var(--accent))]" data-testid="link-footer-about">About</Link><Link href="/affiliate-disclosure/" className="block hover:text-[hsl(var(--accent))]" data-testid="link-footer-disclosure">Affiliate disclosure</Link><a href="mailto:hello@thecuratedrenter.com" className="block hover:text-[hsl(var(--accent))]" data-testid="link-footer-contact">Say hello</a></div>
        </div>
      </div>
    </div>
    <div className="border-t border-[hsl(var(--secondary-foreground)/.18)] px-5 py-5 font-mono text-[10px] uppercase tracking-[.12em] opacity-55 md:px-10">© 2025 The Curated Renter · Made for temporary homes</div>
  </footer>;
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="eyebrow flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-[hsl(var(--primary))]" />{children}</div>;
}