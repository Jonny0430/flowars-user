import { NextPage } from 'next'
import React from 'react'
import { withAgentLayout } from 'src/layouts/agentLayout'
import { AgentRevenuePageComponent } from 'src/page-component'





const Revenue: NextPage = () => {
  return <AgentRevenuePageComponent />
}

export default withAgentLayout(Revenue)


