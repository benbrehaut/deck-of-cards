import type { Card } from "@/types";

export interface DrawCardFromDeckDTO {
  remainingCards: number;
  newCard: Card;
}
