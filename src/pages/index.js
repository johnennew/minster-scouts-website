import React from 'react'

const logo = require('../../public/images/scout-logo-small.png');

export default () => (
  <div>
    <img alt='logo' style={{ width: 200, display: 'inline' }} src={String(logo)} />
    <h1>1st Minster Scouts</h1>
    <p>Welcome to the website for the 1st Minster Scout Group.  We're located in the village of Minster on the Isle of Thanet in East Kent.</p>
    <p>We have sections for Beavers, Cubs and Scouts.</p>
    <p>If your child would like to join the group, then please contact ...</p>
  </div>
)
