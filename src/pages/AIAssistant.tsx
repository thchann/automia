import { Sparkles, Send } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";

// AI Assistant page is a simple chat-style surface for asking questions about
// cars, leads, and sales. Suggested questions and responses are static; hooking
// this up to a real backend would route input to an API and stream responses.
const suggestedQuestions = ["ai.suggested.1", "ai.suggested.2", "ai.suggested.3", "ai.suggested.4"];

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-6 w-6 md:h-7 md:w-7 text-[hsl(var(--metric-purple))]" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground font-title">
          {t("ai.title")}
        </h1>
      </div>
      <p className="text-muted-foreground mb-4 md:mb-6">{t("ai.subtitle")}</p>

      <div className="flex-1 bg-card rounded-xl border border-border p-4 md:p-6 flex flex-col">
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4 max-w-2xl">
            <p className="text-sm text-card-foreground">
              {t("ai.greeting")}
            </p>
            <p className="text-xs text-muted-foreground mt-2">10:30 AM</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {t("ai.suggestedLabel")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((key) => (
              <button
                key={key}
                onClick={() => setInput(t(key))}
                className="text-left text-sm px-4 py-3 min-h-11 rounded-lg border border-border text-card-foreground hover:bg-muted transition-colors"
              >
                {t(key)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-card rounded-xl border border-border flex items-center gap-2 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("ai.inputPlaceholder")}
          className="flex-1 bg-transparent px-4 py-3 min-h-11 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="flex items-center gap-2 bg-muted text-card-foreground px-4 py-3 min-h-11 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity shrink-0">
          <Send className="h-4 w-4" />
          {t("ai.send")}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
