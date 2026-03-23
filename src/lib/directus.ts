// Directus API client
const DIRECTUS_URL = 'https://directus.mtdnot.dev';
const DIRECTUS_TOKEN = '181f69a0240049cb15c4267cf5a0a5f9f22571e221531c9c817c5f4ad4d604d0';

const headers: HeadersInit = { 'Authorization': `Bearer ${DIRECTUS_TOKEN}` };

export interface Document {
  id: string;
  title: string;
  slug: string;
  content: string;
  summary?: string;
  tags?: string[];
  clearance: number;
  date_created: string;
  date_updated?: string;
  cover_image?: string;
  project_id?: string;
}

export interface Project {
  id: string;
  name: string;
  slug?: string;
}

export async function getDocuments(projectId?: string): Promise<Document[]> {
  let url = `${DIRECTUS_URL}/items/documents?fields=id,title,slug,summary,tags,clearance,date_created,date_updated,cover_image,project_id`;
  url += '&filter[status][_eq]=published';
  
  if (projectId) {
    url += `&filter[project_id][_eq]=${projectId}`;
  }
  
  url += '&sort=-date_created';
  
  const res = await fetch(url, { headers });
  const json = await res.json();
  return json.data || [];
}

export async function getDocument(slug: string): Promise<Document | null> {
  const url = `${DIRECTUS_URL}/items/documents?filter[slug][_eq]=${encodeURIComponent(slug)}`;
  const res = await fetch(url, { headers });
  const json = await res.json();
  return json.data?.[0] || null;
}

export async function getProjects(): Promise<Project[]> {
  const url = `${DIRECTUS_URL}/items/projects?fields=id,name`;
  const res = await fetch(url, { headers });
  const json = await res.json();
  console.log('Projects fetched:', json.data?.length || 0);
  return json.data || [];
}

export function getAssetUrl(fileId: string): string {
  return `${DIRECTUS_URL}/assets/${fileId}`;
}
