import { useState } from "react";
import { Toaster } from "react-hot-toast";

import Join from "./pages/Join";
import Login from "./pages/Login";
import LoginResponse from "./pages/LoginResponse";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      <Toaster position="top-center" />

      <div>
        <button
          onClick={() => {
            setPage("login");
          }}
        >
          로그인
        </button>

        <button
          onClick={() => {
            setPage("join");
          }}
        >
          회원가입
        </button>

        <button
          onClick={() => {
            setPage("loginResponse");
          }}
        >
          회원정보 로그인
        </button>
      </div>
      {page === "login" && <Login />}

      {page === "join" && <Join />}

      {page === "loginResponse" && <LoginResponse />}
    </>
  );
}

export default App;
