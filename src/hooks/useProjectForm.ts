import { useCallback, useState } from "react";
import type { ProjectData } from "../types/project";
import { validateProject } from "../utils/validator";

type UseProjectFormOptions = {
  initial?: ProjectData;
  onValidSubmit: (data: ProjectData) => Promise<void> | void;
};

export function useProjectForm({
  initial,
  onValidSubmit,
}: UseProjectFormOptions) {
  const [formData, setFormData] = useState<ProjectData>(
    initial ?? {
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      cover: undefined,
    }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const updateField = useCallback(
    <K extends keyof ProjectData>(field: K, value: ProjectData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));

      // limpa erro do campo alterado
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        if (field === "startDate" || field === "endDate") {
          delete next.startDate;
          delete next.endDate;
        }
        return next;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const nextErrors = validateProject(formData);
      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) return;

      try {
        setSubmitting(true);
        await onValidSubmit(formData);
      } finally {
        setSubmitting(false);
      }
    },
    [formData, onValidSubmit]
  );

  const reset = useCallback(() => {
    setFormData({
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      cover: undefined,
    });
    setErrors({});
  }, []);

  return {
    formData,
    errors,
    submitting,
    updateField,
    handleSubmit,
    reset,
    setFormData,
    setErrors,
  };
}
