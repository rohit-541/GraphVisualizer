import React from 'react'
import CreateGraph from '../components/CreateGrpah'
import GraphCanvas from '../components/GraphCanvas'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <>
        <CreateGraph/>
        <NavLink to={"/bfs"}><button>BFS</button></NavLink>
        <GraphCanvas/>
    </>
  )
}

export default Home