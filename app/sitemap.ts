import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server'; // Pastikan path ini sesuai dengan project lu

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ixiera.id'; // URL utama web lu

  // 1. DAFTAR HALAMAN STATIS LU
  const staticRoutes = [
    '',             // Halaman Home (ixiera.id)
    '/about',       // (Sesuaikan kalau lu punya halaman ini)
    '/solutions',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, // Ngasih tau Google seberapa sering halaman ini diupdate
    priority: route === '' ? 1 : 0.8,   // Home paling prioritas (1.0)
  }));

  // 2. DAFTAR HALAMAN DINAMIS (Tarik artikel dari Supabase)
  const supabase = await createClient();
  const { data: blogPosts } = await supabase
    .from('blog_posts')
    .select('slug, created_at');

  const dynamicRoutes = (blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.6, // Artikel blog prioritasnya standar
  }));

  // 3. GABUNGIN SEMUANYA
  return [...staticRoutes, ...dynamicRoutes];
}