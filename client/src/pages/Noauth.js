import React from 'react'
import DLayout from '../components/DLayout'
import '../styles/noauth.css'

function Noauth() {
  return (
    <DLayout>
      <div class="display-middle">
        <h1 class="jumbo animate-top center">ACCESS DENIED</h1>
          <h3>You dont have permission to view this site.</h3>
          <h6>error code:403 forbidden</h6>
      </div>
    </DLayout>
  )
}

export default Noauth