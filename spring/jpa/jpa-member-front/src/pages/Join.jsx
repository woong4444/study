import { useState } from "react";

function Join() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const memberData = {
      loginId: loginId,
      password: password,
      name: name,
      email: email,
    };

    console.log(memberData);

    try {
      const response = await fetch("http://localhost:8080/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(memberData),
      });

      const result = await response.text();

      if (!response.ok) {
        alert("회원가입 실패: " + result);
        return;
      }

      alert(result);

      setLoginId("");
      setPassword("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error(error);
      alert("서버 연결에 실패했습니다.");
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
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

        <div>
          <label>이름</label>

          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label>이메일</label>

          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="이메일을 입력하세요"
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
export default Join;
