import type { Card } from "@/types";

export const isMatchingCardSuit = (
  previousCard: Card,
  currentCard: Card,
): boolean => previousCard.suit === currentCard.suit;
