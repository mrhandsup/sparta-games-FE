import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Router from "./share/Router";

import "./App.css";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="bg-gray-700">
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </div>
  );
}

export default App;
