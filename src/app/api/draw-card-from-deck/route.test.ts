import { vi } from "vitest";
import * as drawCardFromDeck from "@/application/deck-of-cards";
import { GET } from "./route";

const mockDeckID = "wkfohbns8pmo";
const apiUrl = `http://localhost:4000/api/draw-card-from-deck`;

describe("GET /api/draw-card-from-deck", () => {
  const mockDrawCardFromDeck = vi.spyOn(drawCardFromDeck, "drawCardFromDeck");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 if deckID is missing", async () => {
    const request = new Request(apiUrl);
    const response = await GET(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json).toEqual({ message: "deckID is required" });
    expect(mockDrawCardFromDeck).not.toHaveBeenCalled();
  });

  it("calls drawCardFromDeck with deckID and returns JSON response", async () => {
    const request = new Request(`${apiUrl}?deckID=${mockDeckID}`);
    const mockResponse = {
      remainingCards: 51,
      newCard: {
        code: "AS",
        image: "https://deckofcardsapi.com/static/img/KH.png",
        value: "ACE",
        suit: "SPADES",
      },
    };

    mockDrawCardFromDeck.mockResolvedValueOnce(mockResponse);

    const response = await GET(request);
    const json = await response.json();

    expect(mockDrawCardFromDeck).toHaveBeenCalledWith({
      deckID: "wkfohbns8pmo",
    });
    expect(response.status).toBe(200);
    expect(json).toEqual(mockResponse);
  });
});
