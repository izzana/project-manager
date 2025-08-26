import type { ProjectData } from "../types/project";

export function isValidISODate(dateString?: string) {
  return !!dateString && !Number.isNaN(Date.parse(dateString));
}

export function validateProject(data: ProjectData) {
  const errors: Record<string, string> = {};

  if (!isValidISODate(data.startDate)) errors.startDate = "Selecione uma data válida";
  if (!isValidISODate(data.endDate))   errors.endDate   = "Selecione uma data válida";

  if (isValidISODate(data.startDate) && isValidISODate(data.endDate) && data.startDate > data.endDate) {
    errors.endDate = "A data final deve ser posterior à inicial";
  }

  if (data.name.trim().split(/\s+/).length < 2) {
    errors.name = "Por favor, digite ao menos duas palavras";
  }
  if (data.client.trim().length < 1) {
    errors.client = "Por favor, digite o nome do cliente";
  }

  return errors;
}
