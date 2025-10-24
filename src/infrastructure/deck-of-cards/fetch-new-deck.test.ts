import { beforeEach, vi } from "vitest";
import { apiClient } from "../client";
import { fetchNewDeck } from "./fetch-new-deck";

vi.mock("../client", () => ({
  apiClient: {
    deckOfCards: vi.fn(),
  },
}));

describe("fetchNewDeck", () => {
  const mockDeckResponse = {
    ok: true,
    json: vi.fn().mockResolvedValue({
      success: true,
      deck_id: "wkfohbns8pmo",
      shuffled: true,
      remaining: 52,
    }),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch a new shuffled deck and return the response", async () => {
    (apiClient.deckOfCards as any).mockResolvedValueOnce(mockDeckResponse);

    const result = await fetchNewDeck();

    expect(apiClient.deckOfCards).toHaveBeenCalledWith(
      "/deck/new/shuffle/?deck_count=1",
    );
    expect(result).toEqual({
      success: true,
      deck_id: "wkfohbns8pmo",
      shuffled: true,
      remaining: 52,
    });
  });

  it("should throw an error if the response is not ok", async () => {
    const errorResponse = { ok: false };
    (apiClient.deckOfCards as any).mockResolvedValueOnce(errorResponse);

    await expect(fetchNewDeck()).rejects.toThrow("Error getting new deck");
  });
});
