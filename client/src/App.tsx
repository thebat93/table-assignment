import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ServerPagination } from "./pages/ServerPagination";

import "./App.css";
import { ClientPagination } from "./pages/ClientPagination";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <div style={{ display: "flex", gap: "8px" }}>
        <Link to="/server-pagination">Server pagination</Link>
        <Link to="/client-pagination">Client pagination</Link>
      </div>
      <Routes>
        <Route path="/server-pagination" element={<ServerPagination />} />
        <Route path="/client-pagination" element={<ClientPagination />} />
      </Routes>
    </Router>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
