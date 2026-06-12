import { buildApiUrl } from "@/lib/config";

async function parseError(response) {
  const text = await response.text();
  if (!text) return "Error en la solicitud";
  try {
    const json = JSON.parse(text);
    return typeof json === "string" ? json : json.title ?? json.message ?? text;
  } catch {
    return text;
  }
}

export async function getFraudReports() {
  const response = await fetch(buildApiUrl("/api/Fraud"));

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}

export async function createFraudReport(report) {
  const response = await fetch(buildApiUrl("/api/Fraud"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  return response.json();
}
