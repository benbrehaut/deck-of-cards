import { drawCardFromDeck } from "@/application/deck-of-cards";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const deckID = searchParams.get("deckID");

  if (!deckID) {
    return Response.json({ message: "deckID is required" }, { status: 400 });
  }

  const response = await drawCardFromDeck({ deckID });

  return Response.json(response);
}
