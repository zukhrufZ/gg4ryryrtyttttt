import { useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, ExternalLink, Share2 } from "lucide-react";
import { Link, useLocation, useParams } from "wouter";
import { Seo } from "@/components/seo";
import { SectionLabel } from "@/components/site-shell";
import { categories, featuredProduct, getCategory, getPost, posts, products, type Post, type Product } from "@/data/content";

const ButtonArrow = ({ children }: { children: string }) => <span className="inline-flex items-center gap-2">{children}<ArrowUpRight size={15} /></span>;

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return <Link href={`/post/${post.slug}`} className={`group image-link block ${featured ? "md:col-span-2" : ""}`} data-testid={`card-post-${post.slug}`}>
    <div style={{ backgroundColor: post.accent }} className={`relative overflow-hidden ${featured ? "aspect-[1.35/1] md:aspect-[1.95/1]" : "aspect-[1.08/1]"}`}>
      <img src={post.image} alt="" className="h-full w-full object-cover" loading="lazy" />
      <span className="absolute left-4 top-4 bg-[hsl(var(--background))] px-2 py-1 font-mono text-[9px] uppercase tracking-[.12em]">{post.category}</span>
      <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--accent))] opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight size={16} /></span>
    </div>
    <div className="mt-4 max-w-xl">
      <div className="font-mono text-[10px] uppercase tracking-[.1em] text-[hsl(var(--muted-foreground))]">{post.date} <span className="mx-1">·</span> {post.readTime}</div>
      <h3 className={`mt-2 font-display leading-[.98] group-hover:italic ${featured ? "text-4xl md:text-6xl" : "text-3xl"}`}>{post.title}</h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-[hsl(var(--muted-foreground))]">{post.dek}</p>
    </div>
  </Link>;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <article className={`group ${featured ? "md:grid md:grid-cols-[1.1fr_.9fr] md:gap-8" : ""}`} data-testid={`card-product-${product.slug}`}>
    <a href={product.url} target="_blank" rel="noreferrer" className="image-link block" data-testid={`link-product-image-${product.slug}`}>
      <div className={`overflow-hidden bg-[hsl(var(--muted))] ${featured ? "aspect-[1.05/1] md:aspect-[1.15/1]" : "aspect-square"}`}><img src={product.image} alt={product.name} className="h-full w-full object-cover" loading="lazy" /></div>
    </a>
    <div className={`${featured ? "flex flex-col justify-center pt-7 md:pt-0" : "pt-4"}`}>
      <div className="eyebrow text-[hsl(var(--muted-foreground))]">{product.category} / {product.maker}</div>
      <h3 className={`mt-2 font-display leading-none ${featured ? "text-5xl md:text-7xl" : "text-3xl"}`}>{product.name}</h3>
      <p className="mt-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">{product.note}</p>
      <div className="mt-6 flex items-center justify-between border-t border-[hsl(var(--foreground)/.25)] pt-3">
        <span className="font-mono text-sm">{product.price}</span>
        <a href={product.url} target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-[.1em] hover:text-[hsl(var(--primary))]" data-testid={`link-product-buy-${product.slug}`}>See retailer <ExternalLink className="ml-1 inline" size={12} /></a>
      </div>
    </div>
  </article>;
}

