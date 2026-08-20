import { useState } from "react";
import toast from "react-hot-toast";

function LoginResponse() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [member, setMember] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      loginId: loginId,
      password: password,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/members/login-response",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        },
      );
      if (!response.ok) {
        toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        return;
      }
      const result = await response.json();

      console.log(result);

      setMember(result);

      toast.success(`${result.name}님 로그인 성공`);

      setLoginId("");
      setPassword("");
    } catch (error) {
      console.error(error);

      toast.error("서버 연결에 실패했습니다.");
    }
  };
  return (
    <div>
      <h1>로그인 + 회원정보</h1>

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

      {member && (
        <div>
          <h2>로그인 회원 정보</h2>

          <p>회원번호: {member.id}</p>
          <p>아이디: {member.loginId}</p>
          <p>이름: {member.name}</p>
          <p>이메일: {member.email}</p>
          <p>프로필 이미지: {member.profileImage}</p>

          {member.profileImage && (
            <div>
              <img
                src={`http://localhost:8080/upload/${member.profileImage}`}
                alt="프로필"
                width="150"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default LoginResponse;
