import ErrorBoundary from './components/ErrorBoundary';
import OrderHistory from './components/OrderHistory';


function App() {
  return (
    <ErrorBoundary>
      <OrderHistory />
    </ErrorBoundary>
  );
}

export default App;
