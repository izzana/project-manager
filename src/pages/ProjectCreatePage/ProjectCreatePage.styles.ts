import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > p {
    font-weight: 600;
    font-size: 24px;
    line-height: 100%;
    vertical-align: middle;
    color: #1F1283;
    margin-bottom: 24px;
    margin-left: 8px;
    margin-top: 8px;
  }

  & > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #DCDCDC;
    border-radius: 8px;
  }

  & > form > div {
    width: 40vw;
    display: flex;
    flex-direction: column;
    padding: 24px;
  }
`;

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
