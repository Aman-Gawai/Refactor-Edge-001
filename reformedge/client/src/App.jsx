import AppRoutes from "./routes";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-gradient-bg">
      <Navbar />
      <AppRoutes />
    </div>
  );
}

export default App;
