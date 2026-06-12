/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPORTS_URL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "@/pages/FraudReportPage" {
  import type { FC } from "react";
  const FraudReportPage: FC;
  export default FraudReportPage;
}

declare module "@/pages/FraudReportsPage" {
  import type { FC } from "react";
  const FraudReportsPage: FC;
  export default FraudReportsPage;
}

declare module "@/services/fraudService" {
  export function getFraudReports(): Promise<
    Array<{
      id: number;
      impostorDetails: string;
      contactInfo: string;
      comments?: string;
      createdAt: string;
    }>
  >;
  export function createFraudReport(report: {
    impostorDetails: string;
    contactInfo: string;
    comments?: string;
  }): Promise<unknown>;
}
