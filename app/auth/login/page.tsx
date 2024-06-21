import CardWrapper from "@/components/auth/CardWrapper";

const LoginPage = () => {
  return (
    <div>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account"
        backButtonHref="/auth/register"
        showSocial
      >
        Login form
      </CardWrapper>
    </div>
  );
};

export default LoginPage;
