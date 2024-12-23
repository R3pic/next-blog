import MacHeader from './post/MacHeader';

export default function ContentWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose dark:prose-invert max-w-none
    my-16 drop-shadow-2xl rounded-2xl z-10 overflow-hidden
    bg-white
    dark:bg-[#313132]
    w-pagewidth
    desktop:ml-sidebar-size
    desktop-small:ml-sidebar-min
    ">
      {/* Mac 스타일의 윈도우 헤더 */}
      <MacHeader />
      {/* 윈도우 내부 콘텐츠 */}
      <div className="h-full">
        {children}
      </div>
    </div>
  );
}
