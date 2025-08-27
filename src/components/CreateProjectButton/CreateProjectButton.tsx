import { useNavigate } from "react-router-dom";
import { StyledButton } from "./CreateProjectButton.styles";
import { FiPlusCircle } from "react-icons/fi";

export default function CreateProjectButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/projects/new");
  }

  return (
    <>
      <StyledButton onClick={() => handleClick()}>
        <FiPlusCircle  size={24} />
        <span>Novo projeto</span>
      </StyledButton>
    </>
  );
}
