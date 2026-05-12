//forgot password
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";
import { api } from "../../api/api";

const Logo = "images/logo/Logo.svg";
const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;
const Box = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;
const LogoImg = styled.img`
  width: 130px;
  margin-bottom: 24px;
`;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLORS.primaryText};
  margin: 0 0 8px;
`;
const Sub = styled.p`
  color: ${COLORS.secondaryText};
  font-size: 0.9rem;
  margin: 0 0 24px;
`;
const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 6px;
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 10px;
  border: 1.5px solid #e2e8f0;
  font-size: 0.95rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  &:focus {
    border-color: ${COLORS.primaryGreen};
  }
`;
const Btn = styled.button`
  width: 100%;
  padding: 13px;
  border: none;
  border-radius: 10px;
  background: ${COLORS.primaryGreen};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  cursor: pointer;
  margin-top: 14px;
  &:hover {
    background: ${COLORS.primaryButtonHover};
  }
  &:disabled {
    background: ${COLORS.primaryButtonDisabled};
  }
`;
const Success = styled.div`
  background: #f0fdf4;
  border: 1px solid ${COLORS.healthyStroke};
  color: #276749;
  padding: 12px 14px;
  border-radius: 8px;
  font-size: 0.88rem;
`;
const BackLink = styled(Link)`
  color: ${COLORS.primaryGreen};
  text-decoration: none;
  font-size: 0.88rem;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 16px;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
  const res = await api.forgotPassword({ email });
  console.log("Forgot password response:", res);
  setSent(true);
} catch (err) {
  console.error("Forgot password error:", err);
  alert(err.message);
} finally {
  setLoading(false);
}
  };

  return (
    <Page>
      <Box>
        <LogoImg src={Logo} />
        <Title>Reset your password</Title>
        <Sub>Enter your email and we'll send you a reset link.</Sub>
        {sent ? (
          <Success>
            ✅ If an account exists for <strong>{email}</strong>, a reset link
            has been sent. Check your inbox.
          </Success>
        ) : (
          <form onSubmit={handleSubmit}>
            <Label>Email address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Btn type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send Reset Link"}
            </Btn>
          </form>
        )}
        <BackLink to="/login">
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            arrow_back
          </span>
          Back to Login
        </BackLink>
      </Box>
    </Page>
  );
}
