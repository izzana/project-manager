import { useEffect, useRef, useState } from "react";
import {
  StyledDropzone,
  StyledHiddenInput,
  StyledLabel,
  StyledOverlayGradient,
  StyledPreviewCard,
  StyledRemoveButton,
  StyledSelectButton,
  StyledTextOverlay,
  StyledTrashIcon,
  StyledUploadIcon,
  Wrapper,
} from "./ImageUpload.styles";

type ImageUploadProps = {
  label: string;
  name: string;
  value?: string; // base64 ou url
  onChange: (file: File | null, previewUrl?: string) => void;
  titleOverlay?: string; // "Project 01"
  subtitleOverlay?: string;
};

export function ImageUpload({
  label,
  name,
  value,
  onChange,
  titleOverlay,
  subtitleOverlay,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(value);

  function handlePick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        setPreview(url);
        onChange(file, url);
      };
      reader.readAsDataURL(file);
    }
  }

  function clearImage(e: React.MouseEvent) {
    e.stopPropagation();
    setPreview(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
  }

  useEffect(() => {
    setPreview(value);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [value]);

  return (
    <Wrapper>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>

      {!preview ? (
        <StyledDropzone onClick={handlePick} role="button" tabIndex={0}>
          <StyledUploadIcon viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 16a1 1 0 0 1-1-1V9.41l-2.3 2.29a1 1 0 0 1-1.4-1.42l4-4a1 1 0 0 1 1.4 0l4 4a1 1 0 1 1-1.4 1.42L13 9.4V15a1 1 0 0 1-1 1z" />
            <path d="M5 18a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5z" />
          </StyledUploadIcon>
          <p>Escolha uma imagem .jpg ou .png no seu dispositivo</p>
          <StyledSelectButton type="button">Selecionar</StyledSelectButton>
          <StyledHiddenInput
            ref={inputRef}
            id={name}
            name={name}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
          />
        </StyledDropzone>
      ) : (
        <StyledPreviewCard onClick={handlePick}>
          <img src={preview} alt="Capa do projeto" />
          <StyledOverlayGradient />
          {(titleOverlay || subtitleOverlay) && (
            <StyledTextOverlay>
              {titleOverlay && <h3>{titleOverlay}</h3>}
              {subtitleOverlay && <small>{subtitleOverlay}</small>}
            </StyledTextOverlay>
          )}
          <StyledRemoveButton
            type="button"
            aria-label="Remover imagem"
            onClick={clearImage}
            title="Remover"
          >
            <StyledTrashIcon viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1zm1 4H7l1 13h8l1-13h-3H10zm1 2a1 1 0 1 1 2 0v9a1 1 0 1 1-2 0V9zm4 0a1 1 0 1 1 2 0v9a1 1 0 1 1-2 0V9z" />
            </StyledTrashIcon>
          </StyledRemoveButton>
          <StyledHiddenInput
            ref={inputRef}
            id={name}
            name={name}
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
          />
        </StyledPreviewCard>
      )}
    </Wrapper>
  );
}
