// ============================================================
// App.tsx — Unique Stays USA
// ============================================================

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CustomCursor from "./components/CustomCursor";
import LoadingSplash from "./components/LoadingSplash";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import About from "./pages/About";
import Submit from "./pages/Submit";
import SpokePage from "./pages/SpokePage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unique">{() => <SpokePage slug="unique" />}</Route>
      <Route path="/work-friendly">{() => <SpokePage slug="work-friendly" />}</Route>
      <Route path="/pet-friendly">{() => <SpokePage slug="pet-friendly" />}</Route>
      <Route path="/rv-ready">{() => <SpokePage slug="rv-ready" />}</Route>
      <Route path="/ev-ready">{() => <SpokePage slug="ev-ready" />}</Route>
      <Route path="/directory" component={Directory} />
      <Route path="/about" component={About} />
      <Route path="/submit" component={Submit} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <LoadingSplash />
          <CustomCursor />
          <ScrollProgress />
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
