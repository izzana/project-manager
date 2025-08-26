import { StyledBackButton, StyledBackIcon } from "./PageHeaderWithBackButton.styles";

export function PageHeaderWithBackButton({
  title,
  onBack,
}: { title: string; onBack: () => void }) {
  return (
    <>
      <StyledBackButton onClick={onBack}>
        <StyledBackIcon viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </StyledBackIcon>
        <span>Voltar</span>
      </StyledBackButton>
      <p>{title}</p>
    </>
  );
}
