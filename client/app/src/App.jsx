import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Article from "./pages/Article";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {/* <CreateArticle /> */}
      <Article />
    </QueryClientProvider>
  );
}

export default App;
