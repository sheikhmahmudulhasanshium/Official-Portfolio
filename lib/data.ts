import { PersonalInterest, Pricing, Projects, Reviews} from "./types";
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
export const projectsData: (Projects)[] = [
  {
    id: "0",
    name: "Daily Metro",
    tags: ["Website"],
    image: "",
    projectURL: "https://www.dailymetro.net/",
    description: "Daily Metro | BD's First AI News Portal. Daily Metro is a fast-growing online newspaper providing positive news and current affairs from Bangladesh and beyond.",
    LogoUrl: "/DM.png",
    techStack: [
      { name: "Flutter", logoUrl: "https://storage.googleapis.com/cms-storage-bucket/4fd5520fe28ebf839174.svg" },
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "Firebase", logoUrl: "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png" },
      { name: "Nest.JS", logoUrl: "https://nestjs.com/logo-small-gradient.d792062c.svg" }
    ],
  },
  {
    id: "1",
    name: "Resogram",
    tags: ["Website"],
    image: "",
    projectURL: "https://www.resogram.com/",
    description: "Bangladesh's first social media platform for researchers. It's like instagram but for research.",
    LogoUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZjdhZWEiIHN0cm9rZS13aWR0aD0iMS4xMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY2xhc3M9Imx1Y2lkZSBsdWNpZGUtYm9vay1vcGVuIj48cGF0aCBkPSJNMTIgN3YxNCIvPjxwYXRoIGQ9Ik0zIDE4YTEgMSAwIDAgMS0xLTFWNGExIDEgMCAwIDEgMS0xaDVhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEgNC00aDVhMSAxIDAgMCAxIDEgMXYxM2ExIDEgMCAwIDEtMSAxaC02YTMgMyAwIDAgMC0zIDMgMyAzIDAgMCAwLTMtM3oiLz48L3N2Zz4=",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "Firebase", logoUrl: "https://firebase.google.com/static/images/brand-guidelines/logo-logomark.png" },
      { name: "Nest.JS", logoUrl: "https://nestjs.com/logo-small-gradient.d792062c.svg" }
    ],
  },
  {
    id: "2",
    name: "Movie Marathon",
    tags: ["Website"],
    LogoUrl: "https://raw.githubusercontent.com/sheikhmahmudulhasanshium/movie-marathon/refs/heads/main/public/images/logo-2-transparent.png",
    image: "https://www.figma.com/proto/uWsUahLuMGfEqDBUtvAnsL/Untitled?node-id=2-2755&node-type=canvas&t=0umgOUcweQWUqe4t-9&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2755&show-proto-sidebar=1",
    description: "Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you're planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.",
    projectURL: "https://movie-marathon-1.vercel.app/",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" }
    ],
  },
  {
    id: "3",
    name: "Movie Marathon 2",
    tags: ["Website"],
    LogoUrl: "https://raw.githubusercontent.com/sheikhmahmudulhasanshium/movie-marathon-2/refs/heads/main/public/logo-2-transparent.png",
    image: "https://www.figma.com/proto/uWsUahLuMGfEqDBUtvAnsL/Untitled?node-id=2-2755&node-type=canvas&t=0umgOUcweQWUqe4t-9&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2755&show-proto-sidebar=1",
    description: "Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you're planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.",
    projectURL: "https://movie-marathon-2.vercel.app/",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
      { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" }
    ],
  },
  {
    id: "4",
    name: "Movie Marathon 3",
    tags: ["Website"],
    LogoUrl: "https://raw.githubusercontent.com/sheikhmahmudulhasanshium/movie-marathon-3/refs/heads/main/public/logo.png",
    image: "https://www.figma.com/proto/uWsUahLuMGfEqDBUtvAnsL/Untitled?node-id=2-2755&node-type=canvas&t=0umgOUcweQWUqe4t-9&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2755&show-proto-sidebar=1",
    description: "Movie Marathon is the ultimate app for movie enthusiasts who love to binge-watch their favorite films and TV shows. Whether you're planning a cozy night in or an epic weekend of non-stop entertainment, Movie Marathon helps you organize and enhance your viewing experience. With a vast library of movies and TV series across various genres, personalized recommendations, and seamless streaming options, you can easily discover new favorites and revisit classics.",
    projectURL: "https://movie-marathon-3.vercel.app/",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
      { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" },
      { name: "Redux", logoUrl: "https://redux.js.org/img/redux.svg" }
    ],
  },
  {
    id: "5",
    name: "E-Commerce Website Maker",
    tags: ["Website"],
    LogoUrl: "/e-commerce.png",
    image: "https://www.figma.com/proto/uWsUahLuMGfEqDBUtvAnsL/Untitled?node-id=2-2755&node-type=canvas&t=0umgOUcweQWUqe4t-9&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2755&show-proto-sidebar=1",
    description: "This project is developed to help use and maintain multiple ecommerce stores simultaneously. It also contains most of the functionalities of ecommerce websites",
    projectURL: "https://github.com/sheikhmahmudulhasanshium/E-commerce-full-stack-admin",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
      { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" },
      { name: "Prisma", logoUrl: "https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_-330x400.png" },
      { name: "MySQL", logoUrl: "https://cdn.icon-icons.com/icons2/3053/PNG/512/mysql_workbench_macos_bigsur_icon_189924.png" },
      { name: "Zustand", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s" },
      { name: "Clerk", logoUrl: "https://feedback.clerk.com/_next/image?url=https%3A%2F%2Fuploads.productlane.com%2F7254258eb34a7b4626b86f0fbd4c1ed6.png&w=3840&q=75" },
      { name: "Stripe", logoUrl: "https://stripe.com/img/v3/home/twitter.png" }
    ],
    subProjects: [
      {
        name: "Back-end",
        image: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
        src: "",
        projectURL: "https://github.com/sheikhmahmudulhasanshium/E-commerce-full-stack-admin",
        techStack: [
          { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
          { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
          { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
          { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" },
          { name: "Prisma", logoUrl: "https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_-330x400.png" },
          { name: "MySQL", logoUrl: "https://cdn.icon-icons.com/icons2/3053/PNG/512/mysql_workbench_macos_bigsur_icon_189924.png" },
          { name: "Zustand", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s" },
          { name: "Clerk", logoUrl: "https://feedback.clerk.com/_next/image?url=https%3A%2F%2Fuploads.productlane.com%2F7254258eb34a7b4626b86f0fbd4c1ed6.png&w=3840&q=75" },
          /*{ name: "Stripe", logoUrl: "https://stripe.com/img/v3/home/twitter.png" }*/
        ],
      },
      {
        name: "Front-end",
        image: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
        src: "",
        projectURL: "https://github.com/sheikhmahmudulhasanshium/E-commerce-full-stack-store",
        techStack: [
          { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
          { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
          { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
          { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" }
        ],
      },
    ],
  },
  {
    id: "6",
    name: "Discord Clone",
    tags: ["Website"],
    LogoUrl: "/discord-by-shium.png",
    image: "https://www.figma.com/proto/uWsUahLuMGfEqDBUtvAnsL/Untitled?node-id=2-2755&node-type=canvas&t=0umgOUcweQWUqe4t-9&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A2755&show-proto-sidebar=1",
    description: "This Project contains all the functionality of Discord",
    projectURL: "https://discord-by-shium.vercel.app/",
    techStack: [
      { name: "Next.JS", logoUrl: "https://camo.githubusercontent.com/26d06a6572aa5d9ecdb699add71d40e57aefe8244c6306ba58a70aee6ad5123c/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6c696768745f6261636b67726f756e642e706e67" },
      { name: "TypeScript", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/120px-Typescript_logo_2020.svg.png" },
      { name: "React.JS", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" },
      { name: "Shadcn-UI", logoUrl: "https://ui.shadcn.com/apple-touch-icon.png" },
      { name: "Zustand", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s" },
      { name: "Clerk", logoUrl: "https://feedback.clerk.com/_next/image?url=https%3A%2F%2Fuploads.productlane.com%2F7254258eb34a7b4626b86f0fbd4c1ed6.png&w=3840&q=75" },
      { name: "Socket.IO", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT4bSbljFkmXXm90uFGrz-vu8G6oP4yDT4hQ&s" },
      { name: "Prisma", logoUrl: "https://cdn.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_-330x400.png" },
      { name: "MySQL", logoUrl: "https://cdn.icon-icons.com/icons2/3053/PNG/512/mysql_workbench_macos_bigsur_icon_189924.png" }
    ],
  },
]
