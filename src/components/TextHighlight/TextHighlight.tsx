import { Highlight } from "@chakra-ui/react";

export default function NameWithHighlight({ text, query }: { text: string; query: string }) {
  // separa as palavras da busca (>= 3 chars)
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length >= 3);

  if (tokens.length === 0) return <>{text}</>;

  return (
    <Highlight
      query={tokens}
      styles={{
        bg: "purple.100",
        rounded: "sm",
        px: "1",
        boxShadow: "inset 0 0 0 1px rgba(105,92,205,.35)",
        color: "inherit",
        fontWeight: "inherit",
      }}
    >
      {text}
    </Highlight>
  );
};
