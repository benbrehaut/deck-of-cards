import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as hooks from "../../hooks";
import { CurrentDeckContext } from "../../providers";
import { Home } from "./Home";

const mockDeckID = "wkfohbns8pmo";
const mockCard1 = {
  code: "AS",
  suit: "SPADES",
  value: "ACE",
  image: "https://deckofcardsapi.com/static/img/AS.png",
};
const mockCard2 = {
  code: "2S",
  suit: "SPADES",
  value: "2",
  image: "https://deckofcardsapi.com/static/img/2S.png",
};
const mockCard3 = {
  code: "2H",
  suit: "HEARTS",
  value: "2",
  image: "https://deckofcardsapi.com/static/img/2H.png",
};

function renderHome(cardsRemaining = 52) {
  return render(
    <CurrentDeckContext.Provider value={{ deckID: mockDeckID, cardsRemaining }}>
      <Home />
    </CurrentDeckContext.Provider>,
  );
}

describe("Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const drawCardFromDeck = vi.fn().mockResolvedValue({
      data: {
        newCard: mockCard1,
        remainingCards: 51,
      },
    });
    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(52);

    expect(
      screen.getByRole("heading", { level: 1, name: "Deck of Cards" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Cards Remaining in Deck: 52")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Draw Card" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("presentation")).toHaveLength(2);
  });

  it("updates the current card when the draw card button has been clicked", async () => {
    const drawCardFromDeck = vi.fn().mockResolvedValue({
      data: {
        newCard: mockCard1,
        remainingCards: 51,
        failedToDrawCard: false,
      },
    });
    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(52);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => {
      expect(drawCardFromDeck).toHaveBeenCalled();
      expect(
        screen.getByText("Cards Remaining in Deck: 51"),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("img", { name: "ACE of SPADES" }),
      ).toBeInTheDocument();
    });
  });

  it("updates the previous card when the draw card button has been clicked and there is a current card", async () => {
    const drawCardFromDeck = vi
      .fn()
      .mockResolvedValueOnce({
        data: { newCard: mockCard1, remainingCards: 51 },
      })
      .mockResolvedValueOnce({
        data: { newCard: mockCard2, remainingCards: 50 },
      });

    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(52);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(2));

    expect(
      screen.getByRole("img", { name: "ACE of SPADES" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "2 of SPADES" }),
    ).toBeInTheDocument();
  });

  it("shows SNAP SUIT when the previous card suit and the current card suit are the same", async () => {
    const drawCardFromDeck = vi
      .fn()
      .mockResolvedValueOnce({
        data: { newCard: mockCard1, remainingCards: 51 },
      })
      .mockResolvedValueOnce({
        data: { newCard: mockCard2, remainingCards: 50 },
      });

    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(52);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(2));

    expect(screen.getByText("SNAP SUIT!")).toBeInTheDocument();
  });

  it("shows SNAP VALUE when the previous card value and the current card value are the same", async () => {
    const drawCardFromDeck = vi
      .fn()
      .mockResolvedValueOnce({
        data: { newCard: mockCard2, remainingCards: 51 },
      })
      .mockResolvedValueOnce({
        data: { newCard: mockCard3, remainingCards: 50 },
      });

    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(52);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));
    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));
    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalledTimes(2));

    expect(screen.getByText("SNAP VALUE!")).toBeInTheDocument();
  });

  it("shows RoundStats when no cards remaining", async () => {
    const drawCardFromDeck = vi.fn().mockResolvedValue({
      data: {
        newCard: mockCard1,
        remainingCards: 0,
      },
    });
    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: false,
    });

    renderHome(1);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => {
      expect(
        screen.getByText("Total Suit Matching Cards: 0"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Total Value Matching Cards: 0"),
      ).toBeInTheDocument();
    });
  });

  it("disables the draw button when a card is being drawn", () => {
    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck: vi.fn(),
      isDrawingCard: true,
      failedToDrawCard: false,
    });

    renderHome(52);

    expect(screen.getByRole("button", { name: "Draw Card" })).toBeDisabled();
  });

  it("renders the error message when a card has failed to be drawn", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const drawCardFromDeck = vi.fn().mockRejectedValue(new Error("Error!"));

    vi.spyOn(hooks, "useDrawCard").mockReturnValue({
      drawCardFromDeck,
      isDrawingCard: false,
      failedToDrawCard: true,
    });

    renderHome(52);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    await waitFor(() => expect(drawCardFromDeck).toHaveBeenCalled());

    expect(
      screen.getByText(
        "There was a problem trying to draw a card. Please try again.",
      ),
    ).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });
});
