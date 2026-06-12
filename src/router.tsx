import { createBrowserRouter } from "react-router-dom";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import ReportFraudPage from "@/pages/FraudReportPage";
import FraudReportsListPage from "@/pages/FraudReportsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/reportar-estafa",
    element: <ReportFraudPage />,
  },
  {
    path: "/reportar-fraudes",
    element: <ReportFraudPage />,
  },
  {
    path: "/reportes",
    element: <FraudReportsListPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;