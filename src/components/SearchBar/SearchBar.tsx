import { useRef, useState } from "react";
import { Button, useOutsideClick } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchWithHistory } from "../SearchWithHistory/SearchWithHistory";

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick({ ref: containerRef, handler: () => setIsOpen(false) });

  return (
    <div ref={containerRef}>
      {!isOpen ? (
        <Button
          color="white"
          variant="unstyled"
          pr={4}
          onClick={() => setIsOpen(true)}
          aria-label="Abrir busca"
        >
          <SearchIcon color="gray.300" />
        </Button>
      ) : (
        <SearchWithHistory
          storageKey="pm:lastSearches"
          minLength={3}
          maxItems={5}
        />
      )}
    </div>
  );
}
