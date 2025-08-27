import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

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
