import { useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, List } from "lucide-react";

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
import { createFraudReport } from "@/services/fraudService";

const initialForm = {
  impostorDetails: "",
  contactInfo: "",
  comments: "",
};

const FraudReportPage = () => {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      await createFraudReport(form);
      setForm(initialForm);
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No se pudo enviar el reporte."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="main-content" className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-2">
              LabCIBE-UNA
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Reportar un fraude
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Comparta los detalles del intento de fraude para que el
              laboratorio pueda analizarlo y alertar a la comunidad.
            </p>
          </div>

          {success && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-900">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">Reporte enviado correctamente.</p>
                <p className="text-sm mt-1">
                  Gracias por contribuir a la seguridad digital.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Formulario de reporte</CardTitle>
              <CardDescription>
                Los campos marcados con * son obligatorios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="impostorDetails"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Detalles del impostor *
                  </label>
                  <textarea
                    id="impostorDetails"
                    name="impostorDetails"
                    required
                    rows={4}
                    value={form.impostorDetails}
                    onChange={handleChange}
                    placeholder="Describa quién se hizo pasar por otra persona u organización..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactInfo"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Medio de contacto usado *
                  </label>
                  <input
                    id="contactInfo"
                    name="contactInfo"
                    type="text"
                    required
                    value={form.contactInfo}
                    onChange={handleChange}
                    placeholder="Correo, teléfono, enlace, red social..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div>
                  <label
                    htmlFor="comments"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Comentarios adicionales
                  </label>
                  <textarea
                    id="comments"
                    name="comments"
                    rows={3}
                    value={form.comments}
                    onChange={handleChange}
                    placeholder="Información extra que considere relevante..."
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Enviar reporte"}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/reportes">
                      <List className="mr-2 h-4 w-4" />
                      Ver reportes
                    </Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FraudReportPage;
