import styled, { css } from "styled-components";
import { ErrorMessage, StyledInput, StyledLabel, Wrapper } from "./FormInput.styles";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  type?: string;
  placeholder?: string;
}

export function FormInput({
  label,
  name,
  value,
  onChange,
  required,
  error,
  type = "text",
  placeholder,
}: FormInputProps) {
  return (
    <Wrapper>
      <StyledLabel htmlFor={name} $hasError={!!error}>
        {label} {required && <span>(Obrigatório)</span>}
      </StyledLabel>
      <StyledInput
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        $hasError={!!error}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Wrapper>
  );
}