export interface Post {
  id: number;
  title: string;
  image: string | null;
  createdAt: string;
}

export interface FullPost extends Post{
  content: string;
}

export interface PostMutation {
  title: string;
  content: string;
  image: File | null;
}

export interface Comment {
  id: number;
  post_id: number;
  author: string;
  text: string;
}

export type CommentMutation = Omit<Comment, 'id'>;