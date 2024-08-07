import React from "react";
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from "react-query";
import CreateArticle from "./components/CreateArticle";
import Article from "./components/Article";

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
