import { useEffect, useMemo, useState } from "react";
import { ProjectRepo, type Order, type Project } from "../api/projectRepo";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../atoms/SearchQuery.atom";

type UseProjectsReturn = {
  projects: Project[];
  hasLoaded: boolean;
  isLoading: boolean;
  total: number;
  query: string;
  onlyFavorites: boolean;
  order: Order;
  error: string | null;
  favoriteProject: (id: string) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  reset: () => void;
  setOnlyFavorites: React.Dispatch<React.SetStateAction<boolean>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

export function useProjects(): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useAtom(searchQueryAtom); //é pra o componente de search, usar atoms
  //passar filtros para um único useState
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [order, setOrder] = useState<Order>("alpha");
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await ProjectRepo.list({
        query: query.length >= 3 ? query : undefined,
        favorite: onlyFavorites,
        order,
      });
      setProjects(data.items);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  };

  const favoriteProject = async (id: string) => {
    try {
      await ProjectRepo.toggleFavorite(id);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  const removeProject = async (id: string) => {
    try {
      await ProjectRepo.remove(id);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, onlyFavorites, order]);

  return useMemo(
  () => ({
    hasLoaded,
    projects,
    total,
    query,
    onlyFavorites,
    order,
    isLoading,
    error: null,
    favoriteProject,
    removeProject,
    reset: () => {},
    setOnlyFavorites,
    setQuery,
    setOrder,
  }),
  [hasLoaded, isLoading, onlyFavorites, order, projects, query, total]
);
}
