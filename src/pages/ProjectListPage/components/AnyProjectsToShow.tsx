import { StyledContainerr } from "./AnyProjectsToShow.styles";
import CreateProjectButton from "../../../components/CreateProjectButton/CreateProjectButton"; 
export function AnyProjectsToShow() {
  return (
    <StyledContainerr>
      <h2>Nenhum projeto</h2>
      <p>Clique no botão abaixo para criar o primeiro e gerenciá-lo.</p>
      <CreateProjectButton />
    </StyledContainerr>
  );
}
