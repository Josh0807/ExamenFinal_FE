import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, PlusCircle } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getFraudReports } from "@/services/fraudService";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("es-CR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const FraudReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadReports() {
      setIsLoading(true);
      setError("");

      try {
        const data = await getFraudReports();
        if (active) setReports(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (active) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "No se pudieron cargar los reportes."
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadReports();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="main-content" className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
                LabCIBE-UNA
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Reportes de fraude
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Listado de reportes recibidos por la plataforma.
              </p>
            </div>
            <Button asChild>
              <Link to="/reportar-estafa">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nuevo reporte
              </Link>
            </Button>
          </div>

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <p className="text-muted-foreground">Cargando reportes...</p>
          ) : reports.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Sin reportes</CardTitle>
                <CardDescription>
                  Aún no hay reportes registrados. Puede crear el primero.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Reporte #{report.id}
                    </CardTitle>
                    <CardDescription>
                      {formatDate(report.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-foreground">
                        Detalles del impostor
                      </p>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {report.impostorDetails}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Medio de contacto
                      </p>
                      <p className="text-muted-foreground">
                        {report.contactInfo}
                      </p>
                    </div>
                    {report.comments && (
                      <div>
                        <p className="font-medium text-foreground">
                          Comentarios
                        </p>
                        <p className="text-muted-foreground whitespace-pre-wrap">
                          {report.comments}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FraudReportsPage;
