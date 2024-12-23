import ContentWindow from '@/components/ContentWindow';
import RightSidebar from '@/components/sidebar/RightSidebar';

export default async function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ContentWindow>
        { children }
      </ContentWindow>
      <RightSidebar />
    </>
  );
}