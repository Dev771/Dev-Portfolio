export const GITHUB_USERNAME = "Dev771";

export const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

export const SOCIAL_LINKS = {
  linkedin: "https://linkedin.com/in/dev-garg771/",
  github: `https://github.com/${GITHUB_USERNAME}`,
  email: "mailto:devgarg771@gmail.com",
};

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
}

export const INITIAL_PROJECTS_COUNT = 4;

export const PROJECTS: Project[] = [
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
    live: null,
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
    role: "Full Stack Developer",
    type: "Full Time",
    location: "Gurugram, Haryana",
    startDate: "Mar 2025",
    endDate: null,
    points: [
      "Led full-stack development for enterprise B2B platform overhaul, architecting scalable application using Next.js and Nest.js, resulting in 50% faster load times and 35% improved user retention",
      "Implemented multi-tenant security architecture using Keycloak IAM, enabling organization-level domain isolation and reducing security vulnerabilities by 80%",
      "Migrated legacy Ruby codebase to Node.js microservices, improving code maintainability by 60% and reducing deployment time through modular design",
      "Integrated Strapi CMS for dynamic content management, reducing developer intervention for content updates by 75%",
      "Optimized search with Elasticsearch, achieving 90% reduction in query response time (2.5s to 250ms) handling 10,000+ concurrent requests",
      "Enhanced SEO through Next.js SSR, improving organic search visibility by 40% with FCP under 1.2 seconds",
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
      "Launched an AI Sales Agent Hub managing 1000+ concurrent calls at <75ms latency across WhatsApp, email, SMS, and voice, achieving 30% higher lead conversion",
      "Engineered a multilingual AI Interview Platform using OpenAI APIs and Microsoft Speech SDK, completing 25,000+ interviews across 55+ languages with <100ms response times",
      "Designed real-time conversational UI using React and WebSockets for interviewer and sales agent bots",
      "Audited and refined the dependency tree, eliminating conflicts and cutting build time by 40%",
      "Integrated Microsoft Speech SDK for speech-to-text and analytics, reducing interview duration by 50%",
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
      "Collaborated with cross-functional teams to deliver scalable and maintainable software solutions across multiple projects",
      "Engineered seamless transition to Microservice Architecture, resulting in 30% reduction in system maintenance costs",
      "Utilized RabbitMQ and Docker to streamline deployment processes and CI/CD pipelines, reducing deployment time by 50%",
      "Led development of key mobile application using React Native, increasing user engagement by 35%",
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
    institution: "Bharati Vidhyapeeth Institute of Computer Applications and Management",
    degree: "Masters of Computer Applications (MCA)",
    gpa: "9.2/10",
    startDate: "2021",
    endDate: "2023",
  },
  {
    institution: "Bharati Vidhyapeeth Institute of Management and Research",
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
