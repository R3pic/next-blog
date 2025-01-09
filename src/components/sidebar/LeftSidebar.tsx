import Link from 'next/link';
import Image from 'next-export-optimize-images/image';
import ProfileImage from '../../../public/profile.webp';
import Navigation from './Navigation';
import { CategoryService } from 'r3-blog';

export default function LeftSidebar() {
  const allCategory = new CategoryService().getAllRootCategory();
  return (
    <>
      {/* 좌측 사이드바 */}
      <div className="fixed flex flex-col flex-nowrap items-end top-0 h-screen bg-transport
      lg:w-sidebar-min
      desktop:w-sidebar-size
      z-10
      "
      data-pagefind-ignore='all'>
        {/* 배너 */}
        <div className="w-72 text-center hidden lg:block">
          <h1 className="p-4 text-2xl">
            <Link href={'/'}>R3</Link>
          </h1>
          <Link href={'/'} className=''>
            <Image
              className="rounded-full w-36 aspect-square inline-block
              transition-all duration-300
              outline outline-[4.5rem] outline-gray-100/50 outline-offset-[-4.5rem]
              hover:outline-4 hover:outline-orange-500 hover:outline-offset-8"
              src={ProfileImage}
              alt="profile image"
            />
          </Link>
        </div>
        {/* Nav 바 */}
        <Navigation
          allCategory={allCategory}
        />
      </div>
    </>
  );
}