export function HomePage() {
  const latest = posts.slice(0, 4);
  return <><Seo title="Rent well. Live fully." description="The independent interiors publication for people who rent. Rental-safe maximalism, good rooms, and objects worth making room for." image={posts[0].image} />
    <div className="mx-auto max-w-[1440px] px-5 md:px-10">
      <section className="grid min-h-[630px] items-center gap-10 py-14 md:grid-cols-[.85fr_1.15fr] md:py-20">
        <div className="rise">
          <SectionLabel>Issue 07 / Summer living</SectionLabel>
          <h1 className="mt-8 max-w-xl font-display text-[clamp(4.5rem,10vw,9.7rem)] leading-[.79] tracking-[-.045em]">Rent well.<br /><em className="text-[hsl(var(--primary))]">Live fully.</em></h1>
          <p className="mt-9 max-w-sm text-lg leading-7">A personality-led interiors magazine for people whose walls belong to someone else.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5">
            <Link href="/category/rental-upgrades" className="bg-[hsl(var(--primary))] px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))] transition-transform hover:-translate-y-1" data-testid="link-hero-read">Start with a rental upgrade <ArrowRight className="ml-2 inline" size={14} /></Link>
            <Link href="#latest" className="font-mono text-[10px] uppercase tracking-[.12em] underline decoration-[hsl(var(--primary))] underline-offset-4" data-testid="link-hero-latest">See latest stories <ArrowDown className="ml-1 inline" size={14} /></Link>
          </div>
        </div>
        <div className="rise rise-delay-2 relative">
          <div className="absolute -right-2 -top-6 z-10 flex h-20 w-20 rotate-6 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-center font-mono text-[9px] uppercase leading-3 tracking-[.08em] md:-right-8 md:h-28 md:w-28">No paint.<br />No panic.<br />No beige.</div>
          <div className="aspect-[.88/1] overflow-hidden md:aspect-[1.07/1]"><img src={posts[0].image} alt="Colorful, layered rental living room" className="h-full w-full object-cover" /></div>
          <div className="absolute -bottom-7 left-5 max-w-xs bg-[hsl(var(--background))] p-5 md:-left-7 md:p-7">
            <p className="eyebrow text-[hsl(var(--primary))]">The cover story</p>
            <p className="mt-2 font-display text-3xl leading-none">The case for a red lamp</p>
          </div>
        </div>
      </section>

      <section className="border-y rule py-5">
        <div className="flex gap-6 overflow-x-auto whitespace-nowrap pb-1 md:justify-between md:gap-3" aria-label="Browse categories">
          {categories.map((category) => <Link href={`/category/${category.slug}`} key={category.slug} className="eyebrow shrink-0 hover:text-[hsl(var(--primary))]" data-testid={`link-home-category-${category.slug}`}>{category.name}</Link>)}
        </div>
      </section>

      <section id="latest" className="py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between"><div><SectionLabel>Fresh from the editor</SectionLabel><h2 className="mt-4 font-display text-6xl leading-none md:text-8xl">Latest stories</h2></div><Link href="/category/the-edit" className="hidden font-mono text-[10px] uppercase tracking-[.12em] underline underline-offset-4 sm:block" data-testid="link-see-all-stories">See the full edit <ArrowUpRight className="ml-1 inline" size={13} /></Link></div>
        <div className="grid gap-x-8 gap-y-16 md:grid-cols-4">
          <PostCard post={latest[0]} featured />
          {latest.slice(1).map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </section>
    </div>
    <section className="bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[.8fr_1.2fr] md:items-center md:px-10 md:py-28">
        <div><SectionLabel>For the object people</SectionLabel><h2 className="mt-5 font-display text-6xl leading-[.85] md:text-8xl">The good<br /><em>stuff.</em></h2><p className="mt-8 max-w-sm text-sm leading-6 opacity-75">A small shop of pieces with charm, utility, and no permanent address required.</p><Link href="/shop/" className="mt-8 inline-block border border-[hsl(var(--secondary-foreground)/.5)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]" data-testid="link-home-shop"><ButtonArrow>Browse the edit</ButtonArrow></Link></div>
        <ProductCard product={featuredProduct} featured />
      </div>
    </section>
    <div className="mx-auto max-w-[1440px] px-5 md:px-10"><section className="grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:items-center">
      <div className="aspect-[1.2/1] overflow-hidden"><img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85" alt="A warm, personal bedroom with collected objects" className="h-full w-full object-cover" loading="lazy" /></div>
      <div className="md:pl-12"><SectionLabel>A note from the editor</SectionLabel><p className="mt-7 max-w-xl font-display text-5xl leading-[.95] md:text-7xl">“Your home does not have to be permanent to be deeply yours.”</p><p className="mt-7 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">We believe in the transformative power of a good lamp, the precise placement of a painting, and the radical act of caring about where you live — even if you're only there for a year.</p><Link href="/about/" className="mt-7 inline-block font-mono text-[10px] uppercase tracking-[.12em] underline decoration-[hsl(var(--primary))] underline-offset-4" data-testid="link-home-about">Read our point of view <ArrowUpRight className="ml-1 inline" size={13} /></Link></div>
    </section></div>
  </>;
}

export function CategoryPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const category = getCategory(slug);
  const categoryPosts = useMemo(() => posts.filter((post) => post.category.toLowerCase().replaceAll(" ", "-") === slug), [slug]);
  if (!category) return <NotFoundPage />;
  return <><Seo title={category.name} description={category.intro} /><div className="mx-auto max-w-[1440px] px-5 md:px-10">
    <section className="grid gap-8 border-b rule py-20 md:grid-cols-[1.35fr_.65fr] md:items-end md:py-28">
      <div><SectionLabel>{category.kicker}</SectionLabel><h1 className="mt-5 max-w-4xl font-display text-7xl leading-[.82] md:text-[10rem]">{category.name}</h1></div><p className="max-w-xs text-lg leading-7 md:pb-2">{category.intro}</p>
    </section>
    <section className="py-16 md:py-24"><div className="mb-10 flex items-center justify-between"><p className="eyebrow">{categoryPosts.length} stories to linger over</p><Link href="/" className="font-mono text-[10px] uppercase tracking-[.1em]" data-testid="link-category-home"><ArrowLeft className="mr-2 inline" size={13} /> Back to latest</Link></div>
      {categoryPosts.length ? <div className="grid gap-x-8 gap-y-16 md:grid-cols-3">{categoryPosts.map((post, index) => <PostCard key={post.slug} post={post} featured={index === 0 && categoryPosts.length > 2} />)}</div> : <div className="border border-dashed rule px-6 py-20 text-center"><p className="font-display text-5xl italic">This shelf is being restocked.</p><p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">The next story is in the works. In the meantime, browse the latest.</p></div>}
    </section>
  </div></>;
}

export function PostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const [, navigate] = useLocation();
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  if (!post) return <NotFoundPage />;
  const share = async () => { try { await navigator.clipboard?.writeText(window.location.href); } catch { /* clipboard may be unavailable in presentation mode */ } setShared(true); };
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);
  return <><Seo title={post.title} description={post.dek} image={post.image} /><article className="mx-auto max-w-[1440px] px-5 md:px-10">
    <div className="py-7"><button onClick={() => navigate(`/category/${post.category.toLowerCase().replaceAll(" ", "-")}`)} className="font-mono text-[10px] uppercase tracking-[.12em] hover:text-[hsl(var(--primary))]" data-testid="button-post-back"><ArrowLeft className="mr-2 inline" size={13} /> {post.category}</button></div>
    <header className="grid gap-10 border-y rule py-14 md:grid-cols-[1fr_.9fr] md:items-end md:py-20">
      <div><div className="eyebrow text-[hsl(var(--primary))]">{post.date} / {post.readTime}</div><h1 className="mt-6 max-w-4xl font-display text-7xl leading-[.79] md:text-[9rem]">{post.title}</h1><p className="mt-8 max-w-xl text-xl leading-8 text-[hsl(var(--muted-foreground))]">{post.dek}</p></div>
      <div className="aspect-[1.15/1] overflow-hidden"><img src={post.image} alt="" className="h-full w-full object-cover" /></div>
    </header>
    <div className="grid gap-10 py-14 md:grid-cols-[.25fr_.75fr] md:py-24">
      <aside className="flex gap-3 md:block"><p className="eyebrow mb-4">Keep this one</p><button onClick={() => setSaved(!saved)} className={`flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] ${saved ? "bg-[hsl(var(--accent))]" : ""}`} data-testid="button-save-post"><Bookmark size={14} fill={saved ? "currentColor" : "none"} /> {saved ? "Saved" : "Save story"}</button><button onClick={share} className="ml-2 flex items-center gap-2 border px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] md:ml-0 md:mt-2" data-testid="button-share-post"><Share2 size={14} /> {shared ? "Link copied" : "Share"}</button></aside>
      <div className="max-w-2xl">
        {post.pullQuote && <blockquote className="mb-12 border-l-4 border-[hsl(var(--primary))] pl-6 font-display text-5xl leading-[.9] md:text-6xl">“{post.pullQuote}”</blockquote>}
        {post.body.map((paragraph, index) => <p key={index} className={`mb-7 text-lg leading-8 ${index === 0 ? "first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-7xl first-letter:leading-[.7]" : ""}`}>{paragraph}</p>)}
        <div className="my-16 border-y rule py-7"><p className="eyebrow mb-3">The renter's rule</p><p className="font-display text-4xl leading-none md:text-5xl">If you can take it with you, you can make it yours.</p></div>
      </div>
    </div>
    <section className="border-t rule py-16 md:py-24"><div className="mb-10 flex items-end justify-between"><div><SectionLabel>Keep reading</SectionLabel><h2 className="mt-4 font-display text-6xl leading-none">More good rooms</h2></div><Link href="/" className="font-mono text-[10px] uppercase tracking-[.1em] underline underline-offset-4" data-testid="link-post-more">All stories <ArrowUpRight className="ml-1 inline" size={13} /></Link></div><div className="grid gap-8 md:grid-cols-3">{related.map((item) => <PostCard key={item.slug} post={item} />)}</div></section>
  </article></>;
}

