import { vi } from "vitest";
import { apiClient } from "../client";
import { fetchCardFromDeck } from "./fetch-card-from-deck";

vi.mock("../client", () => ({
  apiClient: {
    deckOfCards: vi.fn(),
  },
}));

const mockDeckID = "wkfohbns8pmo";

const mockResponse = {
  ok: true,
  json: vi.fn().mockResolvedValue({
    success: true,
    cards: [
      {
        code: "AS",
        image: "https://deckofcardsapi.com/static/img/KH.png",
        images: {
          svg: "https://deckofcardsapi.com/static/img/KH.svg",
          png: "https://deckofcardsapi.com/static/img/KH.png",
        },
        value: "ACE",
        suit: "SPADES",
      },
    ],
    deck_id: mockDeckID,
    remaining: 51,
  }),
};

describe("fetchCardFromDeck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a card from the deck and return the response", async () => {
    (apiClient.deckOfCards as any).mockResolvedValueOnce(mockResponse);

    const result = await fetchCardFromDeck({ deckID: mockDeckID });

    expect(apiClient.deckOfCards).toHaveBeenCalledWith(
      `/deck/${mockDeckID}/draw/?count=1`,
    );
    expect(result.success).toBe(true);
    expect(result.cards).toHaveLength(1);
    expect(result.deck_id).toBe(mockDeckID);
    expect(result.remaining).toBe(51);
  });

  it("should throw an error if the response is not ok", async () => {
    const errorResponse = { ok: false };
    (apiClient.deckOfCards as any).mockResolvedValueOnce(errorResponse);

    await expect(fetchCardFromDeck({ deckID: mockDeckID })).rejects.toThrow(
      "Error getting card from deck",
    );
  });
});
