import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Board } from "./Board";

describe("Board", () => {
  it("renders the title and deck ID", () => {
    render(
      <Board title="Test Title" deckID="wkfohbns8pmo">
        <Board.CurrentCard>Current</Board.CurrentCard>
      </Board>,
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Deck ID: wkfohbns8pmo")).toBeInTheDocument();
  });

  it("renders the sub components", () => {
    render(
      <Board title="Board" deckID="abc">
        <Board.PreviousCard>Previous card</Board.PreviousCard>
        <Board.CurrentCard>Current card</Board.CurrentCard>
        <Board.DeckBottom>Bottom</Board.DeckBottom>
      </Board>,
    );

    expect(screen.getByText("Previous card")).toBeInTheDocument();
    expect(screen.getByText("Current card")).toBeInTheDocument();
  });
});
