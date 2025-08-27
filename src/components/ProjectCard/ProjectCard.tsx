import { useMemo, useRef, useState } from "react";
import { PiCalendarCheckLight, PiCalendarDotLight, PiNotePencilLight, PiTrashSimple } from "react-icons/pi";
import { RxDotsHorizontal } from "react-icons/rx";
import {
  StyledCard,
  StyledCover,
  StyledGradient,
  StylePlaceholder,
  StarButton,
  StarIcon,
  StyledTopActions,
  StyledMenuWrapper,
  StyledKebabButton,
  StyledMenu,
  StyledMenuItem,
  StyledBody,
  StyledCardTitle,
  StyledLabel,
  StyledRow,
  StyledTitleOverlay,
  StyledDivider,
  StyledValue,
} from "./ProjectCard.styles";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";
import { useOutsideClick } from "@chakra-ui/react";

export type ProjectCardProps = {
  id: string;
  name: string;
  client: string;
  startDate: string;
  endDate: string;
  cover?: string;
  favorite: boolean;
  onOpen?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onEdit?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export function ProjectCard({
  id,
  name,
  client,
  startDate,
  endDate,
  cover,
  favorite,
  onOpen,
  onToggleFavorite,
  onEdit,
  onRemove,
}: ProjectCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: containerRef, handler: () => setMenuOpen(false) });

  const formatDate = useMemo(() => {
    const fmt = (iso: string) =>
      new Date(iso).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    return { start: fmt(startDate), end: fmt(endDate) };
  }, [startDate, endDate]);

  function handleCardClick() {
    if (!menuOpen) onOpen?.(id);
  }

  function handleDelete() {
    setOpenDeleteModal(false);
    onRemove?.(id);
  }

  return (
    <StyledCard role="article">
      <StyledCover onClick={handleCardClick}>
        {cover ? (
          <>
            <img src={cover} alt={`Capa de ${name}`} />
            <StyledGradient />
          </>
        ) : (
          <StylePlaceholder>
            <img src="/fallback-cover.png" alt="Projeto sem capa" />
          </StylePlaceholder>
        )}

        <StyledTopActions>
          <StarButton
            aria-label={favorite ? "Desfavoritar" : "Favoritar"}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onToggleFavorite?.(id);
            }}
            title={favorite ? "Desfavoritar" : "Favoritar"}
          >
            <StarIcon $active={favorite} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3.5l2.9 5.88 6.5.95-4.7 4.57 1.11 6.48L12 18.9 6.19 21.38 7.3 14.9 2.6 10.33l6.5-.95L12 3.5z" />
            </StarIcon>
          </StarButton>

          <StyledMenuWrapper onClick={(e) => e.stopPropagation()}>
            <StyledKebabButton
              aria-label="Mais ações"
              onClick={() => setMenuOpen((v) => !v)}
              $open={menuOpen}
              title="Mais ações"
            >
              <RxDotsHorizontal />
            </StyledKebabButton>
            {menuOpen && (
              <StyledMenu ref={containerRef} role="menu">
                <StyledMenuItem
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.(id);
                  }}
                >
                  <PiNotePencilLight color="#695ccd" size={24} />
                  Editar
                </StyledMenuItem>
                <StyledMenuItem
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenDeleteModal(true);
                  }}
                >
                  <PiTrashSimple color="#695ccd" size={24} />
                  Remover
                </StyledMenuItem>
              </StyledMenu>
            )}
          </StyledMenuWrapper>
        </StyledTopActions>

        {/* título sobreposto apenas se houver capa */}
        {cover && (
          <StyledTitleOverlay>
            <h3>{name}</h3>
            <small>{client}</small>
          </StyledTitleOverlay>
        )}
      </StyledCover>

      <StyledBody onClick={handleCardClick}>
        <StyledCardTitle>{name}</StyledCardTitle>
        <StyledRow>
          <StyledLabel>Cliente:</StyledLabel>
          <StyledValue>{client}</StyledValue>
        </StyledRow>
        <StyledDivider />
        <StyledRow>
          <PiCalendarDotLight size={24} />
          {formatDate.start}
        </StyledRow>
        <StyledRow>
          <PiCalendarCheckLight size={24} />
          {formatDate.end}
        </StyledRow>
      </StyledBody>
      <DeleteProjectModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={handleDelete}
        projectName={name}
      />
    </StyledCard>
  );
}
