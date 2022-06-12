import { default as cx } from "classnames";

export default function Avatar({ src, alt, diameter, className }) {
  return (
    <figure
      style={{ width: diameter }}
      className={cx("aspect-square overflow-hidden rounded-full", className)}
    >
      <img className="h-full w-full object-cover" src={src} alt={alt} />
    </figure>
  );
}
