import React from "react";
import AllMovies from "./components/AllMovies"
import {
    Routes,
    Route,
} from "react-router-dom";
import AddMovies from "./components/AddMovie"
import EditMovie from "./components/EditMovie";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<AllMovies/>}></Route>
            <Route exact path="/add" element={<AddMovies/>}></Route>
            <Route exact path="/edit/:id" element={<EditMovie/>}></Route>
        </Routes>
    )
}

export default App