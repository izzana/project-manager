import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProjectListPage = lazy(() => import("../pages/ProjectListPage/ProjectListPage"));
const ProjectCreatePage = lazy(() => import("../pages/ProjectCreatePage/ProjectCreatePage"));
const ProjectEditPage = lazy(() => import("../pages/ProjectEditPage/ProjectEditPage"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: 24 }}>carregando…</div>}>
        <Routes>
          <Route path="/" element={<ProjectListPage />} />
          <Route path="/projects/new" element={<ProjectCreatePage />} />
          <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
