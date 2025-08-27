import { type ReactNode } from "react";
import { StyledContainer, StyledImage } from "./Header.styles.ts";

export default function Header({ right }: { right?: ReactNode }) {
  return (
    <StyledContainer>
      <div />
      <StyledImage src="/logo.png" alt="Logo" />
      <div>{right}</div>
    </StyledContainer>
  );
}
