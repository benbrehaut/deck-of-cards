import type { DeckID } from "@/types";

export interface NewDeckDTO {
  deckID: DeckID;
  cardsRemaining: number;
}
