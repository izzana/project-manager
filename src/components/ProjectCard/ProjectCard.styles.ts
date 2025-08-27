import styled from "styled-components";

export const StyledCard = styled.article`
  width: 280px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(17, 24, 39, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const StyledCover = styled.div`
  position: relative;
  height: 160px;
  background: #7e6af5;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const StyledGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.45) 100%
  );
`;

export const StylePlaceholder = styled.div`
  height: 100%;
`;

export const StyledTopActions = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  display: flex;
  gap: 8px;
`;

export const StarButton = styled.button`
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

export const StarIcon = styled.svg<{ $active: boolean }>`
  width: 20px;
  height: 19px;
  
  path {
    ${({ $active }) =>
      $active
        ? `
          fill: #FFB23D;
          stroke: #fff;
        `
        : `
          fill: none;
          stroke: #fff;
        `}
    stroke-width: 2;
    stroke-linejoin: round;
  }
`;

export const StyledMenuWrapper = styled.div`
  position: relative;
`;

export const StyledKebabButton = styled.button<{ $open: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
  place-items: center;
  cursor: pointer;

  &:hover {
    background: #d4c9c9ff;
  }

  ${(p) => p.$open && `box-shadow: 0 0 0 2px rgba(110,99,205,.25);`}
`;

export const StyledMenu = styled.div`
  position: absolute;
  right: -4px;
  top: 42px;
  background: #fff;
  border: 1px solid rgba(17, 24, 39, 0.08);
  border-radius: 10px;
  box-shadow: 0 12px 24px rgba(17, 24, 39, 0.12);
  min-width: 160px;
  padding: 8px;
  z-index: 5;

  &::before {
    content: "";
    position: absolute;
    top: -8px;
    right: 10px;
    width: 16px;
    height: 12px;
    background: #fff;
    border-left: 1px solid #e5e7eb;
    border-top: 1px solid #e5e7eb;
    transform: rotate(45deg);
    border-radius: 3px 0 0 0;
    z-index: -1;
  }
`;
export const StyledMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 8px;
  border-radius: 8px;
  border: none;
  color: #695CCD;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f5f5ff;
    color: #695CCD;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

export const StyledBody = styled.div`
  padding: 14px 16px 16px 16px;
  cursor: pointer;
`;

export const StyledCardTitle = styled.h4`
  margin: 0 0 6px 0;
  font-size: 18px;
  font-weight: 800;
  color: #1f2937;
`;

export const StyledRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4b5563;
  font-size: 14px;
  padding: 6px 0;
`;

export const StyledLabel = styled.span`
  color: #6b7280;
  font-weight: 600;
`;

export const StyledValue = styled.span`
  color: #111827;
`;

export const StyledDivider = styled.hr`
  border: 0;
  border-top: 1px solid #eee;
  margin: 8px 0;
`;
