import * as dotenv from "dotenv"
dotenv.config()

const GITHUB_USERNAME = "rohanattc";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const GRAPHQL_ENDPOINT = "https://api.github.com/graphql";

const query = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface ContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
}

// The calendar is fetched at build time for production. In `astro dev` every render of the
// home page would otherwise call GitHub again (about 0.5s each), so successful results are
// cached for 15 minutes, failures for 1 minute, and a slow request is cut off after 5 seconds.
const CACHE_OK_MS = 15 * 60 * 1000;
const CACHE_FAIL_MS = 60 * 1000;
const TIMEOUT_MS = 5000;

let cache: { at: number; ttl: number; data: ContributionData | null } | null = null;
let inflight: Promise<ContributionData | null> | null = null;

async function loadContributions(): Promise<ContributionData | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const data = await response.json();
    const calendar = data.data.user.contributionsCollection.contributionCalendar;
    cache = { at: Date.now(), ttl: CACHE_OK_MS, data: calendar };
    return calendar;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    cache = { at: Date.now(), ttl: CACHE_FAIL_MS, data: null };
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchGitHubContributions(): Promise<ContributionData | null> {
  if (cache && Date.now() - cache.at < cache.ttl) return cache.data;
  // Concurrent renders share one request instead of each making their own.
  inflight ??= loadContributions().finally(() => {
    inflight = null;
  });
  return inflight;
}
