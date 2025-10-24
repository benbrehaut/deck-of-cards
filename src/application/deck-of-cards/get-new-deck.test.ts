import { beforeEach, vi } from "vitest";
import { fetchNewDeck } from "@/infrastructure/deck-of-cards";
import { getNewDeck } from "./get-new-deck";

vi.mock("@/infrastructure/deck-of-cards", () => ({
  fetchNewDeck: vi.fn(),
}));

describe("getNewDeck", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return deck data when fetchNewDeck succeeds", async () => {
    (fetchNewDeck as any).mockResolvedValue({
      deck_id: "wkfohbns8pmo",
      remaining: 52,
    });

    const data = await getNewDeck();

    expect(data).toEqual({
      deckID: "wkfohbns8pmo",
      cardsRemaining: 52,
    });
    expect(fetchNewDeck).toHaveBeenCalledTimes(1);
  });

  it("should return default values when fetchNewDeck throws an error", async () => {
    (fetchNewDeck as any).mockRejectedValue(new Error("Network error"));

    const data = await getNewDeck();

    expect(data).toEqual({
      deckID: "",
      cardsRemaining: 0,
    });
    expect(fetchNewDeck).toHaveBeenCalledTimes(1);
  });
});
