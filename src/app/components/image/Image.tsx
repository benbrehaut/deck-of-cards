import NextImage from "next/image";

interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
}

export const Image = ({ src, alt, width, height, ...rest }: ImageProps) => (
  <NextImage
    src={src}
    alt={alt || ""}
    width={width}
    height={height}
    {...rest}
  />
);
