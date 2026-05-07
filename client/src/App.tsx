// ============================================================
// App.tsx — Unique Stays USA
// Design: Wanderer's Postcard Collection
// Hub & Spoke Routes:
//   / → Hub homepage
//   /unique → Unique stays spoke
//   /work-friendly → Work-friendly spoke
//   /pet-friendly → Pet-friendly spoke
//   /rv-ready → RV-ready spoke
//   /ev-ready → EV-ready spoke
//   /directory → Full directory
//   /about → About
//   /submit → Submit a Stay
// ============================================================

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Directory from "./pages/Directory";
import About from "./pages/About";
import Submit from "./pages/Submit";
import SpokePage from "./pages/SpokePage";
import DesignSystem from "./pages/DesignSystem";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Hub & Spoke routes */}
      <Route path="/unique">{() => <SpokePage slug="unique" />}</Route>
      <Route path="/work-friendly">{() => <SpokePage slug="work-friendly" />}</Route>
      <Route path="/pet-friendly">{() => <SpokePage slug="pet-friendly" />}</Route>
      <Route path="/rv-ready">{() => <SpokePage slug="rv-ready" />}</Route>
      <Route path="/ev-ready">{() => <SpokePage slug="ev-ready" />}</Route>
      {/* Other pages */}
      <Route path="/directory" component={Directory} />
      <Route path="/about" component={About} />
      <Route path="/submit" component={Submit} />
      <Route path="/design-system" component={DesignSystem} />
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
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
