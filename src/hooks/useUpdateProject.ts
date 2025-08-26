// src/hooks/useUpdateProject.ts
import { useCallback, useMemo, useRef, useState } from "react";
import { ProjectRepo, type Project } from "../api/projectRepo";
import type { ProjectData } from "../types/project";

export type FieldErrors = Partial<Record<keyof ProjectData, string>>;

type UseUpdateProjectReturn = {
  getProject: (projectId: string) => Promise<ProjectData | null>;
  updateProject: (projectId: string, data: ProjectData) => Promise<Project | null>;
  isLoading: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
  reset: () => void;
};

export function useUpdateProject(): UseUpdateProjectReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setFieldErrors({});
  }, []);

  const getProject = useCallback(async (projectId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const project = await ProjectRepo.get(projectId);
      return project;
    } catch (error) {
      setError("Não foi possível carregar o projeto.");
      console.error(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (projectId: string, data: ProjectData) => {
    // cancela requisição anterior (se houver)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // normalizações
    const input = {
      name: data.name.trim(),
      client: data.client.trim(),
      startDate: data.startDate,
      endDate: data.endDate,
      cover: data.cover,
    };

    try {
      const updated = await ProjectRepo.update(projectId, input);
      return updated;
    } catch (error: any) {
      if (error?.name === "AbortError") {
        // ignorar abort
      } else if (error?.validation) {
        setFieldErrors(error.validation as FieldErrors);
      } else {
        setError(error?.message ?? "Erro ao atualizar projeto.");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      getProject,
      updateProject,
      isLoading,
      error,
      fieldErrors,
      reset,
    }),
    [getProject, updateProject, isLoading, error, fieldErrors, reset]
  );
}
