import ContentWindow from '@/components/ContentWindow';
import RightSidebar from '@/components/sidebar/RightSidebar';

export default function NotFound() {
  return (
    <>
      <ContentWindow>
        <div className='w-full text-center
        my-20
        '>
          <p className='text-5xl'>404 Not Found</p>
        </div>
      </ContentWindow>
      <RightSidebar />
    </>
  );
}