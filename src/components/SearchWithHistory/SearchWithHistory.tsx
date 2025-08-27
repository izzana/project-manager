import { VscHistory } from "react-icons/vsc";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../../atoms/SearchQuery.atom";

type Props = {
  storageKey?: string;
  placeholder?: string;
  minLength?: number;
  maxItems?: number;
};

export function SearchWithHistory({
  storageKey = "search_history",
  placeholder = "Digite o nome do projeto...",
  minLength = 3,
  maxItems = 5,
}: Props) {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [history, setHistory] = useState<string[]>([]);
  const lastSavedRef = useRef<string>("");

  // salvar histórico
  const persist = useCallback(
    (items: string[]) => {
      setHistory(items);
      try {
        localStorage.setItem(storageKey, JSON.stringify(items));
      } catch {
        setHistory([]);
      }
    },
    [storageKey]
  );

  // adicionar ao histórico
  const pushHistory = useCallback(
    (searchTerm: string) => {
      const currentTerm = searchTerm.trim();
      if (!currentTerm) return;
      const without = history.filter(
        (i) => i.toLowerCase() !== currentTerm.toLowerCase()
      );
      persist([currentTerm, ...without].slice(0, maxItems));
    },
    [history, persist, maxItems]
  );

  const onSearchItem = useCallback((item: string) => {
    setQuery(item);
  }, [setQuery]);

  const handleSearchTerm = useCallback(() => {
    const term = query.trim();
    if (term.length < minLength) return;
    pushHistory(term);
    onSearchItem(term);
  }, [query, minLength, pushHistory, onSearchItem]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearchTerm();
    }
  };

  const removeItem = (idx: number) => {
    const next = history.filter((_, i) => i !== idx);
    persist(next);
  };

  const hasHistory = history.length > 0;

  const helperText = useMemo(
    () =>
      query.length > 0 && query.length < minLength
        ? `Digite pelo menos ${minLength} caracteres`
        : "",
    [query, minLength]
  );

    /**
     * useEffect responsible for loading the saved history from `localStorage`
     * when the component mounts or when the key (`storageKey`) changes.
     *
     * - Retrieves the stored string from `localStorage` using the provided key.
     * - If it exists, tries to parse it as JSON and updates the `history` state.
     * - If an error occurs (e.g., invalid JSON or storage unavailable),
     *   initializes the state with an empty array.
   */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, [storageKey]);

  /**
   * useEffect responsible for handling the search term with a debounce mechanism.
   *
   * - Trims the current `query` and checks if it meets the minimum length (`minLength`).
   * - If the term is the same as the last saved one, it simply triggers `onSearchItem`.
   * - Otherwise, starts a 500ms timer:
   *    - After the delay, adds the term to history (`pushHistory`),
   *      updates `lastSavedRef`, and calls `onSearchItem`.
   * - Cleans up the timeout on component unmount or when dependencies change.
 */
  useEffect(() => {
    const term = query.trim();
    if (term.length < minLength) {
      return;
    };

    if (term === lastSavedRef.current) {
      onSearchItem(term);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pushHistory(term);
      lastSavedRef.current = term;
      onSearchItem(term);
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [query, minLength, pushHistory, onSearchItem]);

  return (
    <Box
      w="100%"
      top="0px"
      left="0px"
      right="0px"
      zIndex={20}
      mx="auto"
      border={`1px solid #695CCD`}
      borderRadius="10px"
      overflow="hidden"
      bg="white"
      p={0}
      position="absolute"
    >
      <Box borderBottom="1px solid #EDEBFF">
        <InputGroup h="80px" m="0">
          <InputLeftElement pointerEvents="none" top="20px">
            <SearchIcon color="#695CCD" />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            border="none"
            h="80px"
            pr="12px"
            pl="40px"
            _focus={{ outline: "none", boxShadow: "none" }}
          />
        </InputGroup>
      </Box>

      {helperText && (
        <Flex px="3" py="2" fontSize="sm" color="gray.500">
          {helperText}
        </Flex>
      )}

      {hasHistory && (
        <Box maxH="420px" overflowY="auto">
          <List spacing={0}>
            {history.map((item, idx) => (
              <ListItem
                key={`${item}-${idx}`}
                px="3"
                py="3"
                borderBottom="1px solid"
                borderColor="#F4F2FF"
                _hover={{ bg: "gray.50", cursor: "pointer" }}
              >
                <Flex align="center" justify="space-between" gap="2">
                  <Flex
                    align="center"
                    gap="2"
                    onClick={() => {
                      setQuery(item);
                      onSearchItem(item);
                    }}
                  >
                    <VscHistory color="#717171" size={16} />
                    <Text color="#717171">{item}</Text>
                  </Flex>
                  <IconButton
                    aria-label="Remover"
                    icon={<CloseIcon boxSize={3} />}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeItem(idx);
                    }}
                  />
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}
