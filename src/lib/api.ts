export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export type CmsPage = {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  seoMeta?: { title?: string; description?: string };
  contentBlocks?: Array<{ type?: string; html?: string; text?: string }>;
};

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  try {
    const response = await fetch(`${API_BASE}/pages/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!response.ok) return null;
    return (await response.json()) as CmsPage;
  } catch {
    return null;
  }
}

export async function getPublicSettings(): Promise<Record<string, any>> {
  try {
    const response = await fetch(`${API_BASE}/settings`, { cache: 'no-store' });
    if (!response.ok) return {};
    return await response.json();
  } catch { return {}; }
}

export async function getPublicPosts(type?: string): Promise<any[]> {
  try {
    const suffix = type ? `?type=${encodeURIComponent(type)}` : '';
    const response = await fetch(`${API_BASE}/posts${suffix}`, { cache: 'no-store' });
    if (!response.ok) return [];
    return (await response.json()) as any[];
  } catch {
    return [];
  }
}

export async function getPublicPost(slug: string, type?: string): Promise<any | null> {
  try {
    const response = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const post = await response.json();
    return type && post.type !== type ? null : post;
  } catch { return null; }
}

export async function getPublicPostContent<T>(slug: string, type: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}/posts/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!response.ok) return null;
    const post = await response.json();
    if (post.type !== type) return null;
    const block = Array.isArray(post.contentBlocks)
      ? post.contentBlocks.find((item: any) => item?.type === type) || post.contentBlocks[0]
      : null;
    if (!block) return null;
    return { ...block, slug: post.slug, title: post.title, seoMeta: post.seoMeta, image: block.image || post.featuredImage } as T;
  } catch {
    return null;
  }
}

export async function submitPublicForm(formType: string, data: Record<string, FormDataEntryValue>) {
  const response = await fetch(`${API_BASE}/forms/${encodeURIComponent(formType)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(Object.entries(data).map(([key, value]) => [key, String(value)]))),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Could not send your enquiry');
  return result;
}

export function cmsSlugForPath(pathname: string) {
  const path = pathname.replace(/^\/+|\/+$/g, '');
  if (!path) return 'home';
  return path.replace(/^services\//, 'services--').replace(/^projects\//, 'projects--').replace(/\//g, '--');
}
