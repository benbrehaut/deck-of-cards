import { render, screen } from "@testing-library/react";
import { Image } from "./Image";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // biome-ignore lint/a11y/useAltText: testing purposes
    // biome-ignore lint/performance/noImgElement: testing purposes
    return <img {...props} />;
  },
}));

describe("Image component", () => {
  it("renders an img with required props", () => {
    render(
      <Image
        src="https://deckofcardsapi.com/static/img/2S.png"
        alt="test image"
      />,
    );

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image.getAttribute("src")).toEqual(
      "https://deckofcardsapi.com/static/img/2S.png",
    );
  });

  it("renders with width and height", () => {
    render(
      <Image
        src="https://deckofcardsapi.com/static/img/2S.png"
        width={100}
        height={200}
        alt="test image"
      />,
    );

    const image = screen.getByRole("img");

    expect(image.getAttribute("width")).toBe("100");
    expect(image.getAttribute("height")).toBe("200");
  });

  it("renders with an empty alt if one is not provided", () => {
    render(<Image src="https://deckofcardsapi.com/static/img/2S.png" />);

    expect(screen.getByRole("presentation").getAttribute("alt")).toEqual("");
  });
});
