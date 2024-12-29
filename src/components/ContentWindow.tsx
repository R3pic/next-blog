import MacHeader from './post/MacHeader';

export default function ContentWindow({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose dark:prose-invert
    flex flex-col
    mt-16 overflow-hidden
    min-h-[calc(100vh-4rem)]
    bg-white
    dark:bg-[#313132]
    w-full
    max-w-none
    lg:min-h-[calc(100vh-8rem)]
    lg:drop-shadow-2xl
    lg:rounded-2xl
    lg:my-16
    lg:w-pagewidth
    lg:ml-sidebar-min
    desktop:ml-sidebar-size
    ">
      {/* Mac 스타일의 윈도우 헤더 */}
      <MacHeader />
      {/* 윈도우 내부 콘텐츠 */}
      <div className='flex flex-col grow'>
        {children}
      </div>
    </div>
  );
}
