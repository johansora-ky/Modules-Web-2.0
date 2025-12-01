import "./black-friday-badge.css";

interface BlackFridayBadgeProps {
  text?: string;
}

export function BlackFridayBadge({ text = "Black Friday" }: BlackFridayBadgeProps) {
  return (
    <span className="black-friday-badge">
      {text}
    </span>
  );
}

