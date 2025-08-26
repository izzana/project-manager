import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const StyledLabel = styled.label<{ $hasError: boolean }>`
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  color: ${({ $hasError }) => ($hasError ? "#c53030" : "#695CCD")}; /* vermelho ou azul */
  font-weight: 500;

  span {
    font-weight: 400;
    font-size: 0.8rem;
    margin-left: 0.25rem;
    color: ${({ $hasError }) => ($hasError ? "#c53030" : "#666")};
  }
`;

export const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "#c53030" : "#ccc")};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? "#c53030" : "#695CCD")};
    box-shadow: 0 0 0 2px
      ${({ $hasError }) => ($hasError ? "rgba(197,48,48,0.2)" : "rgba(74,58,255,0.2)")};
  }
`;

export const ErrorMessage = styled.small`
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #c53030;
`;
