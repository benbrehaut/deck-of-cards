const DECK_OF_CARDS_URL = process.env.DECK_OF_CARDS_URL;

const fetcher = async (url: string) =>
  await fetch(`${url}`, { cache: "no-cache" });

export const apiClient = {
  deckOfCards: (url: string) => fetcher(`${DECK_OF_CARDS_URL}${url}`),
};
