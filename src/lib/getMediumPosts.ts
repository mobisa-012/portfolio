// lib/getMediumPosts.ts
import Parser from "rss-parser";
import { JSDOM } from "jsdom";

interface MediumPost {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: Record<string, unknown>;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  title: string;
  readingTime?: string;
}

export async function getMediumPosts(): Promise<MediumPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL(process.env.MEDIUM_FEED_URL || "https://medium.com/feed/@devbina");

  const posts: MediumPost[] = await Promise.all(
    feed.items.map(async (item) => {
      let image = "";
      let readingTime = "";
      let categories: string[] = [];
      let author = "";

      // Use richer content if available
      const contentHTML = item['content:encoded'] || item.content || "";

      if (contentHTML) {
        const dom = new JSDOM(contentHTML);
        const doc = dom.window.document;

        // Extract images - supports lazy-loaded images too
        const imgTags = Array.from(doc.querySelectorAll("img"));
        const contentImage = imgTags.find((img) => {
          const src = img.getAttribute("src") || img.getAttribute("data-src");
          return src && src.startsWith("https://");
        });
        image =
          contentImage?.getAttribute("src") ||
          contentImage?.getAttribute("data-src") ||
          "";

        // Extract author if available in DOM
        const authorElement = doc.querySelector("[data-action='show-user-card']");
        author = authorElement?.textContent?.trim() || "";

        // Extract categories/tags from DOM
        const categoryElements = doc.querySelectorAll(
          "[data-action='show-collection-card']"
        );
        categories = Array.from(categoryElements).map(
          (el) => el.textContent?.trim() || ""
        );

        // Estimate reading time
        const text = doc.body.textContent || "";
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 200));
        readingTime = `${minutes} min read`;
      }

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        author: item.creator || author,
        categories: item.categories || categories,
        content: item.content || "",
        description:
          (item.contentSnippet?.substring(0, 200) || "") + "...",
        enclosure: item.enclosure || {},
        guid: item.guid || "",
        thumbnail: image || null,
        readingTime: readingTime,
      };
    })
  );

  return posts;
}

interface MediumPost {
  author: string;
  categories: string[];
  content: string;
  description: string;
  enclosure: Record<string, unknown>;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  title: string;
  readingTime?: string;
}

export async function getMediumMLPosts(): Promise<MediumPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://medium.com/feed/@devbina");

  const posts: MediumPost[] = await Promise.all(
    feed.items.map(async (item) => {
      let image = "";
      let readingTime = "";
      let categories: string[] = [];
      let author = "";

      // Use richer content if available
      const contentHTML = item['content:encoded'] || item.content || "";

      if (contentHTML) {
        const dom = new JSDOM(contentHTML);
        const doc = dom.window.document;

        // Extract images - supports lazy-loaded images too
        const imgTags = Array.from(doc.querySelectorAll("img"));
        const contentImage = imgTags.find((img) => {
          const src = img.getAttribute("src") || img.getAttribute("data-src");
          return src && src.startsWith("https://");
        });
        image =
          contentImage?.getAttribute("src") ||
          contentImage?.getAttribute("data-src") ||
          "";

        // Extract author if available in DOM
        const authorElement = doc.querySelector("[data-action='show-user-card']");
        author = authorElement?.textContent?.trim() || "";

        // Extract categories/tags from DOM
        const categoryElements = doc.querySelectorAll(
          "[data-action='show-collection-card']"
        );
        categories = Array.from(categoryElements).map(
          (el) => el.textContent?.trim() || ""
        );

        // Estimate reading time
        const text = doc.body.textContent || "";
        const words = text.trim().split(/\s+/).length;
        const minutes = Math.max(1, Math.round(words / 200));
        readingTime = `${minutes} min read`;
      }

      return {
        title: item.title || "",
        link: item.link || "",
        pubDate: item.pubDate || "",
        author: item.creator || author,
        categories: item.categories || categories,
        content: item.content || "",
        description:
          (item.contentSnippet?.substring(0, 200) || "") + "...",
        enclosure: item.enclosure || {},
        guid: item.guid || "",
        thumbnail: image || null,
        readingTime: readingTime,
      };
    })
  );

  // Filter posts by the specified categories
  const filteredPosts = posts.filter(post => {
    const targetCategories = [
      "Data Science",
      "Data Visualizations",
      "Machine Learning",
      "Data Cleaning"
    ];
    
    // Check if any of the post's categories are in the target list
    return post.categories.some(category => 
      targetCategories.includes(category)
    );
  });

  return filteredPosts;
}
