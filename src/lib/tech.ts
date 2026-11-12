import { TECH_STACK } from "../data/constants";

/** Brand colour for each tool, shown as a small pixel gem next to its name. */
export const GEMS: Record<string, string> = {
  TypeScript: "#3178C6", JavaScript: "#F1E05A", Java: "#B07219", HTML5: "#E34F26", CSS3: "#663399",
  React: "#61DAFB", "Next.js": "#EDEBFF", Angular: "#DD0031", "React Native": "#61DAFB", "Node.js": "#5FA04E",
  "Nest.js": "#E0234E", "Spring Boot": "#6DB33F", Express: "#C3BFE3", "Tailwind CSS": "#38BDF8",
  Bootstrap: "#7952B3", "Material UI": "#007FFF", MongoDB: "#47A248", Elasticsearch: "#00BFB3",
  PostgreSQL: "#5A8FD8", Docker: "#2496ED", Git: "#F05032", GitHub: "#EDEBFF", AWS: "#FF9900",
  "Google Cloud": "#4285F4", "Socket.io": "#EDEBFF", RabbitMQ: "#FF6600",
};

export const gem = (name: string) => GEMS[name] ?? "var(--lavender)";

/** Display name for a devicon path like "nestjs/nestjs-original". */
export const techName = (icon: string) => TECH_STACK.find((t) => t.icon === icon)?.name ?? icon.split("/")[0];
