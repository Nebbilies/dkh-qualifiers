import { useState } from 'react'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import VNOC6 from "./pages/VNOC6.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />}/>
                <Route path={'/vnoc6'} element={<VNOC6 />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
