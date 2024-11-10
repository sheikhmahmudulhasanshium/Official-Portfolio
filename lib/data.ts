import { PersonalInterest, Pricing} from "./types";

export const PersonalIntroduction: PersonalInterest[] = [
  {
    "title": "Nature Lover",
    "description": "Enjoy planting trees and connecting with nature.",
    "icon": "⛺",
    "iconPath":"/jungle.png",
  },
  {
    "title": "Lifelong Learner",
    "description": "Always discovering new skills and expanding my knowledge.",
    "icon": "📚",
    "iconPath":"/learn.png",
  },
  {
    "title": "Aspiring Software Engineer",
    "description": "Learning the basics of software development and coding.",
    "icon": "💻",
    "iconPath":"/software.png"
  },
  {
    "title": "Movie Lover",
    "description": "A fan of all kinds of films, from indie to blockbuster.",
    "icon": "🎬",
    "iconPath": "/movie.png",
    
  }
];


export const pricingData: Pricing[] = [
  {
    iconLink: '/fire.svg',
    icon: '🔥',
    title: "PMF?!",
    description:
      "Everyone I worked with said they’d be Extremely Disappointed if I stopped working with them. Btw, most founders refer me to fellow startups too!",
  },
  {
    iconLink: "/money-with-wings.svg",
    icon: '💸',
    title: "Pricing",
    description:
      "I charge between $100-$4k for one-off projects. If you’re an early-stage founder without a full-time developer, I can commit to a part-time role till you’ve grown enough for a FT hire!",
  },
  {
    iconLink: "/racing-car.svg",
    icon: '🏎',
    title: "Superrrrr Speed",
    description:
      "Startup = Growth. I put out ideas quickly and deliver fast so you don’t wait on growing! My friends call me Lightning McQueen for a reason.",
  },
];
