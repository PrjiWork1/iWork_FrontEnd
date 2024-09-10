import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <div className="h-screen">
        <h1 className="bg-red-400 font-inter">Vite + React</h1>
      </div>
      <Footer />
    </div>
  );
}

export default App;
