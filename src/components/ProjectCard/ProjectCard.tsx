import { useMemo, useState } from "react";
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
  StyledPencilIcon,
  StyledTrashIcon,
  StyledBody,
  StyledCardTitle,
  StyledLabel,
  StyledRow,
  StyledTitleOverlay,
  StyledDivider,
  StyledValue,
  StyledKebabIcon,
} from "./ProjectCard.styles";
import { DeleteProjectModal } from "../DeleteProjectModal/DeleteProjectModal";

export type ProjectCardProps = {
  id: string;
  name: string;
  client: string;
  startDate: string; // "YYYY-MM-DD"
  endDate: string; // "YYYY-MM-DD"
  cover?: string; // base64/URL
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
              <StyledKebabIcon viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="5" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="12" cy="19" r="2" />
              </StyledKebabIcon>
            </StyledKebabButton>
            {menuOpen && (
              <StyledMenu role="menu">
                <StyledMenuItem
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.(id);
                  }}
                >
                  <StyledPencilIcon viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.3a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.84z" />
                  </StyledPencilIcon>
                  Editar
                </StyledMenuItem>
                <StyledMenuItem
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenDeleteModal(true);
                  }}
                >
                  <StyledTrashIcon viewBox="0 0 24 24">
                    <path d="M9 3h6a1 1 0 0 1 1 1v1h4a1 1 0 1 1 0 2h-1l-1 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 7H4a1 1 0 1 1 0-2h4V4a1 1 0 0 1 1-1zM8 7l1 13h6l1-13H8z" />
                  </StyledTrashIcon>
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
          <CalendarIcon />
          {formatDate.start}
        </StyledRow>
        <StyledRow>
          <CalendarIcon />
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

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      stroke="#6b6b6b"
      strokeWidth="1.6"
    />
    <path d="M3 9h18" stroke="#6b6b6b" strokeWidth="1.6" />
    <path
      d="M8 3v4M16 3v4"
      stroke="#6b6b6b"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);
