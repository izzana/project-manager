import {
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  Button,
} from "@chakra-ui/react";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  && {
    width: 260px;
    height: 44px;
    padding: 0 12px;
    background: #fff;
    border-radius: 12px;
    border: 1px solid #695ccd;
    font-size: 16px;
    font-weight: 400;
    color: #1f2330;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover,
    &:active {
      background: #fff;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px rgba(105, 92, 205, 0.25);
    }

    .chakra-button__icon {
      margin-inline-start: 8px; /* espaço antes da setinha */
    }
  }
   
  span {
    flex: none;
  }
`;

export const StyledMenuList = styled(ChakraMenuList)`
  && {
    margin-top: 6px;
    width: 260px;
    min-width: unset;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    padding: 0;
  }
`;

export const StyledMenuItem = styled(ChakraMenuItem)`
  && {
    height: 44px;
    padding: 0 16px;
    font-size: 16px;
    line-height: 1.2;
    border-bottom: 1px solid #f2f2f7;

    &:last-child { border-bottom: none; }
    &:hover { background: #f7f7ff; }
  }
`;