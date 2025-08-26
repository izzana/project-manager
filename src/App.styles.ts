import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #F4F2FF;
`;

export const InnerLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 96vw;
  margin-top: 40px;
  overflow-y: auto;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;