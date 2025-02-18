import { createContext } from "react";

export interface ArticleProps {
  comment_count: number;
  content: string;
  created_at: string;
  extended: boolean;
  id: number;
  like_count: number;
  security: "public" | "private";
  subtitle: string;
  title: string;
  user_id: number;
  username: string;
}

interface ArticleContextProps{ 
  data : ArticleProps[]
}

export const ArticleContext = createContext<ArticleContextProps>({ 
  data : []
})