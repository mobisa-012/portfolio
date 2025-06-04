// lib/getMediumPosts.ts
import Parser from "rss-parser";
import { JSDOM } from "jsdom";

type MediumPost = {
  title: string;
  link: string;
  pubDate?: string;
  contentSnippet?: string;
  image?: string;
  readingTime?: string;
  categories?: string[];
  author?: string;
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://medium.com/feed/@devbina");

  const posts: MediumPost[] = await Promise.all(feed.items.map(async (item) => {
    let image = "";
    let readingTime = "";
    let categories: string[] = [];
    let author = "";

    if (item.content) {
      const dom = new JSDOM(item.content);
      const doc = dom.window.document;

      const imgTags = Array.from(doc.querySelectorAll("img"));

      const contentImage = imgTags.find(img => 
        img.src && 
        !img.src.includes('avatar') &&
        img.src.startsWith('https://')
      );

      image = contentImage?.src || "";

      // Get author from content
      const authorElement = doc.querySelector("[data-action=show-user-card]");
      author = authorElement?.textContent?.trim() || "";

      // Get categories/tags
      const categoryElements = doc.querySelectorAll("[data-action=show-collection-card]");
      categories = Array.from(categoryElements).map(el => el.textContent?.trim() || "");

      // Better reading time estimation
      const text = doc.body.textContent || "";
      const words = text.trim().split(/\s+/).length;
      const minutes = Math.max(1, Math.round(words / 200));
      readingTime = `${minutes} min read`;
    }

    return {
      title: item.title || "",
      link: item.link || "",
      pubDate: item.pubDate,
      contentSnippet: item.contentSnippet?.substring(0, 200) + "..." || "",
      image,
      readingTime,
      categories: item.categories || categories,
      author: item.creator || author
    };
  }));

  return posts;
}