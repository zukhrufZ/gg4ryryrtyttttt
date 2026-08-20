import { type ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { SiteShell } from '@/components/site-shell';
import { AboutPage, CategoryPage, DisclosurePage, HomePage, NotFoundPage, PostPage, ShopPage } from '@/pages/curated-pages';
import { AdminPage } from '@/pages/admin-page';
import { applySiteTheme } from '@/data/content';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  if (location.startsWith('/admin')) {
    return <RoutedErrorBoundary><AdminPage /></RoutedErrorBoundary>;
  }
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <SiteShell>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/category/:slug" component={CategoryPage} />
          <Route path="/post/:slug" component={PostPage} />
          <Route path="/shop/" component={ShopPage} />
          <Route path="/about/" component={AboutPage} />
          <Route path="/affiliate-disclosure/" component={DisclosurePage} />
          <Route component={NotFoundPage} />
        </Switch>
      </SiteShell>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  useEffect(() => { applySiteTheme(); }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
