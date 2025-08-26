import styled from "styled-components";

export const StyledDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  & > div {
    width: 48%;
  }
`;

export const StyledButton = styled.button`
  padding: 15px 0px;
  background-color: #695CCD;
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  margin-top: 32px;
  border-radius: 26px;

  &:hover {
    background-color:  #6c60c4d2;
  }

  &:disabled {
    background-color: #B2A8FF;
    cursor: not-allowed;
  }
`;
