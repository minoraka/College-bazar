export default function AdCardSkeleton() {
  return (
    <div className="border-2 border-navy/20 p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="h-6 w-20 bg-navy/10 rounded-md" />
        <div className="h-7 w-7 bg-navy/10 rounded-md" />
      </div>

      <div className="aspect-[4/3] bg-navy/10 mb-4" />

      <div className="h-5 w-3/4 bg-navy/10 rounded mb-2" />
      <div className="h-4 w-full bg-navy/10 rounded mb-1.5" />
      <div className="h-4 w-2/3 bg-navy/10 rounded mb-4" />

      <div className="pt-3 border-t border-dotted border-navy/20 flex justify-between items-end">
        <div>
          <div className="h-2.5 w-10 bg-navy/10 rounded mb-1.5" />
          <div className="h-5 w-20 bg-navy/10 rounded" />
        </div>
        <div className="h-3 w-14 bg-navy/10 rounded" />
      </div>
    </div>
  );
}