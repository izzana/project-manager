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
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon, TimeIcon, DeleteIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { searchQueryAtom } from "../../atoms/SearchQuery.atom";

type Props = {
  storageKey?: string; // chave do localStorage (default: "search_history")
  placeholder?: string;
  minLength?: number; // mínimo de caracteres para pesquisar (default: 3)
  maxItems?: number; // máximo guardado (default: 5)
  ref: React.RefObject<HTMLDivElement | null>;
};

export function SearchWithHistory({
  storageKey = "search_history",
  placeholder = "Digite o nome do projeto...",
  minLength = 3,
  maxItems = 5,
  ref,
}: Props) {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [history, setHistory] = useState<string[]>([]);

  // cores
  const border = useColorModeValue("#DFD9FF", "#4b3fb8");
  const listBorder = useColorModeValue("gray.100", "whiteAlpha.200");

  // carregar histórico
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      setHistory([]);
    }
  }, [storageKey]);

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

  // adicionar ao histórico (dedupe + limitar)
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

  const clearAll = () => persist([]);

  const hasHistory = history.length > 0;

  const helperText = useMemo(
    () =>
      query.length === 1 && query.length < minLength
        ? `Digite pelo menos ${minLength} caracteres`
        : "",
    [query, minLength]
  );

  return (
    <Box
      ref={ref}
      w="100%"
      top="0px" // descola do topo do header
      left="0px"
      right="0px"
      zIndex={20}
      mx="auto"
      border={`1px solid ${border}`}
      borderRadius="10px"
      overflow="hidden"
      bg="white"
      p={0}
      position="absolute"
    >
      {/* Campo de busca */}
      <Box borderBottom="1px solid #EDEBFF">
        <InputGroup h="56px" m="0">
          <InputLeftElement pointerEvents="none" top="2">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            border="none"
            h="56px"
            pr="12px"
            pl="40px"
            _focus={{ outline: "none", boxShadow: "none" }}
          />
        </InputGroup>
      </Box>

      {/* Ajuda mínima */}
      {helperText && (
        <Flex px="3" py="2" fontSize="sm" color="gray.500">
          {helperText}
        </Flex>
      )}

      {/* Histórico */}
      {hasHistory && (
        <Box maxH="420px" overflowY="auto">
          <List spacing={0}>
            {history.map((item, idx) => (
              <ListItem
                key={`${item}-${idx}`}
                px="3"
                py="3"
                borderBottom="1px solid"
                borderColor={listBorder}
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
                    <TimeIcon color="gray.500" />
                    <Text>{item}</Text>
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

          <Flex justify="flex-end" p="2">
            <Button
              leftIcon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              onClick={clearAll}
            >
              Limpar histórico
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  );
}
