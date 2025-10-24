import React from "react";
import styles from "./Board.module.css";

interface BoardProps {
  title: string;
  deckID: string;
  children: React.ReactNode;
}

interface BoardChildComponent {
  children: React.ReactNode;
}

const Board = ({ title, deckID, children }: BoardProps) => {
  const childrenArray = React.Children.toArray(children);
  const childrenWithoutDeckBottom = childrenArray.filter(
    (child: any) => child.type !== Board.DeckBottom,
  );
  const deckBottom = childrenArray.find(
    (child: any) =>
      child.type === Board.DeckBottom ||
      child.type?.displayName === "DeckBottom",
  );

  return (
    <div className={styles.board}>
      <h1>{title}</h1>

      <p>Deck ID: {deckID}</p>

      <div className={styles.boardCards}>{childrenWithoutDeckBottom}</div>

      {deckBottom}
    </div>
  );
};

Board.PreviousCard = ({ children }: BoardChildComponent) => {
  return <div className={styles.boardCard}>{children}</div>;
};

Board.CurrentCard = ({ children }: BoardChildComponent) => {
  return <div className={styles.boardCard}>{children}</div>;
};

Board.DeckBottom = ({ children }: BoardChildComponent) => {
  return <div className={styles.boardDeckBottom}>{children}</div>;
};

(Board.DeckBottom as React.FC & { displayName?: string }).displayName =
  "DeckBottom";

export { Board };
