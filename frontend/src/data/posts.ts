import ImagePlaceholder from "../assets/1.jpg";


export interface postDataProps {
  id: number;
  username: string;
  title: string;
  description: string;
  contentType: "image" | "video";
  contentSrc: string;
  date: string;
  likes: number;
  comments: number;
}

export const postsData: postDataProps[] = [
  {
    id: 1,
    username: "lukas_petricek_",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 2,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 3,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 4,
    username: "lukas_petricek_",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 5,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 6,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },  {
    id: 7,
    username: "lukas_petricek_",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 8,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 9,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 10,
    username: "lukas_petricek_",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 11,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
  {
    id: 12,
    username: "lugy_pugy",
    title: "This new JavaScript operator is an absolute game changer.",
    description: "subdomain",
    contentType: "image",
    contentSrc: ImagePlaceholder,
    date: "14.11.2024",
    likes: 542,
    comments: 21,
  },
];