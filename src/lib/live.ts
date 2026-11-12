import { useEffect, useState } from "react";
import { LIVE_DATA_BASE } from "../data/constants";
import { CONTRIBUTIONS_SNAPSHOT, LANGUAGES_SNAPSHOT } from "../data/snapshot";

export interface Day {
  date: string;
  count: number;
}

export interface Contributions {
  fetched_at: string;
  total: number;
  days: Day[];
}

export type Languages = Record<string, { bytes: number; repos: number; color: string | null }>;

export interface LiveData {
  contributions: Contributions;
  languages: Languages;
  live: boolean;
}

const initial: LiveData = {
  contributions: CONTRIBUTIONS_SNAPSHOT,
  languages: LANGUAGES_SNAPSHOT,
  live: false,
};

/**
 * Starts from the bundled snapshot so the page renders full numbers at once,
 * then swaps in the files my profile repo refreshes every morning.
 */
export function useLiveData(): LiveData {
  const [data, setData] = useState(initial);

  useEffect(() => {
    const controller = new AbortController();
    const get = (name: string) =>
      fetch(`${LIVE_DATA_BASE}/${name}`, { signal: controller.signal }).then((res) => {
        if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
        return res.json();
      });

    Promise.all([get("contributions.json"), get("languages.json")])
      .then(([contributions, languages]: [Contributions, Languages]) => {
        if (contributions?.days?.length) setData({ contributions, languages, live: true });
      })
      .catch(() => {
        // Keep the snapshot. The numbers are at most a few days old.
      });

    return () => controller.abort();
  }, []);

  return data;
}
