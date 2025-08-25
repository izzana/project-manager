import { useState } from "react";
import { FormInput } from "./components/FormInput/FormInput";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import {
  StyledBackButton,
  StyledBackIcon,
  StyledButton,
  StyledContainer,
  StyledDateContainer,
} from "./ProjectCreatePage.styles";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../../hooks/useCreateProject";

type ProjectData = {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
};

function isValidISODate(s: string) {
  return !!s && !Number.isNaN(Date.parse(s));
}

export default function ProjectCreatePage() {
  const { createProject, isLoading } = useCreateProject();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectData>({
    name: "",
    client: "",
    startDate: "",
    endDate: "",
    cover: undefined,
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const hasErrors = Object.keys(errors).length > 0;

  function handleReset() {
    setFormData({
      name: "",
      client: "",
      startDate: "",
      endDate: "",
      cover: undefined,
    });
    navigate("/");
  }

  function updateField<K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) {
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as string];

      if (field === "startDate" || field === "endDate") {
        delete next.startDate;
        delete next.endDate;
      }
      return next;
  });
  }

  async function onSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    if (!validate()) return;

    const created = await createProject(formData);
    if (created) navigate("/");
  }

  function validate(): boolean {
    const next: typeof errors = {};
    if (!isValidISODate(formData.startDate))
      next.startDate = "Selecione uma data válida";
    if (!isValidISODate(formData.endDate))
      next.endDate = "Selecione uma data válida";
    if (
      isValidISODate(formData.startDate) &&
      isValidISODate(formData.endDate) &&
      formData.startDate > formData.endDate
    ) {
      next.endDate = "A data final deve ser posterior à inicial";
    }
    if (formData.name.trim().split(" ").length < 2) {
      next.name = "Por favor, digite ao menos duas palavras";
    }
    if (formData.client.trim().length < 1) {
      next.client = "Por favor, digite o nome do cliente";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  return (
    <StyledContainer>
      <StyledBackButton onClick={handleReset}>
        <StyledBackIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M15 5L8 12L15 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 12H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </StyledBackIcon>
        <span>Voltar</span>
      </StyledBackButton>
      <p>Novo projeto</p>
      <form onSubmit={onSubmit}>
        <div>
          <FormInput
            label="Nome do projeto"
            name="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
            error={errors.name}
          />

          <FormInput
            label="Cliente"
            name="client"
            value={formData.client}
            onChange={(e) => updateField("client", e.target.value)}
            required
            error={errors.client}
          />
          <StyledDateContainer>
            <DatePicker
              label="Data de Início"
              name="startDate"
              value={formData.startDate}
              onChange={(v) => updateField("startDate", v)}
              required
              error={errors.startDate}
              max={formData.endDate || undefined}
            />
            <DatePicker
              label="Data Final"
              name="endDate"
              value={formData.endDate}
              onChange={(v) => updateField("endDate", v)}
              required
              error={errors.endDate}
              min={formData.startDate || undefined}
            />
          </StyledDateContainer>
          <ImageUpload
            label="Capa do projeto"
            name="cover"
            value={formData.cover}
            onChange={(_, preview) => updateField("cover", preview)}
          />
          <StyledButton type="submit" disabled={hasErrors || isLoading}>
            Salvar Projeto
          </StyledButton>
        </div>
      </form>
    </StyledContainer>
  );
}
