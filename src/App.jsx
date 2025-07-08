import { Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BFS from "./CodeRunners/BFS"
import CycleDetection from "./CodeRunners/CycleDetection"
import Dijkstra from "./CodeRunners/Dijstra"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/bfs" element={<BFS/>}/>
        <Route path="/dijstra" element={<Dijkstra/>}/>
      </Routes>
    </>
  )
}

export default App
