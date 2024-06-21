import CardWrapper from "@/components/auth/card-wrapper";

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
