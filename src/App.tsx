import { Outlet } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

function App() {
  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
    </div>
  );
}

export default App;
