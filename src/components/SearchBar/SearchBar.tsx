import { Button, SearchIcon, useOutsideClick } from "@chakra-ui/icons";
import { SearchWithHistory } from "../SearchBarWithHistory/SearchBarWithHistory";
import { StyledContainer, StyledImage } from "./SearchBar.styles";
import { useRef, useState } from "react";

export default function SearchBar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const currentRef = useRef<HTMLDivElement>(null);
   useOutsideClick({
    ref: currentRef,
    handler: () => setIsOpenSearch(false),
  });

  function onButtonSearchClick () {
    setIsOpenSearch(!isOpenSearch);
  }

  return (
    <StyledContainer>
      {!isOpenSearch ? (
        <>
          <div/>
          <StyledImage src="/logo.png" alt="" />
          <Button color="white" variant="unstyled" paddingRight={10} onClick={onButtonSearchClick}>
            <SearchIcon color="gray.400" />
          </Button>
        </>
      ) : (
        <SearchWithHistory
          ref={currentRef}
          storageKey="pm:lastSearches"
          minLength={3}
          maxItems={5}
        />
      ) }
    </StyledContainer>
  );
}
