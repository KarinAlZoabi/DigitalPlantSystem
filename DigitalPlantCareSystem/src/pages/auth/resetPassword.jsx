//reset password
import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
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
  border: 1.5px solid ${(p) => (p.$err ? "#e53e3e" : "#e2e8f0")};
  font-size: 0.95rem;
  font-family: Poppins, sans-serif;
  box-sizing: border-box;
  outline: none;
  margin-bottom: 4px;
  &:focus {
    border-color: ${COLORS.primaryGreen};
  }
`;
const ErrText = styled.p`
  color: #e53e3e;
  font-size: 0.8rem;
  margin: 2px 0 12px;
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
  margin-top: 10px;
  &:hover {
    background: ${COLORS.primaryButtonHover};
  }
`;
const AlertBox = styled.div`
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.88rem;
  margin-bottom: 14px;
`;

export default function ResetPassword() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token") || "";
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword({ token, newPassword: form.password });
      navigate("/login");
    } catch (err) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Box>
        <LogoImg src={Logo} />
        <Title>Set new password</Title>
        <Sub>Choose a strong password for your account.</Sub>
        {apiError && <AlertBox>{apiError}</AlertBox>}
        <form onSubmit={handleSubmit}>
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="Min. 6 characters"
            value={form.password}
            $err={!!errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {errors.password && <ErrText>{errors.password}</ErrText>}
          <Label>Confirm Password</Label>
          <Input
            type="password"
            placeholder="Repeat password"
            value={form.confirm}
            $err={!!errors.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          />
          {errors.confirm && <ErrText>{errors.confirm}</ErrText>}
          <Btn type="submit" disabled={loading}>
            {loading ? "Saving…" : "Reset Password"}
          </Btn>
        </form>
      </Box>
    </Page>
  );
}
