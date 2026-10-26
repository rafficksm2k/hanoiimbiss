import chicken from "../assets/chicken.jpg";
import rolls from "../assets/rolls.jpg";
import noodles from "../assets/noodles.jpg";
import rice from "../assets/rice.jpg";
import beef from "../assets/beef.jpg";
import duck from "../assets/duck.jpg";
import curry from "../assets/curry.jpg";
import drinks from "../assets/drinks.jpg";

/* Freely licensed photos (Unsplash, duck via Pexels). Not from hanoi-asia-imbiss.de. */
export const highlights = [
  { id: "chicken", image: chicken },
  { id: "rolls", image: rolls },
  { id: "noodles", image: noodles },
  { id: "rice", image: rice },
  { id: "beef", image: beef },
  { id: "duck", image: duck, menuNumber: "66", menuName: "Knusprige Ente" },
  {
    id: "curry",
    image: curry,
    menuNumber: "73",
    menuName: "Verschiedenes Gemüse in rotem Curry",
  },
  { id: "drinks", image: drinks },
];
