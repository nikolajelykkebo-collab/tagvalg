import Image from "next/image";
import Link from "next/link";

// Logobilledets naturlige mål (3749 × 731 px), brugt til at
// skalere bredden proportionalt ud fra den ønskede højde.
const LOGO_BREDDE_HØJDE_FORHOLD = 3749 / 731;

interface Props {
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  height = 36,
  className = "",
  priority = false,
}: Props) {
  const bredde = Math.round(height * LOGO_BREDDE_HØJDE_FORHOLD);

  return (
    <Link href="/" className={`inline-flex shrink-0 items-center ${className}`}>
      <Image
        src="/tagvalg-logo.png"
        alt="Tagvalg"
        width={bredde}
        height={height}
        priority={priority}
        unoptimized
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