export function ShopPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Lighting", "Objects", "Textiles", "Small Space"];
  const visible = filter === "All" ? products : products.filter((product) => product.category === filter);
  return <><Seo title="The Shop" description="A sharply considered list of rental-friendly pieces that earn their footprint." /><div className="mx-auto max-w-[1440px] px-5 md:px-10">
    <section className="border-b rule py-20 md:py-28"><SectionLabel>Objects with a point of view</SectionLabel><h1 className="mt-5 max-w-5xl font-display text-8xl leading-[.8] md:text-[11rem]">The Shop</h1><div className="mt-10 flex flex-col justify-between gap-5 md:flex-row md:items-end"><p className="max-w-md text-lg leading-7">Not a marketplace. A considered shelf of things we would happily move again.</p><div className="flex gap-2 overflow-x-auto">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`shrink-0 border px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] ${filter === item ? "bg-[hsl(var(--foreground))] text-[hsl(var(--background))]" : "hover:bg-[hsl(var(--accent))]"}`} data-testid={`button-shop-filter-${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</button>)}</div></div></section>
    <section className="grid gap-x-8 gap-y-16 py-16 md:grid-cols-3 md:py-24">{visible.map((product) => <ProductCard key={product.slug} product={product} />)}</section>
    <section className="grid gap-6 border-t rule py-16 md:grid-cols-[1fr_1fr]"><div className="bg-[hsl(var(--accent))] p-8 md:p-12"><p className="eyebrow">A note on links</p><p className="mt-5 max-w-md font-display text-4xl leading-none">We may earn a small commission when you buy through our links. It never changes what we choose.</p></div><div className="flex items-center p-8 md:p-12"><p className="max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">Every object is chosen for a rented life: portable, useful, and interesting enough to keep when the floor plan changes.</p></div></section>
  </div></>;
}

export function AboutPage() {
  return <><Seo title="About" description="Why The Curated Renter exists: because temporary does not have to mean impersonal." /><div className="mx-auto max-w-[1440px] px-5 md:px-10">
    <section className="grid min-h-[650px] items-center gap-10 py-16 md:grid-cols-[1.1fr_.9fr] md:py-24"><div><SectionLabel>Our point of view</SectionLabel><h1 className="mt-6 max-w-5xl font-display text-7xl leading-[.78] md:text-[10rem]">Temporary<br /><em>doesn't mean</em><br />impersonal.</h1></div><div className="relative"><img src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1100&q=85" alt="Collected objects in a warm rental interior" className="aspect-[.8/1] w-full object-cover" /><div className="absolute -bottom-8 -left-5 max-w-[230px] bg-[hsl(var(--primary))] p-5 text-[hsl(var(--primary-foreground))] md:-left-10"><p className="font-display text-3xl leading-none">For the people who rearrange everything.</p></div></div></section>
    <section className="grid gap-10 border-y rule py-20 md:grid-cols-[.35fr_.65fr] md:py-28"><SectionLabel>The short version</SectionLabel><div className="max-w-2xl"><p className="font-display text-5xl leading-[.92] md:text-7xl">The Curated Renter is an interiors publication for people who rent, move, collect, and care.</p><p className="mt-10 max-w-lg text-lg leading-8 text-[hsl(var(--muted-foreground))]">We believe a home is made by attention, not ownership. So we publish the smart workaround, the surprising room tour, the very good lamp, and the honest advice that helps you build a place with a pulse.</p></div></section>
    <section className="grid gap-10 py-20 md:grid-cols-3 md:py-28"><div><span className="font-display text-7xl text-[hsl(var(--primary))]">01</span><h2 className="mt-5 font-display text-4xl">No paint required</h2><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">We find the changes that make a room yours without making your landlord nervous.</p></div><div><span className="font-display text-7xl text-[hsl(var(--primary))]">02</span><h2 className="mt-5 font-display text-4xl">Specific beats perfect</h2><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">A room with a point of view is more welcoming than a room that matches.</p></div><div><span className="font-display text-7xl text-[hsl(var(--primary))]">03</span><h2 className="mt-5 font-display text-4xl">Leave room for life</h2><p className="mt-4 text-sm leading-6 text-[hsl(var(--muted-foreground))]">The best spaces have evidence of the people living in them. We like a little mess.</p></div></section>
    <section className="bg-[hsl(var(--secondary))] px-6 py-20 text-[hsl(var(--secondary-foreground))] md:px-16 md:py-28"><p className="eyebrow opacity-70">Come say hello</p><div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end"><h2 className="max-w-3xl font-display text-6xl leading-[.85] md:text-8xl">Have a good rental story?</h2><a href="mailto:hello@thecuratedrenter.com" className="shrink-0 border border-[hsl(var(--secondary-foreground)/.5)] px-5 py-3 font-mono text-[10px] uppercase tracking-[.1em] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--foreground))]" data-testid="link-about-email"><ButtonArrow>Write to us</ButtonArrow></a></div></section>
  </div></>;
}

export function DisclosurePage() {
  return <><Seo title="Affiliate Disclosure" description="Our straightforward affiliate disclosure and editorial standards." /><div className="mx-auto max-w-[1100px] px-5 py-20 md:px-10 md:py-28"><SectionLabel>The fine print, plainly</SectionLabel><h1 className="mt-6 max-w-4xl font-display text-7xl leading-[.8] md:text-[10rem]">Affiliate<br /><em>disclosure</em></h1><div className="mt-20 grid gap-12 border-t rule pt-12 md:grid-cols-[.3fr_.7fr]"><p className="eyebrow">Last updated / May 2025</p><div className="prose prose-lg max-w-2xl text-[hsl(var(--foreground))]"><p>The Curated Renter is reader-supported. Some of the links on this site are affiliate links, which means we may earn a small commission if you purchase something after clicking a link. This comes at no additional cost to you.</p><p>Our editors choose every object because we genuinely like it, would recommend it to a friend, and believe it works for a rented life. A commission does not determine what we feature, how we describe it, or whether it makes the cut.</p><p>Prices and availability can change. Retailers are responsible for their own products, shipping, returns, and customer service. If you have a question about a specific link, <a href="mailto:hello@thecuratedrenter.com" className="underline decoration-[hsl(var(--primary))] underline-offset-4" data-testid="link-disclosure-contact">write to us</a>.</p><h2>Our editorial promise</h2><p>We will always tell you when a relationship exists, keep our recommendations honest, and choose the interesting thing over the obvious thing whenever possible.</p></div></div></div></>;
}

export function NotFoundPage() {
  return <div className="mx-auto max-w-[1000px] px-5 py-32 text-center md:py-48"><SectionLabel>404 / wrong room</SectionLabel><h1 className="mt-6 font-display text-8xl leading-[.8] md:text-[12rem]">Nothing<br /><em>here.</em></h1><p className="mx-auto mt-8 max-w-sm text-sm leading-6 text-[hsl(var(--muted-foreground))]">This page may have moved out. There are still good rooms to explore.</p><Link href="/" className="mt-8 inline-block bg-[hsl(var(--primary))] px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-[hsl(var(--primary-foreground))]" data-testid="link-notfound-home">Back to the latest <ArrowRight className="ml-2 inline" size={14} /></Link></div>;
}