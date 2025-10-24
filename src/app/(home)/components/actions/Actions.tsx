import { Button } from "@/app/components";

interface ActionsProps {
  onDrawCard: () => void;
  drawCardIsDisabled: boolean;
}

export const Actions = ({ onDrawCard, drawCardIsDisabled }: ActionsProps) => (
  <Button disabled={drawCardIsDisabled} onClick={onDrawCard}>
    Draw Card
  </Button>
);
