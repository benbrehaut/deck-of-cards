import { apiClient } from "../client";

interface FetchNewDeckResponse {
  success: boolean;
  deck_id: string;
  shuffled: boolean;
  remaining: number;
}

export const fetchNewDeck = async (): Promise<FetchNewDeckResponse> => {
  const response = await apiClient.deckOfCards(
    "/deck/new/shuffle/?deck_count=1",
  );

  if (!response.ok) {
    throw new Error("Error getting new deck", { cause: response });
  }

  return response.json();
};
