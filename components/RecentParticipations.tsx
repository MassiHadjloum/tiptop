import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ParticipationTable from "./ParticipationTable";
import { mockParticipations } from "./mockdataTable";

const RecentParticipations = ({
  page = 1,
  participations = [],
}: RecentParticipationsProps) => {
  return (
    <section className="recent-participations">
      <header className="flex items-center justify-between">
        <h2 className="recent-participations-label">Recent participation</h2>
        <Link href={`/participation-history/?id=${2}`} className="view-all-btn">
          View all
        </Link>
      </header>
      <Tabs defaultValue={"2"} className="w-full">
        <TabsList className="recent-participations-tablist">
          <TabsTrigger value="account">Account</TabsTrigger>
          
        </TabsList>
        <TabsContent value="account">
          <ParticipationTable participations={participations} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default RecentParticipations;
