import { http, HttpResponse, delay } from "msw";

export type Project = {
  id: string;
  name: string;
  client: string;
  startDate: string;   // "YYYY-MM-DD"
  endDate: string;     // "YYYY-MM-DD"
  cover?: string;      // dataURL/URL
  favorite: boolean;
  createdAt: string;   // ISO
  updatedAt: string;   // ISO
};

const STORAGE_KEY = "projects";

// -------- Utils de storage --------
function loadProjects(): Project[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// -------- Utils de validação/ordenação --------
function isISODate(value?: string) {
  return !!value && !isNaN(Date.parse(value));
}
function hasTwoWords(value: string) {
  return value.trim().split(/\s+/).length >= 2;
}
function hasAtLeastOneWord(value: string) {
  return value.trim().length > 0;
}
function sortProjects(list: Project[], order: string | null) {
  switch (order) {
    case "started_desc":
      return [...list].sort((a, b) =>
        (b.startDate ?? b.createdAt).localeCompare(a.startDate ?? a.createdAt)
      );
    case "due_asc":
      return [...list].sort((a, b) => a.endDate.localeCompare(b.endDate));
    default:
      return [...list].sort((a, b) => a.name.localeCompare(b.name)); // alfabético
  }
}

export const handlers = [
  // LIST
  http.get("/api/projects", async ({ request }) => {
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") ?? "").trim();
    const onlyFavorites = url.searchParams.get("favorite") === "true";
    const order = url.searchParams.get("order"); // "alpha" | "started_desc" | "due_asc"

    let projects = loadProjects();

    if (onlyFavorites) {
      projects = projects.filter(project => project.favorite);
    }

    if (query.length >= 3) {
      const lowerQuery = query.toLowerCase();
      projects = projects.filter(project =>
        project.name.toLowerCase().includes(lowerQuery) ||
        project.client.toLowerCase().includes(lowerQuery)
      );
    }

    const sortedProjects = sortProjects(projects, order);

    await delay(150);
    return HttpResponse.json({
      total: sortedProjects.length,
      items: sortedProjects,
    });
  }),

  // CREATE
  http.post("/api/projects", async ({ request }) => {
    const body = (await request.json()) as Omit<Project, "id" | "createdAt" | "updatedAt" | "favorite">;

    const validationErrors: Record<string, string> = {};
    if (!hasTwoWords(body.name)) validationErrors.name = "Informe ao menos duas palavras.";
    if (!hasAtLeastOneWord(body.client)) validationErrors.client = "Informe o cliente.";
    if (!isISODate(body.startDate)) validationErrors.startDate = "Data de início inválida.";
    if (!isISODate(body.endDate)) validationErrors.endDate = "Data final inválida.";

    if (Object.keys(validationErrors).length > 0) {
      return HttpResponse.json({ errors: validationErrors }, { status: 422 });
    }

    const now = new Date().toISOString();
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: body.name.trim(),
      client: body.client.trim(),
      startDate: new Date(body.startDate).toISOString().slice(0, 10),
      endDate: new Date(body.endDate).toISOString().slice(0, 10),
      cover: body.cover,
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };

    const projects = loadProjects();
    projects.unshift(newProject);
    saveProjects(projects);

    await delay(150);
    return HttpResponse.json(newProject, { status: 201 });
  }),

  // READ
  http.get("/api/projects/:id", async ({ params }) => {
    const projects = loadProjects();
    const project = projects.find(p => p.id === params.id);
    await delay(100);
    return project
      ? HttpResponse.json(project)
      : HttpResponse.json({ message: "Not found" }, { status: 404 });
  }),

  // UPDATE
  http.put("/api/projects/:id", async ({ params, request }) => {
    const projects = loadProjects();
    const projectIndex = projects.findIndex(p => p.id === params.id);
    if (projectIndex === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    const patch = (await request.json()) as Partial<Project>;
    const candidate = { ...projects[projectIndex], ...patch };

    const validationErrors: Record<string, string> = {};
    if (patch.name !== undefined && !hasTwoWords(candidate.name)) {
      validationErrors.name = "Informe ao menos duas palavras.";
    }
    if (patch.client !== undefined && !hasAtLeastOneWord(candidate.client)) {
      validationErrors.client = "Informe o cliente.";
    }
    if (patch.startDate !== undefined && !isISODate(candidate.startDate)) {
      validationErrors.startDate = "Data de início inválida.";
    }
    if (patch.endDate !== undefined && !isISODate(candidate.endDate)) {
      validationErrors.endDate = "Data final inválida.";
    }
    if (Object.keys(validationErrors).length > 0) {
      return HttpResponse.json({ errors: validationErrors }, { status: 422 });
    }

    candidate.updatedAt = new Date().toISOString();
    projects[projectIndex] = candidate;
    saveProjects(projects);

    await delay(150);
    return HttpResponse.json(projects[projectIndex]);
  }),

  // TOGGLE FAVORITE
  http.post("/api/projects/:id/favorite", async ({ params }) => {
    const projects = loadProjects();
    const projectIndex = projects.findIndex(project => project.id === params.id);
    if (projectIndex === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    projects[projectIndex].favorite = !projects[projectIndex].favorite;
    projects[projectIndex].updatedAt = new Date().toISOString();
    saveProjects(projects);

    await delay(80);
    return HttpResponse.json(projects[projectIndex]);
  }),

  // DELETE
  http.delete("/api/projects/:id", async ({ params }) => {
    const projects = loadProjects();
    const remaining = projects.filter(project => project.id !== params.id);

    if (remaining.length === projects.length) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }

    saveProjects(remaining);
    await delay(100);
    return HttpResponse.json({ ok: true });
  }),
];
