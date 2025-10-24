import { fireEvent, render, screen } from "@testing-library/react";
import { Actions } from "./Actions";

describe("Actions", () => {
  it("renders correctly", () => {
    render(<Actions onDrawCard={() => {}} drawCardIsDisabled={false} />);

    expect(
      screen.getByRole("button", { name: "Draw Card" }),
    ).toBeInTheDocument();
  });

  it("calls onDrawCard when the button is clicked", () => {
    const onDrawCard = vi.fn();

    render(<Actions onDrawCard={onDrawCard} drawCardIsDisabled={false} />);

    fireEvent.click(screen.getByRole("button", { name: "Draw Card" }));

    expect(onDrawCard).toHaveBeenCalledTimes(1);
  });

  it("disables the button when drawCardIsDisabled is true", () => {
    render(<Actions onDrawCard={() => {}} drawCardIsDisabled={true} />);

    expect(screen.getByRole("button", { name: "Draw Card" })).toBeDisabled();
  });
});
