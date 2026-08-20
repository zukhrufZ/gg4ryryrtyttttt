export type Category = {
  slug: string;
  name: string;
  kicker: string;
  intro: string;
  color: string;
};

export type Post = {
  slug: string;
  category: string;
  title: string;
  dek: string;
  date: string;
  readTime: string;
  image: string;
  accent: string;
  body: string[];
  pullQuote?: string;
};

export type Product = {
  slug: string;
  name: string;
  maker: string;
  price: string;
  note: string;
  image: string;
  category: string;
  url: string;
};

const img = (id: string, params = "auto=format&fit=crop&w=1500&q=85") =>
  `https://images.unsplash.com/${id}?${params}`;

export const categories: Category[] = [
  { slug: "small-space", name: "Small Space", kicker: "make room for living", intro: "Good rooms are not measured in square feet. They are measured in small, clever decisions.", color: "#e6b84f" },
  { slug: "rental-upgrades", name: "Rental Upgrades", kicker: "no landlord required", intro: "The little changes that make a temporary place feel remarkably yours.", color: "#d9775c" },
  { slug: "room-tours", name: "Room Tours", kicker: "homes with a point of view", intro: "Actual renters, actual constraints, wildly good rooms.", color: "#8e9f77" },
  { slug: "how-to", name: "How To", kicker: "a little practical magic", intro: "Clear instructions for making the good idea happen without losing your weekend.", color: "#bd7659" },
  { slug: "renter-minds", name: "Renter Minds", kicker: "the people behind the rooms", intro: "Conversations with artists, collectors, and serial movers about the meaning of home.", color: "#d2a6a0" },
  { slug: "color", name: "Color", kicker: "turn up the dial", intro: "Palette notes for the brave, the curious, and anyone bored by beige.", color: "#e39c75" },
  { slug: "the-edit", name: "The Edit", kicker: "objects worth making room for", intro: "A sharply considered list of pieces that earn their footprint.", color: "#7e9e9c" },
];

