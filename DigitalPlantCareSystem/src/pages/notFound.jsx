import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { COLORS } from "../styles/colors";

export default function NotFound() {
  const { user } = useAuth();

  const homePath = user
    ? user.role === "admin"
      ? "/admin"
      : "/dashboard"
    : "/login";

  const buttonText = user
    ? user.role === "admin"
      ? "Back to Admin Dashboard"
      : "Back to Dashboard"
    : "Go to Login";

  return (
    <Page>
      <Card>
        <Code>404</Code>
        <Title>Page not found</Title>
        <Text>
          The page you are looking for does not exist or may have been moved.
        </Text>

        <ButtonRow>
          <PrimaryButton to={homePath}>{buttonText}</PrimaryButton>
          <SecondaryButton to="/">Go to Home</SecondaryButton>
        </ButtonRow>
      </Card>
    </Page>
  );
}

const Page = styled.div`
  min-height: 100vh;
  background: ${COLORS.backgroundGreen};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: #ffffff;
  border-radius: 24px;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
`;

const Code = styled.div`
  font-size: 5rem;
  font-weight: 800;
  color: #2f6b4f;
  line-height: 1;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1f2937;
  margin: 0 0 0.75rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 auto 2rem;
  max-width: 380px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  background: #2f6b4f;
  color: #ffffff;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background: #25563f;
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled(Link)`
  background: #eef5ef;
  color: #2f6b4f;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background: #dceade;
    transform: translateY(-1px);
  }
`;