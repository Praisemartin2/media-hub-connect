#!/usr/bin/env node
/**
 * Publish the daily post to Instagram via the official Graph API
 * (Instagram Content Publishing). Requires an Instagram Professional
 * (Business/Creator) account linked to a Facebook Page.
 *
 * Usage: IG_USER_ID=... IG_ACCESS_TOKEN=... IMAGE_URL=https://... \
 *          node scripts/ig/publish.mjs [post.json]
 *
 * IMAGE_URL must be a publicly reachable JPEG/PNG (we use the
 * raw.githubusercontent.com URL of the committed image).
 */
import { readFileSync } from "node:fs";

const { IG_USER_ID, IG_ACCESS_TOKEN, IMAGE_URL } = process.env;
const postPath = process.argv[2] ?? "automation/out/post.json";
const post = JSON.parse(readFileSync(postPath, "utf8"));

if (!IG_USER_ID || !IG_ACCESS_TOKEN || !IMAGE_URL) {
  console.error("Missing IG_USER_ID, IG_ACCESS_TOKEN, or IMAGE_URL");
  process.exit(1);
}

const GRAPH = "https://graph.facebook.com/v21.0";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function graph(method, pathname, params = {}) {
  const url = new URL(`${GRAPH}${pathname}`);
  const body = new URLSearchParams({ ...params, access_token: IG_ACCESS_TOKEN });
  const res =
    method === "GET"
      ? await fetch(`${url}?${body}`)
      : await fetch(url, { method, body });
  const json = await res.json();
  if (json.error) {
    throw new Error(`Graph API ${pathname}: ${json.error.message} (code ${json.error.code})`);
  }
  return json;
}

// 1. Create a media container from the public image URL
const { id: creationId } = await graph("POST", `/${IG_USER_ID}/media`, {
  image_url: IMAGE_URL,
  caption: post.caption,
});
console.log(`Media container created: ${creationId}`);

// 2. Wait until Instagram has fetched and processed the image
for (let i = 0; i < 20; i++) {
  const { status_code: status } = await graph("GET", `/${creationId}`, { fields: "status_code" });
  if (status === "FINISHED") break;
  if (status === "ERROR") throw new Error("Instagram failed to process the image");
  console.log(`Container status: ${status}, waiting...`);
  await sleep(6000);
}

// 3. Publish
const { id: mediaId } = await graph("POST", `/${IG_USER_ID}/media_publish`, {
  creation_id: creationId,
});
console.log(`Published! media id: ${mediaId}`);

// 4. Log the permalink for the run summary
try {
  const { permalink } = await graph("GET", `/${mediaId}`, { fields: "permalink" });
  console.log(`Post is live: ${permalink}`);
} catch {
  /* permalink is nice-to-have */
}
