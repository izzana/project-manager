import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import { HeaderBar, PageContainer } from "./SharedStyles.styles";

export function ListLayout() {
  return (
    <>
      <HeaderBar>
        <Header right={<SearchBar />} />
      </HeaderBar>

      <PageContainer>
        <Outlet />
      </PageContainer>
    </>
  );
}
