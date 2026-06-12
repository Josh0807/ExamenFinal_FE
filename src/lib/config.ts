export const REPORTS_URL =
  import.meta.env.VITE_REPORTS_URL ?? "/reportar-estafa";

const configuredApiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");

export const API_URL = configuredApiUrl ?? "http://localhost:5219";

export function buildApiUrl(path: string): string {
  if (configuredApiUrl) {
    return `${configuredApiUrl}${path}`;
  }

  return path;
}
