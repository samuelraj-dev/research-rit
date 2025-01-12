import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <Router>
          <App />
      </Router>
    </QueryClientProvider>
)
