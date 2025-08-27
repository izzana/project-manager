import styled from "styled-components";

export const StyledBackIcon = styled.svg`
  width: 18px;
  height: 18px;
  stroke: #695CCD;
  fill: none;
  color: #695CCD;
`;

export const StyledBackButton = styled.button`
  background: none;
  border: none;
  width: fit-content;
  display: flex;
  align-items: center;
  cursor: pointer;

  & > span {
    margin-left: 8px;
    color: #695CCD;
  }
`;

export const StyledTitle = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  vertical-align: middle;
  color: #1F1283;
  margin-bottom: 24px;
  margin-left: 8px;
  margin-top: 8px;
`;
