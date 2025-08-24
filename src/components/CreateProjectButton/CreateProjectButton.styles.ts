import styled from "styled-components";

export const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background-color: #695CCD;
  color: #FFFFFF;
  cursor: pointer;
  border: 1px solid #695CCD;
  border-radius: 26px;

  &:hover {
    background-color:  #7164d3ff;
  }
`;