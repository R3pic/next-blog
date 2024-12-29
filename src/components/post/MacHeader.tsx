export default function MacHeader() {
  return (
    <div className="items-center h-10
    bg-gray-300
    dark:bg-[#464647]
    px-4
    hidden
    lg:flex
    ">
      <div className="flex gap-2">
        <span className="w-4 h-4 bg-red-400 rounded-full"></span>
        <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
        <span className="w-4 h-4 bg-green-400 rounded-full"></span>
      </div>
    </div>
  );
}