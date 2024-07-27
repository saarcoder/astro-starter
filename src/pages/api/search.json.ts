import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export const GET: APIRoute= async ({ url }): Promise<Response>=> {
    const query: string | null= url.searchParams.get('query');
    console.log(query);
    if(!query) return new Response(JSON.stringify({
        error: 'Search query is required'
        }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });
    
    const allBlogArticles: CollectionEntry<'blog'>[]= await getCollection('blog');

    const searchResults= allBlogArticles.filter(article=> {
        const titleMatch: boolean= article.data.title.toLowerCase().includes(query!.toLowerCase())
        const contentMatch: boolean= article.body.toLowerCase().includes(query!.toLowerCase())
        const tagsMatch: boolean= article.data.tags.some(tag=> tag.toLowerCase().includes(query!.toLowerCase()))
        const slugMatch: boolean= article.slug.toLowerCase().includes(query!.toLowerCase())
        return titleMatch || contentMatch || tagsMatch || slugMatch
    });
    
    return new Response(JSON.stringify(searchResults), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}