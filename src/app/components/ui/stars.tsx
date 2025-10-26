export const Stars = ({ className = "" }: { className?: string }) => {
  const Star = (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  );
  return (
    <div className={`flex ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{Star}</span>
      ))}
    </div>
  );
};
