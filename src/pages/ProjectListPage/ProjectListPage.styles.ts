import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const StyledContainerInner = styled.div`
  width: 100%;
  height: 100%;
  background-color: #FFFF;
`;

export const StyledFilters = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin: 8px 0;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  & > div > h1 {
    font-weight: 600;
    font-style: SemiBold;
    font-size: 24px;
    line-height: 100%;
    vertical-align: middle;
    color: #1F1283;
  }

  & > div > span {
    font-weight: 400;
    font-style: Regular;
    font-size: 17px;
    line-height: 100%;
    vertical-align: middle;
  }

  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  button {
    height: 40px;
  }
`;

export const StyledSelect = styled.select`
  appearance: none;          /* removendo estilo padrão */
  -webkit-appearance: none;
  -moz-appearance: none;

  width: 220px;
  padding: 10px 36px 10px 12px;
  font-size: 14px;
  color: #333;
  border: 1px solid #1C1930;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #695CCD;
    box-shadow: 0 0 0 2px rgba(105, 92, 205, 0.2);
  }

  /* customizando seta */
  background-image: url("data:image/svg+xml;utf8,<svg fill='%717171' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
`;

export const StyledProjectsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 0px;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
`;
