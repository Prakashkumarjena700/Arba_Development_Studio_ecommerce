import React, { useEffect, useState } from 'react'
import TermsAndCondition from '../components/TermsAndCondition'
import Carousel from '../components/Carousel'

export default function Home() {

  return (
    <div>
      <TermsAndCondition />
      <Carousel />
      <br />
      <h2>Home page</h2>
    </div>
  )
}
