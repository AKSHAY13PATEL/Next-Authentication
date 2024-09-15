import { auth, signOut } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <>
      <div>DashboardPage</div>
      <div>{JSON.stringify(session)}</div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    </>
  );
};

export default DashboardPage;
