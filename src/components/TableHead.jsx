import React from "react";
import { TableHead, TableCell, TableRow } from "@mui/material";
import TabelSortLabel from "@mui/material/TableSortLabel"


const TableHeader = ({valueToOrderBy, orderDirection,handleRequestSort}) => {
    const createSortHandler=(property)=>(event)=>{
        handleRequestSort(event, property)
    }
    return (
        <TableHead>
            <TableRow selected={true}>
                <TableCell>
                    <TabelSortLabel
                        active={valueToOrderBy === "title"}
                        direction={valueToOrderBy === "title" ? orderDirection : 'asc'}
                        onClick={createSortHandler("title")}
                        >
                        Movies
                    </TabelSortLabel>
                </TableCell>
                <TableCell align="right">Director</TableCell>
                <TableCell align="right">Genre</TableCell>
                <TableCell align="right">
                    <TabelSortLabel
                        active={valueToOrderBy === "rating"}
                        direction={valueToOrderBy === "rating" ? orderDirection : 'asc'}
                        onClick={createSortHandler("rating")}
                    >
                        IMDB Rating
                    </TabelSortLabel>
                </TableCell>
                <TableCell align="right">IMDB Votes</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
        </TableHead>
    )
}

export default TableHeader