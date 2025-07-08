import { Route, Router, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BFS from "./CodeRunners/BFS"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/bfs" element={<BFS/>}/>
      </Routes>
    </>
  )
}

export default App
