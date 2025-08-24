import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25rem;
`;

export const StyledLabel = styled.label<{ $hasError: boolean }>`
  font-size: 0.92rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
  color: ${({ $hasError }) => ($hasError ? "#c53030" : "#695CCD")};

  span {
    margin-left: 0.25rem;
    font-weight: 400;
    font-size: 0.8rem;
    color: ${({ $hasError }) => ($hasError ? "#c53030" : "#666")};
  }
`;

export const FieldWrapper = styled.div<{ $hasError: boolean }>`
  position: relative;
  display: inline-flex;
  width: 100%;

  border: 1px solid ${({ $hasError }) => ($hasError ? "#c53030" : "#ccc")};
  border-radius: 6px;
  background: #fff;

  &:focus-within {
    border-color: ${({ $hasError }) => ($hasError ? "#c53030" : "#695CCD")};
    box-shadow: 0 0 0 2px
      ${({ $hasError }) => ($hasError ? "rgba(197,48,48,0.2)" : "rgba(74,58,255,0.2)")};
  }
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  appearance: none;
  -webkit-appearance: none;

  width: 100%;
  padding: 0.3rem 2.25rem 0.3rem 0.8rem; /* espaço à direita pro ícone */
  border: 0;
  background: transparent;
  border-radius: 6px;
  font-size: 1rem;
  color: ;
  color: ${({ $hasError }) => ($hasError ? "#c53030" : "#111")};

  &:disabled {
    background: #f6f6f6;
    color: #999;
    cursor: not-allowed;
  }

  /* tira o ícone default do Chrome para manter o nosso */
  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;

export const CalendarIcon = styled.svg<{ $hasError: boolean }>`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  fill: ${({ $hasError }) => ($hasError ? "#c53030" : "#6b6b6b")};
  pointer-events: none; /* clique continua abrindo o datepicker */
`;

export const ErrorMessage = styled.small`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #c53030;
`;
