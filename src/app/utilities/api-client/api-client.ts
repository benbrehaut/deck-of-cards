import { API_BASE_URL, API_ROUTES } from "@/app/constants";
import type { DeckID } from "@/types";

const apiWrapper = async (url: string) => {
  const response = await fetch(`${API_BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error("Error fetching data");
  }

  return response.json();
};

export const apiClient = {
  drawCardFromDeck: async ({ deckID }: { deckID: DeckID }) =>
    apiWrapper(`${API_ROUTES.DRAW_CARD_FROM_DECK}?deckID=${deckID}`),
};
