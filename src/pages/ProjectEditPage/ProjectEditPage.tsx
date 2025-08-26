
import { useEffect } from "react";
import {
  StyledContainer,
} from "./ProjectEditPage.styles";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../../components/ProjectForm/ProjectForm";
import { useUpdateProject } from "../../hooks/useUpdateProject";
import { PageHeaderWithBackButton } from "../../components/PageHeaderWithBackButton/PageHeaderWithBackButton";
import { useProjectForm } from "../../hooks/useProjectForm";

export default function ProjectCreatePage() {
  const { updateProject, getProject, isLoading } = useUpdateProject();
  const {
    formData, errors, submitting, updateField, handleSubmit, reset, setFormData,
  } = useProjectForm({
    onValidSubmit: async (data) => {
      await updateProject(id, data);
      navigate("/");
    },
  });

  const { id = "" } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const hasErrors = Object.keys(errors).length > 0;

  function handleReset() {
    reset();
    navigate("/");
  }

  useEffect(() => {
    (async () => {
      const data = await getProject(id);
      if (data) {
        setFormData(data);
      }
    })();
  }, []);

  return (
    <StyledContainer>
      <PageHeaderWithBackButton title="Editar projeto" onBack={handleReset} />
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
  
