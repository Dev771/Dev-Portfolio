export const GITHUB_USERNAME = "Dev771";

export const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/dev-garg771/",
  github: `https://github.com/${GITHUB_USERNAME}`,
  email: "mailto:devgarg771@gmail.com",
};

export const PROFILE = {
  name: "Dev Garg",
  role: "Software Engineer at Zime",
  location: "Delhi NCR, India",
  tagline:
    "I work on sign-in, infrastructure and AI features at Zime, a sales intelligence platform, and build small full-stack apps on the side.",
  email: "devgarg771@gmail.com",
};

// Live numbers come from the data files my GitHub profile repo refreshes every morning.
export const LIVE_DATA_BASE = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${GITHUB_USERNAME}/main/data`;

export const TECH_STACK = [
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "JavaScript", icon: "javascript/javascript-original" },
  { name: "Java", icon: "java/java-original" },
  { name: "HTML5", icon: "html5/html5-original" },
  { name: "CSS3", icon: "css3/css3-original" },
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
  { name: "Angular", icon: "angular/angular-original" },
  { name: "React Native", icon: "react/react-original" },
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "Nest.js", icon: "nestjs/nestjs-original" },
  { name: "Spring Boot", icon: "spring/spring-original" },
  { name: "Express", icon: "express/express-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
  { name: "Bootstrap", icon: "bootstrap/bootstrap-original" },
  { name: "Material UI", icon: "materialui/materialui-original" },
  { name: "MongoDB", icon: "mongodb/mongodb-original" },
  { name: "Elasticsearch", icon: "elasticsearch/elasticsearch-original" },
  { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "Git", icon: "git/git-original" },
  { name: "GitHub", icon: "github/github-original" },
  { name: "AWS", icon: "amazonwebservices/amazonwebservices-original-wordmark" },
  { name: "Google Cloud", icon: "googlecloud/googlecloud-original" },
  { name: "Socket.io", icon: "socketio/socketio-original" },
  { name: "RabbitMQ", icon: "rabbitmq/rabbitmq-original" },
];

export interface Experience {
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string | null;
  points: string[];
  techStack: string[];
}

export interface Project {
  title: string;
  description: string;
  year: string;
  techStack: string[];
  github: string | null;
  live: string | null;
  /** extra lines shown on the console screen */
  notes?: string[];
}

export const INITIAL_PROJECTS_COUNT = 4;

/** Hidden cartridge: locked in the reel until someone enters the Konami code on the console. */
export const SECRET_PROJECT: Project = {
  title: "This website",
  description: "You found the cheat code. Here's how this site works under the hood.",
  year: "2026",
  techStack: ["react/react-original", "typescript/typescript-original", "github/github-original"],
  github: "https://github.com/Dev771/Dev-Portfolio",
  live: null,
  notes: [
    "Numbers: a GitHub Action on my profile repo saves my contributions and languages every morning. This page reads those files, and falls back to a bundled copy if GitHub is slow.",
    "Commit city: one SVG building per week and one window per day, worked out in the browser from that data.",
    "Sprite: a small Python script shrinks my avatar to a 51 by 61 pixel grid with a 16-colour palette.",
    "Fonts: Tiny5 for text and Jersey 10 for numbers. Pixelify only appears at heading size, because its small letters are easy to misread.",
    "Built with React 19, TypeScript and Vite, with no UI library. Every control works from the keyboard and motion stops if your system asks for less.",
  ],
};

export const SECRET_CODE = ["up", "up", "down", "down", "left", "right", "left", "right", "b", "a"] as const;
export type CodeInput = (typeof SECRET_CODE)[number];

export const PROJECTS: Project[] = [
  {
    title: "Kharcha",
    description:
      "Split expenses with friends or flatmates: group ledgers, live balances, settle-ups and exports. A Turborepo monorepo with a NestJS, Prisma and Redis backend.",
    year: "2026",
    techStack: [
      "typescript/typescript-original",
      "nestjs/nestjs-original",
      "nextjs/nextjs-original",
      "postgresql/postgresql-original",
    ],
    github: "https://github.com/Dev771/Kharcha",
    live: "https://kharcha-client.vercel.app",
  },
  {
    title: "Zime AI – Enterprise B2B Platform",
    description:
      "Full-stack enterprise platform built from ground up with Next.js and Nest.js. Features multi-tenant Keycloak auth, Elasticsearch-powered search, Strapi CMS, and SSR for SEO — serving 10,000+ concurrent requests.",
    year: "2025",
    techStack: [
      "nextjs/nextjs-original",
      "nestjs/nestjs-original",
      "typescript/typescript-original",
      "elasticsearch/elasticsearch-original",
      "docker/docker-original",
    ],
    github: null,
    live: null,
  },
  {
    title: "AI Sales Agent Hub",
    description:
      "Multi-channel AI sales system managing 1000+ concurrent calls at <75ms latency across WhatsApp, email, SMS, and voice with contextual follow-ups, custom CRM, and push notifications.",
    year: "2024",
    techStack: [
      "react/react-original",
      "nodejs/nodejs-original",
      "socketio/socketio-original",
      "mongodb/mongodb-original",
    ],
    github: null,
    live: null,
  },
  {
    title: "Multilingual AI Interview Platform",
    description:
      "Low-latency interview platform leveraging OpenAI APIs and Microsoft Speech SDK, completing 25,000+ interviews across 55+ languages with real-time conversational UI via WebSockets.",
    year: "2024",
    techStack: [
      "react/react-original",
      "nodejs/nodejs-original",
      "typescript/typescript-original",
      "socketio/socketio-original",
    ],
    github: null,
    live: null,
  },
  {
    title: "Account Management API",
    description:
      "Account Management API built with Java Spring Boot using Microservice Architecture. Utilizes Docker, RabbitMQ, and JWT for containerized deployment and secure authentication.",
    year: "2024",
    techStack: [
      "java/java-original",
      "spring/spring-original",
      "docker/docker-original",
      "rabbitmq/rabbitmq-original",
    ],
    github: "https://github.com/Dev771/Account-Managment-API",
    live: null,
  },
  {
    title: "CENACLE",
    description:
      "A full-stack web application built with JavaScript, featuring a complete frontend and backend architecture for collaborative workflows.",
    year: "2024",
    techStack: [
      "javascript/javascript-original",
      "nodejs/nodejs-original",
      "mongodb/mongodb-original",
    ],
    github: "https://github.com/Dev771/CENACLE",
    live: null,
  },
  {
    title: "Project Management Dashboard",
    description:
      "A project management dashboard built with TypeScript for tracking tasks, timelines, and team collaboration in a clean, organized interface.",
    year: "2024",
    techStack: [
      "typescript/typescript-original",
      "react/react-original",
      "nodejs/nodejs-original",
    ],
    github: "https://github.com/Dev771/Project-Management-Dashboard",
    live: "https://project-management-dashboard-pied.vercel.app",
  },
  {
    title: "EduHub",
    description:
      "An education platform built with JavaScript, providing a hub for learning resources, course management, and student-teacher interaction.",
    year: "2024",
    techStack: [
      "javascript/javascript-original",
      "react/react-original",
      "nodejs/nodejs-original",
    ],
    github: "https://github.com/Dev771/EduHub",
    live: null,
  },
  {
    title: "Binder",
    description:
      "A JavaScript web application for organizing and binding content together, featuring an intuitive user interface for managing collections.",
    year: "2024",
    techStack: [
      "javascript/javascript-original",
      "react/react-original",
      "mongodb/mongodb-original",
    ],
    github: "https://github.com/Dev771/Binder",
    live: null,
  },
  {
    title: "React Native Apps",
    description:
      "A collection of mobile applications built with React Native, showcasing cross-platform development patterns and native device integrations.",
    year: "2024",
    techStack: [
      "react/react-original",
      "javascript/javascript-original",
    ],
    github: "https://github.com/Dev771/ReactNativeApps",
    live: null,
  },
  {
    title: "Microservices Architecture Migration",
    description:
      "Engineered transition from monolith to microservice architecture at Nagarro, using RabbitMQ and Docker to streamline CI/CD pipelines — reducing maintenance costs by 30% and deployment time by 50%.",
    year: "2023",
    techStack: [
      "java/java-original",
      "spring/spring-original",
      "docker/docker-original",
      "rabbitmq/rabbitmq-original",
    ],
    github: null,
    live: null,
  },
  {
    title: "ChatBot App",
    description:
      "A conversational chatbot application built with JavaScript, featuring real-time messaging and automated response capabilities.",
    year: "2023",
    techStack: [
      "javascript/javascript-original",
      "nodejs/nodejs-original",
    ],
    github: "https://github.com/Dev771/ChatBotApp",
    live: null,
  },
  {
    title: "Hotel Management System",
    description:
      "A web-based hotel management system for handling reservations, room allocation, guest check-in/check-out, and billing workflows.",
    year: "2023",
    techStack: [
      "html5/html5-original",
      "css3/css3-original",
      "javascript/javascript-original",
    ],
    github: "https://github.com/Dev771/Hotel-Managment",
    live: null,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Zime AI",
    role: "Software Engineer",
    type: "Full Time",
    location: "Gurugram, Haryana",
    startDate: "Mar 2025",
    endDate: null,
    points: [
      "Built the Zime MCP connector, so people can ask about their sales calls from Claude, ChatGPT and Gemini.",
      "Shipped the Microsoft Teams integration: Teams meetings are now recorded and analysed in Zime like Zoom calls.",
      "Built multi-tenant sign-in on Keycloak. Each customer organisation gets its own isolated domain, and one SSO flow, Microsoft Entra ID included, covers every customer workspace.",
      "Added scheduled answers to Ask Zime, delivered by email, Slack or Teams, and /skill commands for questions people ask again and again.",
      "Led the rebuild of Zime's B2B platform on Next.js and NestJS. Pages load 50% faster and user retention rose 35%.",
      "Rebuilt search on Elasticsearch: queries went from 2.5s to 250ms at 10,000+ concurrent requests.",
      "Moved legacy Ruby services to Node.js microservices that deploy independently on AWS EKS through ArgoCD.",
      "Set up Strapi CMS so content changes no longer need a developer, cutting developer time on content updates by 75%.",
      "Server-rendered the public pages in Next.js for first paint under 1.2s and 40% more organic search visibility.",
    ],
    techStack: [
      "nextjs/nextjs-original",
      "nestjs/nestjs-original",
      "nodejs/nodejs-original",
      "typescript/typescript-original",
      "elasticsearch/elasticsearch-original",
      "docker/docker-original",
      "amazonwebservices/amazonwebservices-original-wordmark",
    ],
  },
  {
    company: "Goodspace AI",
    role: "Full Stack Developer",
    type: "Full Time",
    location: "Noida, Uttar Pradesh",
    startDate: "Oct 2024",
    endDate: "Mar 2025",
    points: [
      "Launched an AI sales agent hub running 1,000+ concurrent conversations across WhatsApp, email, SMS and voice at under 75ms. Lead conversion rose 30%.",
      "Built an AI interview platform on OpenAI and the Microsoft Speech SDK that has run 25,000+ interviews in 55+ languages, responding in under 100ms.",
      "Designed the real-time chat UI for both bots in React over WebSockets.",
      "Added speech-to-text and analytics with the Microsoft Speech SDK, halving interview length.",
      "Untangled the dependency tree, removing version conflicts and cutting build time by 40%.",
    ],
    techStack: [
      "react/react-original",
      "nodejs/nodejs-original",
      "typescript/typescript-original",
      "socketio/socketio-original",
      "mongodb/mongodb-original",
    ],
  },
  {
    company: "Nagarro",
    role: "Java Full Stack Developer",
    type: "Full Time",
    location: "Gurugram, Haryana",
    startDate: "Mar 2023",
    endDate: "Oct 2024",
    points: [
      "Split a monolith into Spring Boot microservices, cutting maintenance costs by 30%.",
      "Used Docker and RabbitMQ to simplify deployments and CI/CD, halving deployment time.",
      "Led a React Native mobile app that raised user engagement by 35%.",
    ],
    techStack: [
      "react/react-original",
      "java/java-original",
      "spring/spring-original",
      "docker/docker-original",
      "rabbitmq/rabbitmq-original",
      "mongodb/mongodb-original",
    ],
  },
];

export interface Education {
  institution: string;
  degree: string;
  gpa: string;
  startDate: string;
  endDate: string;
}

export const EDUCATION: Education[] = [
  {
    institution: "Bharati Vidyapeeth Institute of Computer Applications and Management",
    degree: "Masters of Computer Applications (MCA)",
    gpa: "9.2/10",
    startDate: "2021",
    endDate: "2023",
  },
  {
    institution: "Bharati Vidyapeeth Institute of Management and Research",
    degree: "Bachelor's of Computer Application (BCA)",
    gpa: "8.6/10",
    startDate: "2018",
    endDate: "2021",
  },
];

export interface Honor {
  title: string;
  subtitle: string;
  date: string;
}

// Add your LinkedIn certifications here: { title, subtitle, date }
export const HONORS: Honor[] = [];
