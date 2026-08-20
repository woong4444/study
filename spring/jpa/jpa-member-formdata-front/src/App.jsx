import { Toaster } from "react-hot-toast";
import Join from "./pages/Join";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2500,

          style: {
            fontSize: "15px",
            padding: "14px 18px",
            borderRadius: "10px",
          },

          success: {
            duration: 2000,
          },

          error: {
            duration: 3000,
          },
        }}
      />

      <Join />
    </>
  );
}

export default App;
