import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/health`).catch(() => {});
  }, []);

  return <AppRoutes />;
}
