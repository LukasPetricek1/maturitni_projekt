import { createContext } from "react";

interface PostContextProps { 
    likeCount : number;
    setLikeCount: React.Dispatch<React.SetStateAction<number>>;
    liked : boolean;
    setLiked: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostContext = createContext<PostContextProps>({
  likeCount : 0,
  setLikeCount : () => {},
  liked: false,
  setLiked : () => {}
})