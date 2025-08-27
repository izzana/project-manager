import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ListLayout } from "../layouts/ListLayout";
import { PlainLayout } from "../layouts/PlainLayout";
import { Spinner } from "@chakra-ui/react";

const ProjectListPage = lazy(() => import("../pages/ProjectListPage/ProjectListPage"));
const ProjectCreatePage = lazy(() => import("../pages/ProjectCreatePage/ProjectCreatePage"));
const ProjectEditPage = lazy(() => import("../pages/ProjectEditPage/ProjectEditPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner size='xl' margin={'auto'} />}>
        <Routes>
          <Route element={<ListLayout />}>
            <Route path="/" element={<ProjectListPage />} />
          </Route>
          <Route element={<PlainLayout />}>
            <Route path="/projects/new" element={<ProjectCreatePage />} />
            <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
