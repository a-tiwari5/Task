import { FormControl, FormGroup, InputLabel, Input, Button, Typography, collapseClasses } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import {editMovie, getMovies} from "../API/api"
import {useNavigate, useParams} from "react-router-dom"
import { useEffect } from "react";
import {Link} from "react-router-dom"


const useStyle = makeStyles({
    container: {
        width: '50%',
        margin: '10% 0 0 25%',
    },
    el: {
        margin: '10px'
    }

})

const initalValues = {
    Title: '',
    Director: '',
    Genre: '',
    imdbRating: '',
    imdbVotes: ''
}

const EditMovie = () => {
    const [movie, setMovie] = useState(initalValues)
    const {Title, Director, Genre, imdbRating, imdbVotes } = movie;
    const {id}=useParams();
    const classes = useStyle();
    const navigate=useNavigate();

    useEffect(()=>{
        loadMovieData();
    },[])

    const loadMovieData=async ()=>{
        const res=await getMovies(id);
        setMovie(res.data)
    }

    const onValueChange = (e) => {
        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const editMovieDetail=async()=>{
        await editMovie(id,movie)
        navigate('/')
    }

    return (

        <FormGroup className={classes.container}>
            <Typography variant="h3">Edit Movie</Typography>
            <FormControl>
                <InputLabel>Title</InputLabel>
                <Input className={classes.el} name="Title" onChange={(e) => onValueChange(e)} value={Title}/>
            </FormControl>
            <FormControl>
                <InputLabel>Director</InputLabel>
                <Input className={classes.el} name="Director" onChange={(e) => onValueChange(e)}  value={Director}/>
            </FormControl>
            <FormControl>
                <InputLabel>Genre</InputLabel>
                <Input className={classes.el} name="Genre" onChange={(e) => onValueChange(e)} value={Genre}/>
            </FormControl>
            <FormControl>
                <InputLabel>IMDBRatings</InputLabel>
                <Input className={classes.el} name="imdbRating" onChange={(e) => onValueChange(e)} value={imdbRating}/>
            </FormControl>
            <FormControl>
                <InputLabel>IMDBVotes</InputLabel>
                <Input className={classes.el} name="imdbVotes" onChange={(e) => onValueChange(e)} value={imdbVotes}/>
            </FormControl>
            <Button variant="contained" color="success" component={Link}  to="/" onClick={()=>{editMovieDetail()}}>
                Edit Movie
            </Button>
        </FormGroup>
    )
}

export default EditMovie