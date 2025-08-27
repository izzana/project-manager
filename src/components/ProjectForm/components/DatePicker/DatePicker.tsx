import { StyledLabel, Wrapper } from "../FormInput/FormInput.styles";
import { CalendarIcon, ErrorMessage, FieldWrapper, StyledInput } from "./DatePicker.styles";

type DatePickerProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
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
  icon,
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
        <CalendarIcon $hasError={!!error}>
          {icon}
        </CalendarIcon>
      </FieldWrapper>

      {error && (
        <ErrorMessage id={`${name}-error`}>{error}</ErrorMessage>
      )}
    </Wrapper>
  );
}
