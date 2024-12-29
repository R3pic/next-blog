interface PageFindUI {
  destroy: () => void;
}

interface PageFindUIConstructor {
  new (options: PageFindUIOptions): PageFindUI;
}

interface PageFindUIOptions {
  element: string;
  pageSize?: number;
  resetStyles?: boolean;
  showImages?: boolean;
  translations?: Record<string, string>;
}