import { vi } from "vitest";
import { API_BASE_URL, API_ROUTES } from "@/app/constants";
import { apiClient } from "./api-client";

const mockDeckID = "wkfohbns8pmo";
const mockResponse = { cards: [{ code: "6H" }], success: true };

describe("apiClient", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;

    vi.resetAllMocks();
  });

  it("should call fetch with the correct URL", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    await apiClient.drawCardFromDeck({ deckID: mockDeckID });

    expect(global.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}${API_ROUTES.DRAW_CARD_FROM_DECK}?deckID=${mockDeckID}`,
    );
  });

  it("should return the parsed JSON response", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const data = await apiClient.drawCardFromDeck({ deckID: mockDeckID });

    expect(data).toEqual(mockResponse);
  });

  it("should throw an error if response is not ok", async () => {
    (global.fetch as any).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({}),
    });

    await expect(
      apiClient.drawCardFromDeck({ deckID: mockDeckID }),
    ).rejects.toThrow("Error fetching data");
  });
});
