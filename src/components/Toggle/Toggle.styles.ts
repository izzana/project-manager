import styled, { css } from "styled-components";

export const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const StyledHiddenCheckbox = styled.input`
  /* esconde mantendo acessibilidade */
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;

  /* foco visível no switch via :has (fallback com label:focus-within) */
`;

export const StyledSwitch = styled.label<{ $checked: boolean; $disabled?: boolean }>`
  width: 44px;
  height: 24px;
  border-radius: 999px;
  background: #5a5863; /* off */
  position: relative;
  cursor: pointer;
  transition: background .2s ease;
  display: inline-block;

  ${({ $checked }) =>
    $checked &&
    css`
      background: #695CCD; /* on (roxo do seu design) */
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}

  /* anel de foco acessível */
  &:focus-within {
    box-shadow: 0 0 0 3px rgba(105, 92, 205, 0.25);
  }
`;

export const StyledKnob = styled.span<{ $checked: boolean }>`
  position: absolute;
  top: 3px;
  left: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform .2s ease;
  transform: translateX(0);

  ${({ $checked }) =>
    $checked &&
    css`
      transform: translateX(20px);
    `}
`;

export const StyledText = styled.label<{ $disabled?: boolean }>`
  font-size: 14px;
  color: #4b4a55;
  cursor: pointer;

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.7;
    `}
`;