export const posts: Post[] = [
  {
    slug: "the-case-for-a-red-lamp",
    category: "Color",
    title: "The Case for a Red Lamp",
    dek: "One bright little object can turn a rental from polite to personal.",
    date: "May 28, 2025",
    readTime: "6 min read",
    image: img("photo-1618220179428-22790b461013"),
    accent: "#d9775c",
    pullQuote: "A red lamp is not a commitment. It is a point of view.",
    body: [
      "There is a particular kind of rental living that confuses caution with taste. The walls stay the landlord's shade of warm white. The lighting stays overhead and apologetic. You make do, then make do again.",
      "A red lamp interrupts this arrangement beautifully. Not fire-engine red, necessarily. Think lacquered tomato, oxblood, the inside of a lacquer box. The color pools around the thing it illuminates and makes even a stack of library books look like a decision.",
      "Start small: a bedside lamp, a tiny mushroom shape on a bar cart, a floor lamp with a paper shade. The trick is to repeat the note once elsewhere in the room — a spine, a cushion, a ceramic dish — so it reads as a chorus rather than a shout.",
      "This is the renter's favorite kind of upgrade: plug-in, packable, and powerful enough to change the whole weather of a room."
    ],
  },
  {
    slug: "a-living-room-that-refuses-to-be-neutral",
    category: "Room Tours",
    title: "A Living Room That Refuses to Be Neutral",
    dek: "Inside Maya Chen's Queens rental, every object has a story and a very good reason to be there.",
    date: "May 21, 2025",
    readTime: "9 min read",
    image: img("photo-1616486338812-3dadae4b4ace"),
    accent: "#8e9f77",
    pullQuote: "I decorate for the version of me who comes home tired.",
    body: [
      "Maya Chen's living room begins with a velvet sofa in the color of an overripe peach. It is the first thing you see from the front door and the last thing you see before bed. Nothing around it is trying to calm it down.",
      "A striped rug cuts across the room at an angle. A paper lantern floats in the corner. On the low shelf, an uneven row of ceramics from Chinatown sits beside a framed postcard and a single stone she found at Rockaway.",
      "The rental's bones are ordinary: north-facing windows, a radiator that clanks in winter, a kitchen doorway with the world's least useful half wall. Maya treats these not as problems to solve but as prompts. The radiator gets a shelf. The half wall gets a painting ledge. The dimness gets more lamps.",
      "Her rule is simple: if it makes you smile when you walk in, it earns a place. By that measure, the room is very nearly perfect."
    ],
  },
  {
    slug: "the-no-drill-gallery-wall",
    category: "Rental Upgrades",
    title: "The No-Drill Gallery Wall",
    dek: "A reversible, renter-safe way to make blank walls feel like a point of view.",
    date: "May 14, 2025",
    readTime: "7 min read",
    image: img("photo-1577083552431-6e5fd01aa342"),
    accent: "#e6b84f",
    body: [
      "The best gallery walls feel accumulated, not purchased. The good news for renters: the same feeling can be built with a picture ledge, removable strips, and a willingness to leave a little breathing room.",
      "Choose one long ledge in oak or painted metal. Its job is to carry the weight, visually and literally. Lean larger pieces at the back, then layer smaller frames, a postcard, and one object with an odd silhouette.",
      "For pieces that need to hang, use removable picture-hanging strips rated for their actual weight. Clean the wall first. Press firmly. Wait. This is not the moment for impatience.",
      "The final move is the most important: stop before the wall is full. A little empty wall makes the collection feel alive."
    ],
  },
  {
    slug: "how-to-make-a-studio-feel-like-three-rooms",
    category: "Small Space",
    title: "How to Make a Studio Feel Like Three Rooms",
    dek: "The soft architecture of rugs, lamps, and one very convincing curtain.",
    date: "May 7, 2025",
    readTime: "8 min read",
    image: img("photo-1598928506311-c55ded91a20c"),
    accent: "#7e9e9c",
    body: [
      "A studio apartment does not need walls to have chapters. It needs changes in texture, light, and scale — the visual equivalent of a change in sentence.",
      "Begin at the floor. A rug under the sofa creates a living zone; a smaller mat by the bed quietly announces a second. Keep their colors related but not matched.",
      "Then put every zone on its own lighting circuit. A clip light over the desk, a warm table lamp by the sofa, and a low plug-in light by the bed will do more than one enormous ceiling fixture ever could.",
      "Finally, hang a curtain from a tension rod or ceiling-mounted removable hooks. It does not need to close all the way. It only needs to suggest that the bed is somewhere you go on purpose."
    ],
  },
  {
    slug: "the-renter-mind-olivia-laing",
    category: "Renter Minds",
    title: "The Renter Mind: Olivia Laing",
    dek: "On temporary rooms, collecting slowly, and why a home can be a verb.",
    date: "April 30, 2025",
    readTime: "10 min read",
    image: img("photo-1497366811353-6870744d04b2"),
    accent: "#d2a6a0",
    body: [
      "We asked writer and collector Olivia Laing what makes a rented room feel inhabited rather than merely occupied. Her answer began with a lamp and ended somewhere much more interesting.",
      "“I think renting teaches you to notice what is portable,” she says. “Not just objects. Rituals, too. The tea you make at four. The flowers you buy on a Tuesday. The particular chair you drag toward the window.”",
      "Her rooms have never been finished in the conventional sense. They are edited, then re-edited, with the patience of a good sentence. A print moves from hallway to bedroom. A table changes jobs.",
      "Home, in this telling, is not a backdrop. It is something you practice."
    ],
  },
  {
    slug: "seven-things-we-saved-this-month",
    category: "The Edit",
    title: "Seven Things We Saved This Month",
    dek: "A blue glass, a very good hook, and the side table that does two jobs.",
    date: "April 23, 2025",
    readTime: "5 min read",
    image: img("photo-1600210492486-724fe5c67fb0"),
    accent: "#bd7659",
    body: [
      "The internet is full of things that want to come home with you. These seven made the cut because they solve a small problem or create a much bigger feeling.",
      "We looked for pieces that are useful without looking over-engineered, beautiful without being precious, and light enough to move when the lease — or your mood — changes.",
      "A good rental object should be a little bit of infrastructure and a little bit of poetry."
    ],
  },
];

