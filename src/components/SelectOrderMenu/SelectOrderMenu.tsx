import { Menu, MenuButton } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import type { Order } from "../../api/projectRepo";
import {
  StyledButton,
  StyledMenuItem,
  StyledMenuList,
} from "./SelectOrderMenu.styles";

const options: { value: Order; label: string }[] = [
  { value: "alpha", label: "Ordem alfabética" },
  { value: "started_desc", label: "Iniciados mais recentes" },
  { value: "due_asc", label: "Prazo mais próximo" },
];

export function SelectOrderMenu({
  order,
  setOrder,
}: {
  order: Order;
  setOrder: (order: Order) => void;
}) {
  const selected =
    options.find((currentOrder) => currentOrder.value === order)?.label ??
    "Selecionar";

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={StyledButton}
            rightIcon={
              <ChevronDownIcon
                boxSize={4}
                color="#717171"
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                transition="transform .15s ease"
              />
            }
          >
            {selected}
          </MenuButton>

          <StyledMenuList>
            {options.map((options) => (
              <StyledMenuItem
                key={options.value}
                onClick={() => setOrder(options.value)}
              >
                {options.label}
              </StyledMenuItem>
            ))}
          </StyledMenuList>
        </>
      )}
    </Menu>
  );
}
