import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function GoogleAuthButton({ setApiError }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <GoogleLogin
      text="continue_with"
      shape="pill"
      width="100%"
      onSuccess={async (credentialResponse) => {
        try {
          const data = await api.googleAuth(credentialResponse.credential);

          login(data.token, data.user);

          navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
          setApiError?.(error.message || "Google sign-in failed");
        }
      }}
      onError={() => {
        setApiError?.("Google sign-in failed");
      }}
    />
  );
}