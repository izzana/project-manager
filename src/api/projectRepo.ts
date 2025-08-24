export type Project = {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Order = "alpha" | "started_desc" | "due_asc";

const baseUrl = "/api/projects";

function buildQuery(params: Record<string, string | boolean | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) search.set(key, String(value));
  });
  const str = search.toString();
  return str ? `?${str}` : "";
}

export const ProjectRepo = {
  async list(options?: { query?: string; favorite?: boolean; order?: Order; signal?: AbortSignal }) {
    const url = `${baseUrl}${buildQuery({
      q: options?.query,
      favorite: options?.favorite,
      order: options?.order,
    })}`;
    const response = await fetch(url, { signal: options?.signal });
    if (!response.ok) throw new Error("Failed to fetch projects");
    return response.json() as Promise<{ total: number; items: Project[] }>;
  },

  async get(id: string) {
    const response = await fetch(`${baseUrl}/${id}`);
    if (!response.ok) throw new Error("Project not found");
    return response.json() as Promise<Project>;
  },

  async create(input: Omit<Project, "id" | "createdAt" | "updatedAt" | "favorite">) {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (response.status === 422) {
      const data = await response.json();
      throw { validation: data.errors };
    }
    if (!response.ok) throw new Error("Create failed");
    return response.json() as Promise<Project>;
  },

  async update(id: string, patch: Partial<Project>) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (response.status === 422) {
      const data = await response.json();
      throw { validation: data.errors };
    }
    if (!response.ok) throw new Error("Update failed");
    return response.json() as Promise<Project>;
  },

  async toggleFavorite(id: string) {
    const response = await fetch(`${baseUrl}/${id}/favorite`, { method: "POST" });
    if (!response.ok) throw new Error("Favorite failed");
    return response.json() as Promise<Project>;
  },

  async remove(id: string) {
    const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Delete failed");
    return true;
  },
};
