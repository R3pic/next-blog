export default function Loading() {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center 
      bg-light-background dark:bg-dark-background
      transition-opacity duration-300'
    >
      <div className="loader"></div>
      <p className="text-6xl mt-4 text-light-foreground dark:text-dark-foreground animate-pulse">Loading...</p>
    </div>
  );
}
