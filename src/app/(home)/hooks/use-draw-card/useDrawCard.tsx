"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/app/utilities";
import type { DeckID } from "@/types";

export const useDrawCard = ({ deckID }: { deckID: DeckID }) => {
  const { refetch, isFetching, isRefetchError } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiClient.drawCardFromDeck({ deckID }),
    enabled: false,
  });

  return {
    drawCardFromDeck: refetch,
    isDrawingCard: isFetching,
    failedToDrawCard: isRefetchError,
  };
};
