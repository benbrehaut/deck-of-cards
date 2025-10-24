import { render, screen } from "@testing-library/react";
import { RoundStats } from "./RoundStats";

describe("RoundStats", () => {
  it("renders the total suit and value matching cards", () => {
    render(
      <RoundStats totalSuitMatchingCards={3} totalValueMatchingCards={5} />,
    );

    expect(
      screen.getByText("Total Suit Matching Cards: 3"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Total Value Matching Cards: 5"),
    ).toBeInTheDocument();
  });
});
