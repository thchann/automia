import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

// NotFound is the catch-all 404 route.
// It logs the missing path to the console to help debug broken links.
const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold">404</h1>
        <p className="mb-4 text-lg md:text-xl text-muted-foreground">
          {t("notFound.title")}
        </p>
        <a href="/" className="inline-block text-primary underline hover:text-primary/90 py-3 min-h-11">
          {t("notFound.back")}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
