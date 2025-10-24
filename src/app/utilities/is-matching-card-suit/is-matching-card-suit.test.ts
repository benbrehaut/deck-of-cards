import { isMatchingCardSuit } from "./is-matching-card-suit";

describe("isMatchingCardValue", () => {
  it("returns true when card values are matching", () => {
    const previousCard = {
      value: "5",
      suit: "spades",
      code: "5H",
      image: "",
    };
    const currentCard = {
      value: "5",
      suit: "spades",
      code: "5S",
      image: "",
    };

    expect(isMatchingCardSuit(previousCard, currentCard)).toBe(true);
  });

  it("returns false when card values are not matching", () => {
    const previousCard = {
      value: "5",
      suit: "hearts",
      code: "5H",
      image: "",
    };
    const currentCard = {
      value: "3",
      suit: "spades",
      code: "5S",
      image: "",
    };

    expect(isMatchingCardSuit(previousCard, currentCard)).toBe(false);
  });
});
