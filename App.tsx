import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import QuotationInput from './components/QuotationInput';
import MaintenanceCalculator from './components/MaintenanceCalculator';
import AdminPanel from './components/AdminPanel';
import NotFound from './components/NotFound';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<QuotationInput />} />
            <Route path="maintenance" element={<MaintenanceCalculator />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
