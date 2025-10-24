import { getNewDeck } from "@/application/deck-of-cards";
import { Home as HomePage, MissingDeck } from "./components";
import { CurrentDeckProvider, QueryProvider } from "./providers";

export default async function Home() {
  const { deckID, cardsRemaining } = await getNewDeck();

  if (!deckID) {
    return <MissingDeck />;
  }

  return (
    <CurrentDeckProvider data={{ deckID, cardsRemaining }}>
      <QueryProvider>
        <HomePage />
      </QueryProvider>
    </CurrentDeckProvider>
  );
}
