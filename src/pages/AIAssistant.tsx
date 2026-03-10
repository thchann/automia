import { Sparkles, Send } from "lucide-react";
import { useState } from "react";

const suggestedQuestions = [
  "How many leads did I get this week?",
  "Which cars are most popular?",
  "Show me uncontacted leads",
  "What's my conversion rate?",
];

const AIAssistant = () => {
  const [input, setInput] = useState("");

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center gap-2 mb-1">
        <Sparkles className="h-7 w-7 text-[hsl(var(--metric-purple))]" />
        <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
      </div>
      <p className="text-muted-foreground mb-6">Ask questions about your cars, leads, and sales.</p>

      <div className="flex-1 bg-card rounded-xl border border-border p-6 flex flex-col">
        <div className="flex-1">
          <div className="bg-muted rounded-lg p-4 max-w-2xl">
            <p className="text-sm text-card-foreground">
              Hi! I'm your AI assistant. I can help you with questions about your cars, leads, and sales data. What would you like to know?
            </p>
            <p className="text-xs text-muted-foreground mt-2">10:30 AM</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Suggested Questions</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-left text-sm px-4 py-3 rounded-lg border border-border text-card-foreground hover:bg-muted transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-card rounded-xl border border-border flex items-center p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="flex items-center gap-2 bg-muted text-card-foreground px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 transition-opacity">
          <Send className="h-4 w-4" />
          Send
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;
