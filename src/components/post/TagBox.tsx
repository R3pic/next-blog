import Link from 'next/link';
import Icon from '../ui/Icon';

interface TagBoxProps {
  tags?: string[];
}
 
export default function TagBox({ tags }: TagBoxProps) {
  const render = (tags: string[]) => {
    return (<>
      {tags.map((tag, i) => {
        return (
          <Link
            key={i}
            href={`/tag/${tag}`}
            className='flex px-2 py-1 gap-1 items-center
             bg-[#ddd] dark:bg-[#555]
             rounded-3xl
             text-sm
             hover:scale-95
             transition-transform duration-500'>
            <Icon className='stroke-[#aaa] dark:stroke-white' icon='tag' size={16} />
            <span className='text-light-foreground dark:text-dark-foreground'>
              {tag}
            </span>
          </Link>
        );
      })}
    </>
    );
  };

  return (
    <div>
      {tags && tags.length > 0 && 
      <div className='my-8 flex gap-4'>
        <div className="flex flex-wrap gap-2">{render(tags)}</div>
      </div>}
    </div>
  );
}