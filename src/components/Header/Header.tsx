// src/components/Header/Header.tsx
import { type ReactNode } from "react";
import { StyledContainer, StyledImage } from "./Header.styles.ts";

export default function Header({ right }: { right?: ReactNode }) {
  return (
    <StyledContainer>
      {/* espaço à esquerda se precisar de algo no futuro */}
      <div />
      <StyledImage src="/logo.png" alt="Logo" />
      <div>{right}</div>
    </StyledContainer>
  );
}
