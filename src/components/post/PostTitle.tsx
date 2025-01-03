import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import Image from 'next-export-optimize-images/image';
import { formatDateString } from '@/libs/date';

interface PostTitleProps {
  title: string;
  categoryPath: string;
  categoryDisplay: string;
  date: Date;
  thumbnail: string | undefined;
}

export default function PostTitle({ title, categoryPath, categoryDisplay, date, thumbnail }: PostTitleProps) {
  return (
    <div className='relative aspect-thumbnail'>
      {thumbnail && <Image
        data-pagefind-meta="image[src], image_alt[alt]"
        src={thumbnail}
        alt={`${title} Thumbnail`}
        className="m-0 object-cover w-full"
        width={640}
        height={486}
      />}
      {/* 반투명 */}
      <div
        className="flex flex-col items-center justify-center
        absolute
        inset-8
        lg:left-10 
        lg:right-10 
        lg:top-20 
        lg:bottom-20
      bg-white/50 backdrop-blur-sm
      dark:bg-zinc-700/50
        ">
        <div className="flex flex-col items-center gap-8 lg:gap-16">
          <p 
            data-pagefind-meta="title"
            className="font-bold text-center whitespace-normal break-keep
              text-xl
              lg:px-24
              lg:text-3xl
              dark:text-[#ddd]
            ">
            {title}
          </p>
          <div className="flex gap-4">
            <Link
              className="relative px-4 py-2 hidden lg:flex
              min-w-32
              text-light-foreground
              bg-transparent rounded-lg dark:text-[#ddd] 
              hover:shadow-xl transition duration-300 
              group"
              href={`/category/${categoryPath}`}
            >
              <Icon icon='folder' className="mr-1" />
              <p className='m-0'>{categoryDisplay}</p>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#A1D6CB]">
                <div className="h-full origin-left scale-x-0 
                        bg-gradient-to-r from-red-300 to-blue-300
                        transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </Link>
            <button
              className="relative px-4 py-2 flex
              text-sm
              lg:text-base
              min-w-16
              lg:min-w-32
              bg-transparent rounded-lg dark:text-[#ddd] 
              hover:shadow-xl transition duration-300 group"
            >
              <Icon icon='calendar' className="mr-1 size-4 lg:size-6" />
              <p data-pagefind-meta='date' className='m-0'>{ formatDateString(date) }</p>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-[#A1D6CB]">
                <div className="hidden lg:block
                  h-full origin-left scale-x-0 
                  bg-gradient-to-r from-red-300 to-blue-300
                  transition-transform duration-300 group-hover:scale-x-100" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}