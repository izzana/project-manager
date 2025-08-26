import {
  StyledContainer,
} from "./ProjectCreatePage.styles";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "../../hooks/useCreateProject";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { PageHeaderWithBackButton } from "../../components/PageHeaderWithBackButton/PageHeaderWithBackButton";
import { useProjectForm } from "../../hooks/useProjectForm";

export default function ProjectCreatePage() {
  const { createProject, isLoading } = useCreateProject();
  const {
    formData, errors, submitting, updateField, handleSubmit, reset,
  } = useProjectForm({
    onValidSubmit: async (data) => {
      const created = await createProject(data);
      if (created) {
        navigate("/");
      }
    },
  });
  const navigate = useNavigate();

  const hasErrors = Object.keys(errors).length > 0;

  function handleReset() {
    reset();
    navigate("/");
  }

  return (
    <StyledContainer>
      <PageHeaderWithBackButton title="Criar projeto" onBack={handleReset} />
      <ProjectForm
        disabled={hasErrors || isLoading || submitting}
        formData={formData}
        errors={errors}
        onSubmit={handleSubmit}
        updateField={updateField}
      />
    </StyledContainer>
  );
}
