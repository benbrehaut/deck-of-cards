import { beforeEach, vi } from "vitest";
import { fetchCardFromDeck } from "@/infrastructure/deck-of-cards";
import { drawCardFromDeck } from "./draw-card-from-deck";

vi.mock("@/infrastructure/deck-of-cards", () => ({
  fetchCardFromDeck: vi.fn(),
}));

const mockDeckID = "wkfohbns8pmo";

describe("drawCardFromDeck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns correct data when fetchCardFromDeck succeeds", async () => {
    (fetchCardFromDeck as any).mockResolvedValueOnce({
      remaining: 51,
      cards: [
        {
          code: "AS",
          image: "https://deckofcardsapi.com/static/img/KH.png",
          value: "ACE",
          suit: "SPADES",
        },
      ],
    });

    const data = await drawCardFromDeck({ deckID: mockDeckID });

    expect(data).toEqual({
      remainingCards: 51,
      newCard: {
        code: "AS",
        image: "https://deckofcardsapi.com/static/img/KH.png",
        value: "ACE",
        suit: "SPADES",
      },
    });
    expect(fetchCardFromDeck).toHaveBeenCalledWith({ deckID: mockDeckID });
  });

  it("returns fallback data when fetchCardFromDeck throws", async () => {
    (fetchCardFromDeck as any).mockRejectedValueOnce(
      new Error("Network error"),
    );

    const data = await drawCardFromDeck({ deckID: mockDeckID });

    expect(data).toEqual({
      remainingCards: 0,
      newCard: {
        code: "",
        image: "",
        value: "",
        suit: "",
      },
    });
  });
});
