import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const StyledLabel = styled.label`
  font-size: 0.9rem;
  color: #695ccd;
  font-weight: 600;
`;

export const StyledDropzone = styled.div`
  border: 1px dashed #999;
  border-radius: 10px;
  padding: 24px;
  background: #f6f3ff;
  color: #555;
  display: grid;
  place-items: center;
  text-align: center;
  gap: 0.5rem;
  cursor: pointer;

  p {
    font-size: 0.9rem;
  }

  &:hover {
    border-color: #695ccd;
  }
`;

export const StyledUploadIcon = styled.svg`
  width: 28px;
  height: 28px;
  fill: #695ccd;
`;

export const StyledSelectButton = styled.button`
  padding: 6px 18px;
  border: 1px solid #695ccd;
  color: #695ccd;
  background: transparent;
  border-radius: 999px;
  font-size: 0.85rem;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #695ccd;
    color: #fff;
  }
`;

export const StyledHiddenInput = styled.input`
  display: none;
`;

export const StyledPreviewCard = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;

  img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 260px;
    object-fit: cover;
  }
`;

export const StyledOverlayGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.3) 70%,
    rgba(0, 0, 0, 0.45) 100%
  );
  pointer-events: none;
`;

export const StyledTextOverlay = styled.div`
  position: absolute;
  left: 24px;
  bottom: 18px;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);

  h3 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 800;
  }
  small {
    display: block;
    margin-top: 4px;
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;

export const StyledRemoveButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
  place-items: center;

  &:hover {
    background: #fff;
  }
`;

export const StyledTrashIcon = styled.svg`
  width: 18px;
  height: 18px;
  fill: #6b6b6b;
`;
