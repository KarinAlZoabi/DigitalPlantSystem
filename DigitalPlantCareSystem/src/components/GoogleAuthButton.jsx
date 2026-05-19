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
          if (!credentialResponse.credential) {
            throw new Error("No Google credential returned.");
          }

          const data = await api.googleAuth(credentialResponse.credential);

          if (!data?.token || !data?.user) {
            throw new Error("Invalid response from server.");
          }

          login(data.token, data.user);

          navigate(data.user.role === "admin" ? "/admin" : "/dashboard");
        } catch (error) {
          console.error("Google sign-in frontend error:", error);
          setApiError?.(error.message || "Google sign-in failed");
        }
      }}
      onError={() => {
        setApiError?.("Google sign-in failed");
      }}
    />
  );
}