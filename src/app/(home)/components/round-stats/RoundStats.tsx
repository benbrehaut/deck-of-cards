interface RoundStatsProps {
  totalSuitMatchingCards: number;
  totalValueMatchingCards: number;
}

export const RoundStats = ({
  totalSuitMatchingCards,
  totalValueMatchingCards,
}: RoundStatsProps) => {
  return (
    <>
      <p>Total Suit Matching Cards: {totalSuitMatchingCards}</p>
      <p>Total Value Matching Cards: {totalValueMatchingCards}</p>
    </>
  );
};
