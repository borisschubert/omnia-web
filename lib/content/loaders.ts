/**
 * Build-time content loaders. Read from content/sk/ and content/en/.
 * Used only from Server Components during static export build.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Locale } from "@/lib/i18n/config";
import type {
  News,
  Event,
  Achievement,
  GalleryAlbum,
  AboutSection,
} from "./types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function contentDir(locale: Locale, ...segments: string[]) {
  return path.join(CONTENT_ROOT, locale, ...segments);
}

async function safeReadJson<T>(filePath: string): Promise<T | null> {
  try {
    const raw = await readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function getNews(locale: Locale, limit?: number): Promise<News[]> {
  const dir = contentDir(locale, "news");
  let entries: string[] = [];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const files = entries
    .filter((e) => e.endsWith(".json") || e.endsWith(".md"))
    .slice(0, limit ?? 50);
  const items: News[] = [];
  for (const f of files) {
    const base = f.replace(/\.(json|md)$/, "");
    const jsonPath = path.join(dir, `${base}.json`);
    const json = await safeReadJson<News>(jsonPath);
    if (json) items.push(json);
  }
  items.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  return limit ? items.slice(0, limit) : items;
}

export async function getEvents(
  locale: Locale,
  limit?: number,
  upcomingOnly = false
): Promise<Event[]> {
  const dir = contentDir(locale, "events");
  let entries: string[] = [];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const files = entries
    .filter((e) => e.endsWith(".json"))
    .slice(0, limit ?? 50);
  const items: Event[] = [];
  for (const f of files) {
    const json = await safeReadJson<Event>(path.join(dir, f));
    if (json) items.push(json);
  }
  const now = new Date().toISOString().slice(0, 10);
  const filtered = upcomingOnly
    ? items.filter((e) => (e.date ?? "") >= now)
    : items;
  filtered.sort((a, b) => (a.date ?? "").localeCompare(b.date ?? ""));
  return limit ? filtered.slice(0, limit) : filtered;
}

export async function getAchievements(locale: Locale): Promise<Achievement[]> {
  const dir = contentDir(locale, "achievements");
  let entries: string[] = [];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const items: Achievement[] = [];
  for (const f of entries.filter((e) => e.endsWith(".json"))) {
    const json = await safeReadJson<Achievement>(path.join(dir, f));
    if (json) items.push(json);
  }
  items.sort((a, b) => (b.order ?? b.year ?? 0) - (a.order ?? a.year ?? 0));
  return items;
}

export async function getGalleryAlbums(locale: Locale): Promise<GalleryAlbum[]> {
  const dir = contentDir(locale, "gallery");
  let entries: string[] = [];
  try {
    entries = await readdir(dir);
  } catch {
    return [];
  }
  const items: GalleryAlbum[] = [];
  for (const f of entries.filter((e) => e.endsWith(".json"))) {
    const json = await safeReadJson<GalleryAlbum>(path.join(dir, f));
    if (json) items.push(json);
  }
  items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return items;
}

export async function getAbout(locale: Locale): Promise<AboutSection | null> {
  const p = contentDir(locale, "about.json");
  return safeReadJson<AboutSection>(p);
}
