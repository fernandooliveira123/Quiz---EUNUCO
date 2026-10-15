import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

interface Props {
  badgeText: string;
}

export function OfferHeader({ badgeText }: Props) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-8 sm:py-4">
        <Link to="/" className="flex items-center gap-1.5 transition-opacity hover:opacity-85">
          <p className="text-lg font-black tracking-tight sm:text-xl">
            treino<span className="text-primary">.</span><span className="font-semibold text-foreground/90">inteligente</span>
          </p>
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {badgeText}
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="hidden md:inline">Ambiente Seguro</span>
          </div>
        </div>
      </div>
    </header>
  );
}
