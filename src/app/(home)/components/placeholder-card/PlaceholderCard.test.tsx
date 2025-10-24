import { render, screen } from "@testing-library/react";
import { PlaceholderCard } from "./PlaceholderCard";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // biome-ignore lint/a11y/useAltText: testing purposes
    // biome-ignore lint/performance/noImgElement: testing purposes
    return <img {...props} />;
  },
}));

describe("PlaceholderCard", () => {
  it("renders correctly", () => {
    render(<PlaceholderCard />);

    const image = screen.getByRole("presentation");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "https://deckofcardsapi.com/static/img/back.png",
    );
    expect(image).toHaveAttribute("alt", "");
    expect(image).toHaveAttribute("width", "226");
    expect(image).toHaveAttribute("height", "314");
  });
});
