//login page
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../../api/api";
import { useAuth } from "../../context/AuthContext";
import * as S from "../../styles/loginStyles";
import GoogleAuthButton from "../../components/GoogleAuthButton";

const Logo = "images/logo/Logo.svg";
const HeroImg = "images/scott-webb-hDyO6rr3kqk-unsplash.jpg";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Global auth context method

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- VALIDATION LOGIC ---
  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email format";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  // --- SUBMISSION ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation check
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      const data = await api.login(form);

      // Store token and user details in Context/LocalStorage
      login(data.token, data.user);

      // Role-based routing: Admins go to panel, Users go to dashboard
      navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      // Catch backend errors (Wrong password, user not found, etc.)
      setApiError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Page>
      {/* Only visible on large screens */}
      <S.Left $bg={HeroImg}>
        <S.LeftQuote>
          Your personal <span>plant care</span> assistant — never forget to
          water again.
        </S.LeftQuote>
      </S.Left>

      <S.Right>
        <S.FormBox>
          <S.LogoImg src={Logo} alt="PlantCare" />
          <S.Title>Welcome back</S.Title>
          <S.Sub>Sign in to your plant care dashboard</S.Sub>

          {/* Global API Error message */}
          {apiError && <S.AlertBox>{apiError}</S.AlertBox>}

          <form onSubmit={handleSubmit} noValidate>
            {/* EMAIL FIELD */}
            <S.FieldWrap>
              <S.Label>Email</S.Label>
              <S.Input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                $err={!!errors.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setErrors({ ...errors, email: "" }); // Clear error on type
                }}
              />
              {errors.email && <S.ErrText>{errors.email}</S.ErrText>}
            </S.FieldWrap>

            {/* PASSWORD FIELD */}
            <S.FieldWrap>
              <S.Label>Password</S.Label>
              <S.PasswordWrap>
                <S.Input
                  type={showPassword ? "text" : "password"}
                  placeholder="******"
                  value={form.password}
                  $err={errors.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                />

                <S.EyeButton
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </S.EyeButton>
              </S.PasswordWrap>
              {errors.password && <S.ErrText>{errors.password}</S.ErrText>}
            </S.FieldWrap>

            <S.ForgotLink>
              <Link to="/forgot-password">Forgot password?</Link>
            </S.ForgotLink>

            <S.Btn type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </S.Btn>
           <div style={{ marginTop: "16px" }}>
  <GoogleAuthButton setApiError={setApiError} />
</div>
          </form>

          <S.BottomText>
            Don't have an account? <Link to="/signup">Sign up free</Link>
          </S.BottomText>
        </S.FormBox>
      </S.Right>
    </S.Page>
  );
}
