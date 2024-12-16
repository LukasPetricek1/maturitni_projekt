import ThemePicture from "../assets/registration-background.jpg"

export interface ArticleProps {
  id: number;
  content: string; 
  title: string;
  subtitle: string;
  author: string; 
  createdAt: string; 
  theme_picture? : string
};

export const articles: ArticleProps[] = [
  {
    id: 1,
    title: "The Beauty of Sunset",
    subtitle: "A Journey into Nature's Art",
    author: "lukas_petricek_",
    createdAt: "2024-12-01T10:30:00",
    content: `<p>Sunsets are a reminder of the world's natural beauty. With every sunset, we witness a masterpiece of colors.</p>
      <h1 style="color:black">Why <b>Sunsets</b> Matter</h1>
      <p>They symbolize the end of a day, bringing peace and reflection.</p>
      <ul>
        <li>Serene beauty</li>
        <li>Time to reflect</li>
        <li>Symbol of hope</li>
      </ul>
      <p>Sunsets are a reminder of the world's natural beauty. With every sunset, we witness a masterpiece of colors.</p>
      <h1 style="color:black">Why <b>Sunsets</b> Matter</h1>
      <p>They symbolize the end of a day, bringing peace and reflection.</p>
      <ul>
        <li>Serene beauty</li>
        <li>Time to reflect</li>
        <li>Symbol of hope</li>
      </ul>
    `,
    theme_picture: ThemePicture
  },
  {
    id: 2,
    title: "Exploring the Mountains",
    subtitle: "A Hiker's Adventure",
    author: "lukas_petricek_",
    createdAt: "2024-11-15T08:45:00",
    content: `
      <p>Mountains have always been a source of adventure and serenity. Standing tall, they teach us perseverance.</p>
      <h2>The Call of the Peaks</h2>
      <p>Why do mountains draw us? They offer an escape and a challenge.</p>
    `,
    theme_picture: ThemePicture
  },
  {
    id: 3,
    title: "The Wonders of Technology",
    subtitle: "How Innovation Shapes Our World",
    author: "Michael Brown",
    createdAt: "2024-10-20T14:00:00",
    content: `
      <p>Technology has revolutionized every aspect of our lives. From communication to healthcare, its impact is undeniable.</p>
      <h2>Benefits of Technology</h2>
      <p>It brings convenience, connectivity, and endless possibilities.</p>
    `,
    theme_picture: ThemePicture
  },
  {
    id: 4,
    title: "The Joy of Cooking",
    subtitle: "A Culinary Journey",
    author: "Sophia Williams",
    createdAt: "2024-12-05T19:30:00",
    content: `
      <p>Cooking is an art that brings people together. It is a blend of creativity and skill.</p>
      <h2>Cooking Tips</h2>
      <ul>
        <li>Use fresh ingredients</li>
        <li>Experiment with flavors</li>
        <li>Enjoy the process</li>
      </ul>
    `,
    theme_picture: ThemePicture
  },
  {
    id: 5,
    title: "The Magic of Books",
    subtitle: "Exploring New Worlds",
    author: "Lucas Green",
    createdAt: "2024-09-12T11:15:00",
    content: `
      <p>Books are a gateway to countless adventures. They expand our imagination and knowledge.</p>
      <h2>Top Genres</h2>
      <ul>
        <li>Fantasy</li>
        <li>Science Fiction</li>
        <li>Mystery</li>
      </ul>
    `,
    theme_picture: ThemePicture
  },
  {
    id: 6,
    title: "The Ocean's Secrets",
    subtitle: "Diving into the Deep Blue",
    author: "Rachel Lee",
    createdAt: "2024-08-30T09:00:00",
    content: `
      <p>The ocean is a mysterious and enchanting place. Its vastness is a reminder of nature's power.</p>
      <h2>Marine Life</h2>
      <p>From vibrant corals to majestic whales, the ocean is full of life.</p>
    `,
  },
  {
    id: 7,
    title: "The Power of Music",
    subtitle: "How Melodies Move Us",
    author: "Andrew Martinez",
    createdAt: "2024-11-01T13:45:00",
    content: `
      <p>Music has the power to evoke emotions and bring people together. It transcends barriers.</p>
      <h2>Genres to Explore</h2>
      <ul>
        <li>Classical</li>
        <li>Rock</li>
        <li>Jazz</li>
      </ul>
    `,
  },
  {
    id: 8,
    title: "The Art of Photography",
    subtitle: "Capturing Moments",
    author: "Sarah Johnson",
    createdAt: "2024-10-10T16:20:00",
    content: `
      <p>Photography is an art that freezes time. Every photo tells a story.</p>
      <h2>Photography Tips</h2>
      <ul>
        <li>Focus on lighting</li>
        <li>Experiment with angles</li>
        <li>Tell a story</li>
      </ul>
    `,
  },
  {
    id: 9,
    title: "The World of Sports",
    subtitle: "Uniting People Through Competition",
    author: "David Wilson",
    createdAt: "2024-11-25T18:00:00",
    content: `
      <p>Sports are a celebration of skill and teamwork. They inspire and unite.</p>
      <h2>Popular Sports</h2>
      <ul>
        <li>Soccer</li>
        <li>Basketball</li>
        <li>Tennis</li>
      </ul>
    `,
  },
  {
    id: 10,
    title: "The Charm of Small Towns",
    subtitle: "Peaceful Life in the Countryside",
    author: "Emma Davis",
    createdAt: "2024-12-02T12:10:00",
    content: `
      <p>Small towns offer a sense of community and a slower pace of life.</p>
      <h2>Why Choose Small Towns</h2>
      <ul>
        <li>Friendly neighbors</li>
        <li>Scenic views</li>
        <li>Lower stress</li>
      </ul>
    `,
  },
];
