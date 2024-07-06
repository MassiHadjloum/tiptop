import HeaderContainer from "@/components/HeaderContainer";
import RecentParticipations from "@/components/RecentParticipations";
import { mockParticipations } from "@/components/mockdataTable";

const TableStats = () => {
  const loggedIn = { firstName: "Massi" };


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

export default TableStats;
