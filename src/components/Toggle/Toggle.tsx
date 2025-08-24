import { StyledHiddenCheckbox, StyledKnob, StyledSwitch, StyledText, StyledWrapper } from "./Toggle.styles";

type ToggleProps = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
};

export function Toggle({ id, checked, onChange, label, disabled }: ToggleProps) {
  return (
    <StyledWrapper>
      <StyledHiddenCheckbox
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
      />
      <StyledSwitch htmlFor={id} $checked={checked} $disabled={disabled} tabIndex={0}>
        <StyledKnob $checked={checked} />
      </StyledSwitch>
      {label && (
        <StyledText
          htmlFor={id}
          $disabled={disabled}
        >
          {label}
        </StyledText>
      )}
    </StyledWrapper>
  );
}
