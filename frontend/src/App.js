import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="App bg-background text-foreground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" richColors />
    </div>
  );
}

export default App;
