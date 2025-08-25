import { useCallback, useMemo, useRef, useState } from "react";
import { ProjectRepo, type Project } from "../api/projectRepo";

export type CreateProjectInput = {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
};

export type FieldErrors = Partial<Record<keyof CreateProjectInput, string>>;

type UseCreateProjectReturn = {
  createProject: (input: CreateProjectInput) => Promise<Project | null>;
  isLoading: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
  reset: () => void;
  lastCreated: Project | null;
};

export function useCreateProject(): UseCreateProjectReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [lastCreated, setLastCreated] = useState<Project | null>(null);

  // para cancelar envio anterior se o usuário clicar várias vezes
  const abortRef = useRef<AbortController | null>(null);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setFieldErrors({});
    setLastCreated(null);
  }, []);

  const createProject = useCallback(async (raw: CreateProjectInput) => {
    // cancela requisição anterior (se existir)
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // pequenas normalizações
    const input: CreateProjectInput = {
      ...raw,
      name: raw.name.trim(),
      client: raw.client.trim(),
      startDate: raw.startDate, // já vem "YYYY-MM-DD" do DatePicker
      endDate: raw.endDate,
      cover: raw.cover,
    };

    try {
      const created = await ProjectRepo.create(input);
      setLastCreated(created);
      return created;
    } catch (error: any) {
      // nosso repo lança { validation: { field: "msg" } } para 422
      if (error?.validation) {
        setFieldErrors(error.validation as FieldErrors);
      } else if (error?.name === "AbortError") {
        // ignorar abort
      } else {
        setError(error?.message ?? "Erro ao criar projeto");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return useMemo(
    () => ({
      createProject,
      isLoading,
      error,
      fieldErrors,
      reset,
      lastCreated,
    }),
    [createProject, isLoading, error, fieldErrors, reset, lastCreated]
  );
}
