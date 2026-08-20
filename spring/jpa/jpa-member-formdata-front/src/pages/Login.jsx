import { useState } from "react";
import toast from "react-hot-toast";

function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      loginId: loginId,
      password: password,
    };
    try {
      const response = await fetch("http://localhost:8080/api/members/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const result = await response.text();

      if (!response.ok) {
        toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }
      toast.success(result);

      setLoginId("");
      setPassword("");
    } catch (error) {
      console.error(error);

      toast.error("서버 연결에 실패했습니다.");
    }
  };
  return (
    <div>
      <h1>로그인</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>

          <input
            type="text"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
            }}
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div>
          <label>비밀번호</label>

          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}
export default Login;
