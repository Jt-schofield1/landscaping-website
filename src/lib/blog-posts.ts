/**
 * BLOG POSTS
 *
 * To add a new blog post:
 * 1. Add a new object to the array below
 * 2. Fill in the title, slug (URL-friendly name), date, excerpt, and content
 * 3. Content supports basic formatting with line breaks (\n\n for paragraphs)
 * 4. Deploy the site and your post will appear automatically
 *
 * The slug must be unique and URL-friendly (lowercase, hyphens instead of spaces).
 */

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  image?: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    title: "Spring Yard Cleanup Tips for Rochester Homeowners",
    slug: "spring-yard-cleanup-tips",
    date: "2026-02-10",
    excerpt:
      "As the snow melts away, it's time to prepare your yard for the growing season. Here are our top tips for a successful spring cleanup.",
    image: "/images/service-cleanup.jpg",
    content: `As Rochester shakes off another winter, your yard is probably looking a little rough. Dead leaves, broken branches, and matted-down grass are all common sights after months of snow and ice. But don't worry — with the right approach, your property can look better than ever.

Here are our top spring cleanup tips:

**1. Start with debris removal**
Walk your entire property and pick up fallen branches, litter, and any leftover leaves from fall. This gives you a clear view of what needs attention.

**2. Rake and dethatch your lawn**
Winter compacts your grass and creates a layer of dead material called thatch. Raking helps air and water reach the roots, promoting healthy spring growth.

**3. Edge your beds and walkways**
Crisp, clean edges make an immediate visual impact. Use a half-moon edger or spade to redefine the borders between your lawn and garden beds.

**4. Refresh your mulch**
A fresh layer of mulch (2-3 inches) helps suppress weeds, retain moisture, and gives your landscape a polished look. We recommend dark brown or black mulch for a clean contrast against green plants.

**5. Prune dead or damaged branches**
Late winter and early spring are ideal times to prune most shrubs and trees. Remove anything that's dead, damaged, or crossing other branches.

**6. Plan your plantings**
Think about what you'd like to add this year. Native perennials are a great low-maintenance choice for Rochester's climate.

Need help getting your yard spring-ready? Contact Adjacent Property Management for a free quote. We handle everything from basic cleanups to full landscape renovations.`,
  },
  {
    title: "Why Mulching Matters More Than You Think",
    slug: "why-mulching-matters",
    date: "2026-01-25",
    excerpt:
      "Mulching isn't just about looks — it's one of the most important things you can do for your landscape's health. Here's why.",
    image: "/images/service-mulching.jpg",
    content: `When most people think about mulch, they think about curb appeal. And yes, a fresh layer of dark mulch absolutely transforms the look of your garden beds. But the benefits go far beyond aesthetics.

**Moisture retention**
Mulch acts like a blanket for your soil, reducing evaporation and keeping roots hydrated during Rochester's hot summers. This means less watering and healthier plants.

**Weed suppression**
A proper 2-3 inch layer of mulch blocks sunlight from reaching weed seeds, dramatically reducing the amount of weeding you need to do throughout the season.

**Temperature regulation**
Mulch insulates the soil, keeping it cooler in summer and warmer in the transitional months of spring and fall. This protects plant roots from temperature extremes.

**Soil health**
As organic mulch breaks down over time, it adds nutrients back into the soil. This creates a healthier growing environment for your plants year after year.

**Erosion prevention**
On slopes or in areas prone to runoff, mulch helps hold soil in place during heavy rains — something we get plenty of in upstate New York.

**When to mulch**
The best time to refresh mulch in the Rochester area is late spring, after the soil has warmed up. We recommend removing old, compacted mulch before applying a fresh layer.

At Adjacent Property Management, we use premium-grade mulch and apply it with attention to proper depth and coverage. Too much mulch can actually harm plants, so it's important to get it right.

Ready to give your landscape a refresh? Give us a call at (585) 769-9008 or request a free quote through our website.`,
  },
  {
    title: "Preparing Your Property for Fall in Upstate New York",
    slug: "fall-property-preparation",
    date: "2025-10-15",
    excerpt:
      "Fall is a critical time for property maintenance in Rochester. Here's how to prepare your landscape before winter arrives.",
    image: "/images/service-trimming.jpg",
    content: `Rochester's fall season is beautiful but short. Before you know it, the leaves are down and the first frost is here. Taking the right steps now can save you headaches in the spring and keep your property looking great year-round.

**Leaf removal**
Don't let fallen leaves sit on your lawn all winter. A thick layer of leaves can smother grass, promote fungal growth, and attract pests. Regular removal throughout the season is key.

**Final mowing**
Gradually lower your mowing height for the last few cuts of the season. Grass that's too tall going into winter can mat down and develop snow mold.

**Garden bed cleanup**
Cut back perennials, remove annuals, and clear any dead plant material from your beds. This reduces the chance of disease carrying over to next year.

**Trim and prune**
Fall is a good time to trim back overgrown shrubs and remove any dead branches before heavy snow can cause damage.

**Protect vulnerable plants**
Young trees and tender shrubs benefit from burlap wrapping or protective barriers, especially in exposed locations.

**Debris removal**
Clear your property of any loose items, fallen branches, or materials that could become hazards during winter storms.

Adjacent Property Management offers comprehensive fall cleanup packages for both residential and commercial properties. We'll make sure your property is buttoned up and ready for whatever winter throws at it.

Contact us today to schedule your fall cleanup before our calendar fills up!`,
  },
];

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
