import type { DrawCardFromDeckDTO } from "@/dto/deck-of-cards";
import { fetchCardFromDeck } from "@/infrastructure/deck-of-cards";
import type { DeckID } from "@/types";

export const drawCardFromDeck = async ({
  deckID,
}: {
  deckID: DeckID;
}): Promise<DrawCardFromDeckDTO> => {
  try {
    const newDeckData = await fetchCardFromDeck({ deckID });

    return {
      remainingCards: newDeckData.remaining,
      newCard: newDeckData.cards?.[0],
    };
  } catch {
    return {
      remainingCards: 0,
      newCard: {
        code: "",
        image: "",
        value: "",
        suit: "",
      },
    };
  }
};
