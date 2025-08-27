import { PiCalendarCheckLight, PiCalendarDotLight } from "react-icons/pi";
import type { ProjectData } from "../../types/project";
import { DatePicker } from "./components/DatePicker/DatePicker";
import { FormInput } from "./components/FormInput/FormInput";
import { ImageUpload } from "./components/ImageUpload/ImageUpload";
import { StyledButton, StyledDateContainer } from "./ProjectForm.styles";

interface ProjectFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  formData: ProjectData;
  disabled?: boolean;
  updateField: <K extends keyof ProjectData>(
    field: K,
    value: ProjectData[K]
  ) => void;
  errors: {
    [k: string]: string;
  };
}

export default function ProjectForm({
  disabled,
  formData,
  errors,
  onSubmit,
  updateField,
}: ProjectFormProps) {
  return (
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
            icon={<PiCalendarDotLight size={24} />}
          />
          <DatePicker
            label="Data Final"
            name="endDate"
            value={formData.endDate}
            onChange={(v) => updateField("endDate", v)}
            required
            error={errors.endDate}
            min={formData.startDate || undefined}
            icon={<PiCalendarCheckLight size={24} />}
          />
        </StyledDateContainer>
        <ImageUpload
          label="Capa do projeto"
          name="cover"
          value={formData.cover}
          onChange={(_, preview) => updateField("cover", preview)}
        />
        <StyledButton type="submit" disabled={disabled}>
          Salvar Projeto
        </StyledButton>
      </div>
    </form>
  );
}
