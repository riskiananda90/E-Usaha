interface ProgressIndicatorProps {
  current: number;
  total: number;
}
export const ProgressIndicator = ({
  current,
  total
}: ProgressIndicatorProps) => {
  const progress = current / total * 100;
  return <div className="fixed bottom-20 left-0 right-0 z-50 px-4 md:hidden">
      <div className="h-0.5 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
        <div className="h-full bg-secondary transition-all duration-300 ease-out" style={{
        width: `${progress}%`
      }} />
      </div>
      
    </div>;
};