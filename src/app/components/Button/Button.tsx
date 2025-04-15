import classnames from "classnames";
import { ReactNode } from "react";
import { ElementType } from "react";

import styles from "./Button.module.css";
import Link from "next/link";

const buttonVariant = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
};

type ButtonVariant = "primary" | "secondary" | "tertiary";

interface ButtonProps {
  label?: string;
  className?: string;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  href?: string;
  external?: boolean;
  tag?: ElementType;
  onClick?: void | (() => void);
  variant?: ButtonVariant;
}

/**
 * Button
 *
 * Renders a button with a label and an optional icon
 */

const Button: React.FC<ButtonProps> = ({
  label,
  className,
  children,
  type,
  href,
  external = false,
  tag,
  onClick,
  variant = "primary",
}) => {
  const Tag = tag ? tag : href ? "a" : "button";

  const body = (
    <>
      {label && <span>{label}</span>}
      {children && children}
    </>
  );

  const classes = classnames(styles.button, className, buttonVariant[variant]);

  return (
    <>
      {href && !external ? (
        <Link className={classes} scroll={false} href={href}>
          {body}
        </Link>
      ) : (
        <Tag
          className={classes}
          href={(Tag === "a" && href) || null}
          type={(Tag === "button" && type) || null}
          onClick={onClick || null}
        >
          {body}
        </Tag>
      )}
    </>
  );
};

export default Button;

export { styles };
