import { render, screen } from "@testing-library/react";
import { CardHolder } from "./CardHolder";

describe("CardHolder", () => {
  it("renders the image", () => {
    render(
      <CardHolder
        image="/cards/ace_of_hearts.png"
        suit="hearts"
        value="A"
        code="5S"
      />,
    );

    expect(
      screen.getByRole("img", { name: "A of hearts" }),
    ).toBeInTheDocument();
  });

  it("does not render when there is no image", () => {
    render(<CardHolder image="" suit="hearts" value="A" code="5S" />);

    expect(screen.queryByRole("img")).toBeNull();
  });
});
