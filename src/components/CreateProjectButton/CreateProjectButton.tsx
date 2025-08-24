import { useNavigate } from "react-router-dom";
import { StyledButton } from "./CreateProjectButton.styles";
import { AddCircleIcon } from "../AddCircleIcon/AddCircleIcon";

export default function CreateProjectButton() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/projects/new");
  }

  return (
    <>
      <StyledButton onClick={() => handleClick()}>
        <AddCircleIcon />
        <span>Novo projeto</span>
      </StyledButton>
    </>
  );
}
