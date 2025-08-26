import { StyledLabel, Wrapper } from "../FormInput/FormInput.styles";
import { CalendarIcon, ErrorMessage, FieldWrapper, StyledInput } from "./DatePicker.styles";

type DatePickerProps = {
  label: string;
  name: string;
  value: string; // ISO "YYYY-MM-DD"
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  min?: string; // ISO
  max?: string; // ISO
  disabled?: boolean;
};

export function DatePicker({
  label,
  name,
  value,
  onChange,
  required,
  error,
  min,
  max,
  disabled,
}: DatePickerProps) {
  return (
    <Wrapper aria-live="polite">
      <StyledLabel htmlFor={name} $hasError={!!error}>
        {label} {required && <span>(Obrigatório)</span>}
      </StyledLabel>

      <FieldWrapper $hasError={!!error}>
        <StyledInput
          id={name}
          name={name}
          type="date"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          disabled={disabled}
          $hasError={!!error}
        />
        <CalendarIcon
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
          $hasError={!!error}
        >
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 1 1 2 0v1zm13 6H4v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V8zM5 7h14V6H5z"/>
        </CalendarIcon>
      </FieldWrapper>

      {error && (
        <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>
      )}
    </Wrapper>
  );
}

/* ===== styles ===== */