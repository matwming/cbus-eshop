import {Stars} from "./stars";

type RatingProps = { rate: number; count: number; outOf?: number };

export default function Rating({rate, count, outOf = 5}: RatingProps) {
    const clamped = Math.max(0, Math.min(rate, outOf));
    const pct = (clamped / outOf) * 100;

    return (
        <div className="inline-flex items-center gap-2" aria-label={`Rating ${clamped} of ${outOf}`}>
            <div className="relative">
                {/* Empty stars */}
                <Stars className="text-zinc-300 dark:text-zinc-700"/>
                {/* Filled stars clipped to percentage */}
                <div className="absolute inset-0 overflow-hidden" style={{width: `${pct}%`}} aria-hidden="true">
                    <Stars className="text-amber-500"/>
                </div>
            </div>

            <span className="text-sm font-medium tabular-nums text-zinc-900 dark:text-zinc-100">
             {clamped.toFixed(1)}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">({count})</span>
        </div>
    );
}
