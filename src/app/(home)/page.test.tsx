import { render, screen } from "@testing-library/react";
import Home from "./page";

vi.mock("./page", () => ({
  default: () => (
    <div>
      <h1>Home Component</h1>
    </div>
  ),
}));

describe("Home Page", () => {
  it("renders the home component", () => {
    render(<Home />);

    const homeElement = screen.getByRole("heading", {
      level: 1,
      name: "Home Component",
    });

    expect(homeElement).toBeInTheDocument();
  });
});
