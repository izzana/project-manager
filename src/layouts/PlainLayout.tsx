import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header"; 
import { HeaderBar, PageContainer } from "./SharedStyles.styles";

export function PlainLayout() {
  return (
    <>
      <HeaderBar>
        <Header />
      </HeaderBar>

      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}
