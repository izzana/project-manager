import { AnyProjectsToShow } from "./components/AnyProjectsToShow";
import {
  StyledContainer,
  StyledContainerInner,
  StyledFilters,
  StyledProjectsList,
} from "./ProjectListPage.styles";
import { Toggle } from "../../components/Toggle/Toggle";
import { useProjects } from "../../hooks/useProjects";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { useNavigate } from "react-router-dom";
import CreateProjectButton from "../../components/CreateProjectButton/CreateProjectButton";
import { SelectOrderMenu } from "../../components/SelectOrderMenu/SelectOrderMenu";

export default function ProjectListPage() {
  const {
    projects,
    total,
    query,
    onlyFavorites,
    order,
    favoriteProject,
    removeProject,
    setOnlyFavorites,
    setOrder,
  } = useProjects();
  const navigate = useNavigate();

  return (
    <StyledContainer>
      {projects.length === 0 && !onlyFavorites && !query ? (
        <StyledContainerInner>
          <AnyProjectsToShow />
        </StyledContainerInner>
      ) : (
        <div>
          <StyledFilters>
            <div>
              <h1>Projetos </h1>
              <span>({total})</span>
            </div>
            <div>
              <Toggle
                id="only-favorites"
                checked={onlyFavorites}
                onChange={setOnlyFavorites}
                label="Apenas Favoritos"
              />
              <SelectOrderMenu order={order} setOrder={setOrder} />
              <CreateProjectButton />
            </div>
          </StyledFilters>

          <StyledProjectsList style={{ marginTop: 16 }}>
            {projects.map((project) => (
              <ProjectCard
                id={project.id}
                name={project.name}
                client={project.client}
                startDate={project.startDate}
                endDate={project.endDate}
                cover={project.cover}
                favorite={project.favorite}
                onOpen={(id) => navigate(`/projects/${id}/edit`)}
                onToggleFavorite={() => favoriteProject(project.id)}
                onEdit={(id) => navigate(`/projects/${id}/edit`)}
                onRemove={() => removeProject(project.id)}
              />
            ))}
          </StyledProjectsList>
        </div>
      )}
    </StyledContainer>
  );
}
