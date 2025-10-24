import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { apiClient } from "@/app/utilities";
import { useDrawCard } from "./useDrawCard";

describe("useDrawCard", () => {
  const deckID = "wkfohbns8pmo";

  const createWrapper = () => {
    const queryClient = new QueryClient();

    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call drawCardFromDeck when drawCardFromDeck is called", async () => {
    const drawCardFromDeckMock = vi.fn().mockResolvedValue({ card: "AS" });

    vi.spyOn(apiClient, "drawCardFromDeck").mockImplementation(
      drawCardFromDeckMock,
    );

    const { result } = renderHook(() => useDrawCard({ deckID }), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.drawCardFromDeck();
    });

    expect(drawCardFromDeckMock).toHaveBeenCalledWith({ deckID });
  });
});
