import HeaderContainer from "@/components/HeaderContainer";
import RecentParticipations from "@/components/RecentParticipations";
import { mockParticipations } from "@/components/mockdataTable";
// import { useSession } from "next-auth/react";
// import { redirect } from "next/navigation";
// import { useEffect } from "react";

const Home = () => {
  const loggedIn = { firstName: "Massi" };
  // const { data: session } = useSession();

  // useEffect(() => {
  //   if (!session) {
  //     redirect("/sign-in");
  //   }
  // }, [session]);
  return (
    <section className="home">
      {/* {session && ( */}
        <div className="home-content">
          <header className="home-header">
            <HeaderContainer
              title="Welcome"
              user={loggedIn.firstName || "Gest"}
              subtext="Some text fo the tip top"
            />
          </header>
          <RecentParticipations page={1} participations={mockParticipations} />
        </div>
      {/* )} */}
    </section>
  );
};

export default Home;
