//Deixar só se for fazer testes, se não, excluir
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);
