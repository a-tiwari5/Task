import axios from "axios";


const url="http://localhost:3001/movies";

export const getMovies=async(id)=>{
    id = id || '';
    return await axios.get(`${url}/${id}`);
}

export const addMovie=async(movie)=>{
    console.log(movie)
    return await axios.post(url, movie)
}

export const editMovie=async(id,movie)=>{
    console.log(movie)
    return await axios.put(`${url}/${id}`, movie)
}

export const deleteMovie=async(id)=>{
    return await axios.delete(`${url}/${id}`);
}
