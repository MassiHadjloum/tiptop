import { auth } from '@/auth';
import HeaderContainer from '@/components/HeaderContainer'
import ParticipationChart from '@/components/ParticipationChart';
import React from 'react'

const CourbeStats = async () => {
  const loggedIn = { firstName: "Massi" };
  const session = await auth()
  return (
    <section className="home">
    <div className="home-content">
      <header className="home-header">
        <HeaderContainer
          title="Statistiques"
          user={loggedIn.firstName || "Gest"}
          subtext="SVous pouvez suivre et consulter les informations clés sur le concours de gain."
        />
        {JSON.stringify(session)}
      </header>
      <ParticipationChart />
    </div>
  </section>
  )
}

export default CourbeStats
