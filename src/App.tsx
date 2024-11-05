import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { UserProvider } from "@context/UserContext";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <UserProvider>
        <Header />
      </UserProvider>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
