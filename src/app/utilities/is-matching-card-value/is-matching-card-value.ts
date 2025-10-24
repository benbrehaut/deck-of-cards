import type { Card } from "@/types";

export const isMatchingCardValue = (
  previousCard: Card,
  currentCard: Card,
): boolean =>
  parseInt(previousCard.value, 10) === parseInt(currentCard.value, 10);
