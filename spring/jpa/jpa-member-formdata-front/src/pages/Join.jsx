import { useState } from "react";
import toast from "react-hot-toast";

function Join() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [idMessage, setIdMessage] = useState("");
  const [idAvailable, setIdAvailable] = useState(false);

  const handleLoginId = async (e) => {
    const value = e.target.value;

    setLoginId(value);

    if (value.trim() === "") {
      setIdMessage("");
      setIdAvailable(false);

      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/members/check-loginid?loginId=${value}`,
      );
      const data = await response.json();

      if (data.available) {
        setIdMessage("사용 가능한 아이디입니다.");
        setIdAvailable(true);
      } else {
        setIdMessage("이미 사용 중인 아이디입니다.");
        setIdAvailable(false);
      }
    } catch (error) {
      console.error(error);

      setIdMessage("아이디 확인에 실패했습니다.");
      setIdAvailable(false);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!idAvailable) {
      toast.error("사용 가능한 아이디를 입력해주세요.");

      return;
    }

    const memberData = new FormData();

    memberData.append("loginId", loginId);
    memberData.append("password", password);
    memberData.append("name", name);
    memberData.append("email", email);

    if (profile) {
      memberData.append("profile", profile);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/members/form-data",
        {
          method: "POST",
          body: memberData,
        },
      );

      const result = await response.text();

      if (!response.ok) {
        toast.error("이미 사용 중인 아이디입니다.", {
          duration: 3000,
        });

        return;
      }
      toast.success("회원가입 성공!", {
        duration: 2000,

        style: {
          borderRadius: "12px",
          padding: "16px",
          fontWeight: "bold",
        },
      });

      setLoginId("");
      setPassword("");
      setName("");
      setEmail("");
      setProfile(null);
      setPreview(null);
      setIdMessage("");
      setIdAvailable(false);
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
            onChange={handleLoginId}
            placeholder="아이디를 입력하세요"
          />

          {idMessage && <p>{idMessage}</p>}
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

        <div>
          <label>프로필 이미지</label>

          <input type="file" accept="image/*" onChange={handleImage} />
        </div>

        {preview && (
          <div>
            <img src={preview} alt="미리보기" width="120" />
          </div>
        )}

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default Join;
