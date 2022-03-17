import { FormControl, FormGroup, InputLabel, Input, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useState } from "react";
import {addMovie} from "../API/api"
import {useNavigate} from "react-router-dom"

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

const AddMovie = () => {
    const [movie, setMovie] = useState(initalValues)
    const { Title, Director, Genre, imdbRating, imdbVotes } = movie;
    const classes = useStyle();
    const navigate=useNavigate();

    const onValueChange = (e) => {

        setMovie({ ...movie, [e.target.name]: e.target.value })
    }

    const addMovieDetail=async()=>{
        await addMovie(movie)
        navigate('/')
    }

    return (

        <FormGroup className={classes.container}>
            <Typography variant="h3">Add Movie</Typography>
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
            <Button variant="contained" color="success" onClick={()=>{addMovieDetail()}}>
                Add Movie
            </Button>
        </FormGroup>
    )
}

export default AddMovie