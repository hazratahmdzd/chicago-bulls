import { TeamBanner, TeamMembers } from '../components'
import { AnimatedPage } from '../AnimatedPage'

const Team = () => {
  return (
    <>
      <AnimatedPage>
        <TeamBanner />
        <TeamMembers />
      </AnimatedPage>
    </>
  )
}

export default Team