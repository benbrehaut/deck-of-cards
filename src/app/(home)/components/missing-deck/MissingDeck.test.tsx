import { render, screen } from "@testing-library/react";
import { MissingDeck } from "./MissingDeck";

describe("MissingDeck", () => {
  it("renders the heading", () => {
    render(<MissingDeck />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Sorry, there was a problem",
      }),
    ).toBeInTheDocument();
  });

  it("renders the message", () => {
    render(<MissingDeck />);

    expect(
      screen.getByText(
        "Unfortunately we can't get a new deck for you, please try again later",
      ),
    ).toBeInTheDocument();
  });
});
