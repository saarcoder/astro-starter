import { defineCollection } from "astro:content";
const blogCollection = defineCollection("blog", {});

export const collections= {
    blog: blogCollection
}