export const products: Product[] = [
  { slug: "cylinda-lamp", name: "Cylinda Table Lamp", maker: "HAY", price: "$195", note: "A small red punctuation mark.", category: "Lighting", image: img("photo-1507473885765-e6ed057f782c"), url: "https://www.hayshop.com/" },
  { slug: "archival-vase", name: "Archival Vase No. 04", maker: "Ferm Living", price: "$89", note: "For one branch, or no branch at all.", category: "Objects", image: img("photo-1612196808214-b8e1d6145a8c"), url: "https://fermliving.com/" },
  { slug: "checkerboard-rug", name: "Checkerboard Rug", maker: "Cold Picnic", price: "$320", note: "The floor can have a personality too.", category: "Textiles", image: img("photo-1600166898405-da9535204843"), url: "https://coldpicnic.com/" },
  { slug: "folding-screen", name: "Albers Folding Screen", maker: "Kave Home", price: "$379", note: "A room divider with actual stage presence.", category: "Small Space", image: img("photo-1598928506311-c55ded91a20c"), url: "https://kavehome.com/" },
  { slug: "wavy-mirror", name: "Wavy Mirror", maker: "Areaware", price: "$225", note: "A daily reminder not to take the room too seriously.", category: "Objects", image: img("photo-1618221195710-dd6b41faaea6"), url: "https://www.areaware.com/" },
  { slug: "linen-throw", name: "Washed Linen Throw", maker: "Tekla", price: "$145", note: "The fast route to a softer sofa.", category: "Textiles", image: img("photo-1586023492125-27b2c045efd7"), url: "https://teklafabrics.com/" },
];

export const featuredProduct = products[0];

export const getCategory = (slug: string) => categories.find((category) => category.slug === slug);
export const getPost = (slug: string) => posts.find((post) => post.slug === slug);

export type SiteSettings = {
  brandName: string;
  tagline: string;
  announcement: string;
  background: string;
  foreground: string;
  primary: string;
  accent: string;
  secondary: string;
  displayFont: "Instrument Serif" | "Georgia" | "Playfair Display";
  bodyFont: "DM Sans" | "Arial" | "Trebuchet MS";
};

export const siteSettings: SiteSettings = {
  brandName: "The Curated Renter",
  tagline: "Good rooms, no landlord required.",
  announcement: "Good rooms, no landlord required.",
  background: "#f5f0e8",
  foreground: "#1f3b34",
  primary: "#d9775c",
  accent: "#e8bf4f",
  secondary: "#23443b",
  displayFont: "Instrument Serif",
  bodyFont: "DM Sans",
};

const STORAGE_KEY = "curated-renter-site-v1";
export type SiteOverrides = {
  settings?: Partial<SiteSettings>;
  posts?: Partial<Post>[];
  products?: Partial<Product>[];
  categories?: Partial<Category>[];
};

export function applySiteOverrides() {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}") as SiteOverrides;
    Object.assign(siteSettings, saved.settings || {});
    saved.posts?.forEach((patch, index) => { if (posts[index]) Object.assign(posts[index], patch); });
    saved.products?.forEach((patch, index) => { if (products[index]) Object.assign(products[index], patch); });
    saved.categories?.forEach((patch, index) => { if (categories[index]) Object.assign(categories[index], patch); });
  } catch {
    // Ignore malformed local editor data and keep the published defaults.
  }
}

export function saveSiteOverrides(overrides: SiteOverrides) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

export function resetSiteOverrides() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.location.reload();
}

applySiteOverrides();

export function applySiteTheme() {
  if (typeof document === "undefined") return;
  const hexToHsl = (hex: string) => {
    const value = hex.replace("#", "");
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
  };
  const root = document.documentElement;
  root.style.setProperty("--background", hexToHsl(siteSettings.background));
  root.style.setProperty("--foreground", hexToHsl(siteSettings.foreground));
  root.style.setProperty("--primary", hexToHsl(siteSettings.primary));
  root.style.setProperty("--accent", hexToHsl(siteSettings.accent));
  root.style.setProperty("--secondary", hexToHsl(siteSettings.secondary));
  root.style.setProperty("--app-font-serif", `'${siteSettings.displayFont}', Georgia, serif`);
  root.style.setProperty("--app-font-sans", `'${siteSettings.bodyFont}', Arial, sans-serif`);
}