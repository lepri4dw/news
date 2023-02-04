export interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export interface Comment {
  id: number;
  post_id: number;
  author: string;
  text: string;
}

