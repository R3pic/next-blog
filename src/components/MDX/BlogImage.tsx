import Image from 'next-export-optimize-images/image';

export interface BlogImageProps {
  alt: string;
  src: string;
}

export default function BlogImage({ alt = 'blog image', src }: BlogImageProps) {
  return (
    <Image
      className="block m-0 mx-auto rounded-lg shadow-l"
      alt={alt}
      src={`/img/post/${src}`}
      width={700}
      height={450}
      loading="lazy"
    />
  );
}