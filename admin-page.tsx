import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Check, ExternalLink, RotateCcw, Save, Settings2 } from "lucide-react";
import {
  categories,
  posts,
  products,
  resetSiteOverrides,
  saveSiteOverrides,
  siteSettings,
  applySiteTheme,
  type SiteSettings,
} from "@/data/content";

type Tab = "site" | "posts" | "shop" | "categories";

function hexToHsl(hex: string) {
  const clean = hex.replace("#", "");
  const value = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

const fieldClass = "mt-2 w-full border border-[hsl(var(--foreground)/.25)] bg-[hsl(var(--background))] px-3 py-3 text-sm outline-none focus:border-[hsl(var(--primary))]";
const labelClass = "eyebrow block";

export function AdminPage() {
  const [tab, setTab] = useState<Tab>("site");
  const [saved, setSaved] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({ ...siteSettings });
  const [postEdits, setPostEdits] = useState(posts.map((post) => ({ ...post })));
  const [productEdits, setProductEdits] = useState(products.map((product) => ({ ...product })));
  const [categoryEdits, setCategoryEdits] = useState(categories.map((category) => ({ ...category })));

  const activeTitle = useMemo(() => ({ site: "Site appearance", posts: "Stories", shop: "Shop products", categories: "Content pillars" }[tab]), [tab]);
  const updateSettings = (patch: Partial<SiteSettings>) => setSettings((current) => ({ ...current, ...patch }));
  const save = () => {
    saveSiteOverrides({ settings, posts: postEdits, products: productEdits, categories: categoryEdits });
    Object.assign(siteSettings, settings);
    applySiteTheme();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  return <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
    <header className="border-b border-[hsl(var(--foreground)/.2)] bg-[hsl(var(--secondary))] px-5 py-4 text-[hsl(var(--secondary-foreground))] md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4">
        <div className="flex items-center gap-3"><Settings2 size={19} /><div><p className="eyebrow opacity-65">Content studio</p><h1 className="font-display text-3xl leading-none">The Curated Renter <em>admin</em></h1></div></div>
        <div className="flex items-center gap-4"><Link href="/" className="font-mono text-[10px] uppercase tracking-[.12em] opacity-75 hover:opacity-100">View site <ExternalLink className="ml-1 inline" size={12} /></Link><button onClick={save} className="flex items-center gap-2 bg-[hsl(var(--accent))] px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--foreground))]">{saved ? <Check size={14} /> : <Save size={14} />}{saved ? "Saved" : "Save changes"}</button></div>
      </div>
    </header>
    <div className="mx-auto grid max-w-[1440px] md:grid-cols-[230px_1fr]">
      <aside className="border-b border-[hsl(var(--foreground)/.2)] p-5 md:min-h-[calc(100vh-81px)] md:border-b-0 md:border-r md:p-8">
        <p className="eyebrow mb-4 text-[hsl(var(--muted-foreground))]">Manage</p>
        <nav className="grid gap-1">
          {([["site", "Site appearance"], ["posts", "Stories"], ["shop", "Shop products"], ["categories", "Content pillars"]] as [Tab, string][]).map(([value, label]) => <button key={value} onClick={() => setTab(value)} className={`px-3 py-3 text-left text-sm transition-colors ${tab === value ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]" : "hover:bg-[hsl(var(--foreground)/.07)]"}`}>{label}</button>)}
        </nav>
        <button onClick={resetSiteOverrides} className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))]"><RotateCcw size={13} /> Reset to original</button>
        <p className="mt-8 text-xs leading-5 text-[hsl(var(--muted-foreground))]">Changes are saved in this browser and appear on the public site after saving.</p>
      </aside>
      <main className="p-5 md:p-10">
        <div className="mb-8 border-b border-[hsl(var(--foreground)/.2)] pb-6"><p className="eyebrow text-[hsl(var(--muted-foreground))]">Editing</p><h2 className="mt-2 font-display text-6xl leading-none">{activeTitle}</h2></div>
        {tab === "site" && <section className="grid max-w-4xl gap-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className={labelClass}>Brand name<input className={fieldClass} value={settings.brandName} onChange={(e) => updateSettings({ brandName: e.target.value })} /></label>
            <label className={labelClass}>Top announcement<input className={fieldClass} value={settings.announcement} onChange={(e) => updateSettings({ announcement: e.target.value })} /></label>
            <label className={`${labelClass} md:col-span-2`}>Tagline<input className={fieldClass} value={settings.tagline} onChange={(e) => updateSettings({ tagline: e.target.value })} /></label>
          </div>
          <div><p className={labelClass}>Theme colors</p><div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{([["background", "Paper"], ["foreground", "Ink"], ["primary", "Coral"], ["accent", "Marigold"], ["secondary", "Deep green"]] as [keyof SiteSettings, string][]).map(([key, label]) => <label key={key} className="border border-[hsl(var(--foreground)/.2)] p-3 text-xs"><span className="flex items-center justify-between">{label}<input type="color" value={String(settings[key])} onChange={(e) => updateSettings({ [key]: e.target.value })} className="h-8 w-8 cursor-pointer border-0 bg-transparent p-0" /></span><span className="mt-2 block font-mono text-[10px] uppercase opacity-55">{String(settings[key])}</span></label>)}</div></div>
          <div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Display font<select className={fieldClass} value={settings.displayFont} onChange={(e) => updateSettings({ displayFont: e.target.value as SiteSettings["displayFont"] })}><option>Instrument Serif</option><option>Georgia</option><option>Playfair Display</option></select></label><label className={labelClass}>Body font<select className={fieldClass} value={settings.bodyFont} onChange={(e) => updateSettings({ bodyFont: e.target.value as SiteSettings["bodyFont"] })}><option>DM Sans</option><option>Arial</option><option>Trebuchet MS</option></select></label></div>
        </section>}
        {tab === "posts" && <div className="grid gap-10">{postEdits.map((post, index) => <article key={post.slug} className="border-b border-[hsl(var(--foreground)/.2)] pb-10"><div className="mb-5 flex items-center justify-between"><span className="eyebrow text-[hsl(var(--muted-foreground))]">{post.category} · {post.slug}</span><span className="font-mono text-[10px] opacity-50">Story {String(index + 1).padStart(2, "0")}</span></div><div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Title<input className={fieldClass} value={post.title} onChange={(e) => setPostEdits((all) => all.map((item, i) => i === index ? { ...item, title: e.target.value } : item))} /></label><label className={labelClass}>Category<input className={fieldClass} value={post.category} onChange={(e) => setPostEdits((all) => all.map((item, i) => i === index ? { ...item, category: e.target.value } : item))} /></label><label className="md:col-span-2"><span className={labelClass}>Short description</span><textarea className={`${fieldClass} min-h-24`} value={post.dek} onChange={(e) => setPostEdits((all) => all.map((item, i) => i === index ? { ...item, dek: e.target.value } : item))} /></label><label className="md:col-span-2"><span className={labelClass}>Article body (one paragraph per line)</span><textarea className={`${fieldClass} min-h-36`} value={post.body.join("\n")} onChange={(e) => setPostEdits((all) => all.map((item, i) => i === index ? { ...item, body: e.target.value.split("\n").filter(Boolean) } : item))} /></label></div></article>)}</div>}
        {tab === "shop" && <div className="grid gap-10">{productEdits.map((product, index) => <article key={product.slug} className="border-b border-[hsl(var(--foreground)/.2)] pb-10"><div className="mb-5 flex items-center justify-between"><span className="eyebrow text-[hsl(var(--muted-foreground))]">{product.maker} · {product.category}</span><span className="font-mono text-[10px] opacity-50">Product {String(index + 1).padStart(2, "0")}</span></div><div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Product name<input className={fieldClass} value={product.name} onChange={(e) => setProductEdits((all) => all.map((item, i) => i === index ? { ...item, name: e.target.value } : item))} /></label><label className={labelClass}>Price<input className={fieldClass} value={product.price} onChange={(e) => setProductEdits((all) => all.map((item, i) => i === index ? { ...item, price: e.target.value } : item))} /></label><label className={labelClass}>Retailer URL<input className={fieldClass} value={product.url} onChange={(e) => setProductEdits((all) => all.map((item, i) => i === index ? { ...item, url: e.target.value } : item))} /></label><label className={labelClass}>Image URL<input className={fieldClass} value={product.image} onChange={(e) => setProductEdits((all) => all.map((item, i) => i === index ? { ...item, image: e.target.value } : item))} /></label><label className="md:col-span-2"><span className={labelClass}>Editorial note</span><textarea className={`${fieldClass} min-h-24`} value={product.note} onChange={(e) => setProductEdits((all) => all.map((item, i) => i === index ? { ...item, note: e.target.value } : item))} /></label></div></article>)}</div>}
        {tab === "categories" && <div className="grid gap-10">{categoryEdits.map((category, index) => <article key={category.slug} className="border-b border-[hsl(var(--foreground)/.2)] pb-8"><div className="mb-5 flex items-center justify-between"><span className="eyebrow text-[hsl(var(--muted-foreground))]">/{category.slug}</span><input type="color" value={category.color} onChange={(e) => setCategoryEdits((all) => all.map((item, i) => i === index ? { ...item, color: e.target.value } : item))} className="h-8 w-8 cursor-pointer border-0 bg-transparent p-0" /></div><div className="grid gap-5 md:grid-cols-2"><label className={labelClass}>Name<input className={fieldClass} value={category.name} onChange={(e) => setCategoryEdits((all) => all.map((item, i) => i === index ? { ...item, name: e.target.value } : item))} /></label><label className={labelClass}>Kicker<input className={fieldClass} value={category.kicker} onChange={(e) => setCategoryEdits((all) => all.map((item, i) => i === index ? { ...item, kicker: e.target.value } : item))} /></label><label className="md:col-span-2"><span className={labelClass}>Introduction</span><textarea className={`${fieldClass} min-h-24`} value={category.intro} onChange={(e) => setCategoryEdits((all) => all.map((item, i) => i === index ? { ...item, intro: e.target.value } : item))} /></label></div></article>)}</div>}
      </main>
    </div>
  </div>;
}