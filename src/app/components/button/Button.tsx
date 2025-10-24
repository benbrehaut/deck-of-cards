import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

export const Button = ({
  onClick,
  disabled,
  children,
  ...rest
}: ButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    {...rest}
    className={styles.button}
  >
    {children}
  </button>
);
