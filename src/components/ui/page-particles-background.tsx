import { FC } from "react";
import { Particles } from "@/components/ui/particles";
import { cn } from "@/lib/utils";

interface PageParticlesBackgroundProps {
  dark?: boolean;
  className?: string;
}

const PageParticlesBackground: FC<PageParticlesBackgroundProps> = ({
  dark = false,
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <Particles
        className="absolute inset-0 h-full w-full"
        color={dark ? "#ffffff" : "#000000"}
        quantity={200}
        size={0.5}
      />
    </div>
  );
};

export default PageParticlesBackground;
