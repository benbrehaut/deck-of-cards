"use client";

import { createContext, type ReactNode } from "react";
import type { NewDeckDTO } from "@/dto/deck-of-cards";

interface CurrentDeckProviderProps {
  data: NewDeckDTO;
  children: ReactNode;
}

export const CurrentDeckContext = createContext<NewDeckDTO>({
  deckID: "",
  cardsRemaining: 0,
});

export const CurrentDeckProvider = ({
  data,
  children,
}: CurrentDeckProviderProps) => {
  return (
    <CurrentDeckContext.Provider value={data}>
      {children}
    </CurrentDeckContext.Provider>
  );
};
