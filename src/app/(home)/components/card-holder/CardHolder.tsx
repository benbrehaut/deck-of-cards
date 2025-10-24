import { Image } from "@/app/components";
import type { Card as CardHolderProps } from "@/types";

export const CardHolder = ({ image, suit, value }: CardHolderProps) => {
  if (!image) {
    return null;
  }

  return (
    <Image src={image} alt={`${value} of ${suit}`} width={226} height={314} />
  );
};
