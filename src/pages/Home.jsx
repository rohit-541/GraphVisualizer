import React from 'react'
import CreateGraph from '../components/CreateGrpah'
import GraphCanvas from '../components/GraphCanvas'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <>
        <CreateGraph/>
        <NavLink to={"/bfs"}><button>BFS</button></NavLink>
        <NavLink to={"/cycle"}><button>Cycle</button></NavLink>
        <NavLink to={"/dijstra"}><button>Cycle</button></NavLink>
        <GraphCanvas/>
    </>
  )
}

export default Home