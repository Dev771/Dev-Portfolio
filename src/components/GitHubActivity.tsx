import { cloneElement } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { GITHUB_USERNAME } from "../data/constants";
import "react-tooltip/dist/react-tooltip.css";
import "./GitHubActivity.css";

interface GitHubActivityProps {
  dark: boolean;
}

export default function GitHubActivity({ dark }: GitHubActivityProps) {
  return (
    <section className="github-section">
      <div className="github-chart-wrapper">
        <GitHubCalendar
          username={GITHUB_USERNAME}
          colorScheme={dark ? "dark" : "light"}
          blockSize={13}
          blockMargin={4}
          fontSize={13}
          renderBlock={(block, activity) =>
            cloneElement(block, {
              "data-tooltip-id": "github-tooltip",
              "data-tooltip-content": `${activity.count} contribution${activity.count !== 1 ? "s" : ""} on ${activity.date}`,
            })
          }
        />
        <ReactTooltip id="github-tooltip" />
      </div>
    </section>
  );
}
