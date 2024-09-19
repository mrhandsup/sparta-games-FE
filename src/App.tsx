import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./share/Router";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="relative min-w-fit min-h-full bg-gray-700">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
      <div className="absolute -bottom-48 mt-auto w-full bg-gray-700">
        <Footer />
      </div>
    </div>
  );
}

export default App;
