import type { NewDeckDTO } from "@/dto/deck-of-cards";
import { fetchNewDeck } from "@/infrastructure/deck-of-cards";

export const getNewDeck = async (): Promise<NewDeckDTO> => {
  try {
    const newDeckData = await fetchNewDeck();

    return {
      deckID: newDeckData.deck_id,
      cardsRemaining: newDeckData.remaining,
    };
  } catch {
    return {
      deckID: "",
      cardsRemaining: 0,
    };
  }
};
