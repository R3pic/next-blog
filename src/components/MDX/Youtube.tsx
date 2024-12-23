interface YoutubeProps {
  id: string;
}

export default function Youtube({ id }: YoutubeProps) {
  return (
    <iframe
      className="w-full aspect-video"
      loading="lazy"
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
}