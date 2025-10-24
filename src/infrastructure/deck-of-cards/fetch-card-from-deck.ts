import type { DeckID } from "@/types";
import { apiClient } from "../client";

interface FetchCardFromDeckResponse {
  success: boolean;
  cards: Array<{
    code: string;
    image: string;
    images: {
      svg: string;
      png: string;
    };
    value: string;
    suit: string;
  }>;
  deck_id: string;
  remaining: number;
}

export const fetchCardFromDeck = async ({
  deckID,
}: {
  deckID: DeckID;
}): Promise<FetchCardFromDeckResponse> => {
  const response = await apiClient.deckOfCards(`/deck/${deckID}/draw/?count=1`);

  if (!response.ok) {
    throw new Error("Error getting card from deck", { cause: response });
  }

  return response.json();
};
