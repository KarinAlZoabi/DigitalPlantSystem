//signup page
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import * as S from "../../styles/signupStyles"; // Importing as a namespace 'S'

const Logo = "images/logo/Logo.svg";
const HeroImg = "images/scott-webb-hDyO6rr3kqk-unsplash.jpg";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // --- STATE MANAGEMENT ---
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- VALIDATION HELPER ---
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
    
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    
    // Checks if the re-typed password matches the original
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    return e;
  };

  // Reusable change handler that clears errors as you type
  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value });
    setErrors({ ...errors, [k]: "" });
  };

  // --- SUBMISSION ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // Calls registration endpoint
      const data = await api.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // Automatically log the user in with the returned token
      login(data.token, data.user);
      
      // Redirect based on role
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      // Handles server errors like "Email already exists"
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      {/* Visual Quote Side (Desktop Only) */}
      <S.Left $bg={HeroImg}>
        <S.LeftQuote>
          Join thousands of plant lovers keeping their{" "}
          <span>green friends</span> happy and healthy.
        </S.LeftQuote>
      </S.Left>

      {/* Signup Form Side */}
      <S.Right>
        <S.FormBox>
          <S.LogoImg src={Logo} alt="PlantCare" />
          <S.Title>Create an account</S.Title>
          <S.Sub>Start your plant care journey today</S.Sub>

          {apiError && <S.AlertBox>{apiError}</S.AlertBox>}

          <form onSubmit={handleSubmit} noValidate>
            <S.FieldWrap>
              <S.Label>Full Name</S.Label>
              <S.Input
                placeholder="Jane Smith"
                value={form.name}
                $err={!!errors.name}
                onChange={set("name")}
              />
              {errors.name && <S.ErrText>{errors.name}</S.ErrText>}
            </S.FieldWrap>

            <S.FieldWrap>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                $err={!!errors.email}
                onChange={set("email")}
              />
              {errors.email && <S.ErrText>{errors.email}</S.ErrText>}
            </S.FieldWrap>

            <S.FieldWrap>
              <S.Label>Password</S.Label>
              <S.Input
                type="password"
                placeholder="Min. 6 characters"
                value={form.password}
                $err={!!errors.password}
                onChange={set("password")}
              />
              {errors.password && <S.ErrText>{errors.password}</S.ErrText>}
            </S.FieldWrap>

            <S.FieldWrap>
              <S.Label>Confirm Password</S.Label>
              <S.Input
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                $err={!!errors.confirm}
                onChange={set("confirm")}
              />
              {errors.confirm && <S.ErrText>{errors.confirm}</S.ErrText>}
            </S.FieldWrap>

            <S.Btn type="submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </S.Btn>
          </form>

          <S.BottomText>
            Already have an account? <Link to="/login">Sign in</Link>
          </S.BottomText>
        </S.FormBox>
      </S.Right>
    </S.Page>
  );
}