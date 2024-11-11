import { PersonalInterest, Pricing, Reviews} from "./types";

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


export const reviews: Reviews[] = [
  {
    name: "Mirza Showvik",
    review:"This product is really amazing! The idea is fantastic, and the execution is beautiful. Everything is looking great so far—I'm genuinely impressed! Bro, you're doing an awesome job. I can already see the potential, and I hope we can continue to improve and achieve even better results in the future. Keep it up!",
    profileIconURL:
      "https://media.licdn.com/dms/image/v2/D5603AQFJnbIec1ArBA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1716030179946?e=1736985600&v=beta&t=0c6jZGOiaDaP_uqXEimk4Jkm153-Otr1AXXrCc1yTCg",
    designation:
      "iOS Developer @Programming Hero || SwiftUI || Flutter || Next.JS || Nest.JS",
    seasonalIdentifier: "",
    reviewerUrl: "https://www.linkedin.com/in/mirzashowvik/",
  },
  {
    name: "Istiak Shaharia",
    review:"This product is really amazing! The idea is fantastic, and the execution is beautiful. Everything is looking great so far—I'm genuinely impressed! Bro, you're doing an awesome job. I can already see the potential, and I hope we can continue to improve and achieve even better results in the future. Keep it up!",
    profileIconURL:
      "https://media.licdn.com/dms/image/v2/D5603AQEWwntQrWxQfg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1671222403116?e=1736985600&v=beta&t=QuO_LEFJ4ZWRRAKMfVvkd0u1TFjVPaTWgrQjOFfwydw",
    designation:
      "Tech Enthusiast || Project Manage",
    seasonalIdentifier: "",
    reviewerUrl: "https://www.linkedin.com/in/mirzashowvik/",
  },
];
 