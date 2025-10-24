"use client";

import { useContext, useRef, useState } from "react";
import { isMatchingCardSuit, isMatchingCardValue } from "@/app/utilities";
import type { Card } from "@/types";
import { useDrawCard } from "../../hooks";
import { CurrentDeckContext } from "../../providers";
import { Actions } from "../actions";
import { Board } from "../board";
import { CardHolder } from "../card-holder";
import { PlaceholderCard } from "../placeholder-card";
import { RoundStats } from "../round-stats";

const MatchingCardStatus = {
  none: "none",
  value: "value",
  suit: "suit",
  both: "both",
} as const;

type MatchingCardStatusType =
  (typeof MatchingCardStatus)[keyof typeof MatchingCardStatus];

export const Home = () => {
  const { deckID, cardsRemaining } = useContext(CurrentDeckContext);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const previousCardRef = useRef<Card | null>(null);
  const [remainingCards, setRemainingCards] = useState<number>(cardsRemaining);
  const [totalValueMatchingCards, setTotalValueMatchingCards] =
    useState<number>(0);
  const [totalSuitMatchingCards, setTotalSuitMatchingCards] =
    useState<number>(0);
  const [matchingCardStatus, setMatchingCardStatus] =
    useState<MatchingCardStatusType>(MatchingCardStatus.none);

  const { drawCardFromDeck, isDrawingCard, failedToDrawCard } = useDrawCard({
    deckID,
  });

  const handleNewCard = async () => {
    previousCardRef.current = currentCard;
    setMatchingCardStatus(MatchingCardStatus.none);

    await drawCardFromDeck()
      .then(({ data }) => {
        const newCard = data.newCard;

        setCurrentCard(newCard);
        setRemainingCards(data.remainingCards);

        if (previousCardRef.current) {
          const previousCard = previousCardRef.current;
          const cardValuesMatch = isMatchingCardValue(previousCard, newCard);
          const cardSuitsMatch = isMatchingCardSuit(previousCard, newCard);

          if (cardValuesMatch) {
            setMatchingCardStatus(MatchingCardStatus.value);
            setTotalValueMatchingCards(
              (previousTotalValue) => previousTotalValue + 1,
            );
          }

          if (cardSuitsMatch) {
            setMatchingCardStatus(MatchingCardStatus.suit);
            setTotalSuitMatchingCards(
              (previousTotalSuitCount) => previousTotalSuitCount + 1,
            );
          }

          if (cardValuesMatch && cardSuitsMatch) {
            setMatchingCardStatus(MatchingCardStatus.both);
            setTotalSuitMatchingCards(
              (previousTotalSuitCount) => previousTotalSuitCount + 1,
            );
            setTotalValueMatchingCards(
              (previousTotalValue) => previousTotalValue + 1,
            );
          }
        }
      })
      .catch(() => {});
  };

  return (
    <Board title="Deck of Cards" deckID={deckID}>
      <Board.PreviousCard>
        {previousCardRef.current ? (
          <CardHolder {...previousCardRef.current} />
        ) : (
          <PlaceholderCard />
        )}
      </Board.PreviousCard>

      <Board.CurrentCard>
        {currentCard ? <CardHolder {...currentCard} /> : <PlaceholderCard />}
      </Board.CurrentCard>
      <Board.DeckBottom>
        {failedToDrawCard && (
          <p>There was a problem trying to draw a card. Please try again.</p>
        )}

        {remainingCards > 0 && <p>Cards Remaining in Deck: {remainingCards}</p>}

        {remainingCards === 0 && (
          <RoundStats
            totalSuitMatchingCards={totalSuitMatchingCards}
            totalValueMatchingCards={totalValueMatchingCards}
          />
        )}

        {remainingCards !== 0 && (
          <Actions
            drawCardIsDisabled={isDrawingCard}
            onDrawCard={handleNewCard}
          />
        )}

        {matchingCardStatus === MatchingCardStatus.suit && <h2>SNAP SUIT!</h2>}
        {matchingCardStatus === MatchingCardStatus.value && (
          <h2>SNAP VALUE!</h2>
        )}
      </Board.DeckBottom>
    </Board>
  );
};
