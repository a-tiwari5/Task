import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TabelPagination from "@mui/material/TablePagination"
import TabelFooter from "@mui/material/TableFooter"
import { Button } from "@mui/material";
import { getMovies , deleteMovie} from "../API/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


//Components
import TableHeader from "./TableHead";

const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0;
}

const getComparator = (order, orderBy) => {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index])
    stabilizedRowArray.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    })
    return stabilizedRowArray.map((el) => el[0])
}



const AllMovies = () => {
    const [orderDirection, setOrderDirection] = useState('asc')
    const [valueToOrderBy, setValueToOrderBy] = useState('title')
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [numberOfRows, setNumberOfRows] = useState(5);
    const navigate=useNavigate();


    const handleRequestSort = (event, property) => {
        const isAscending = valueToOrderBy === property && orderDirection === "asc"
        setOrderDirection(isAscending ? 'desc' : 'asc')
        setValueToOrderBy(property)
    }

    const changePageHandler = (env, newPage) => {
        setPage(newPage)
    }

    const changeRowsPerPageHandler = (env) => {
        setNumberOfRows(parseInt(env.target.value, 10))
        setPage(0)
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * numberOfRows - data.length) : 0;

    useEffect(() => {
        const fetchData = async () => {
            const res = await getMovies();
            setData(res.data)
        }
        fetchData();
    }, [])

    const deleteMovieData=async(id)=>{
        await deleteMovie(id)
        const res= await getMovies();
        setData(res.data)
    }
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHeader
                    valueToOrderBy={valueToOrderBy}
                    orderDirection={orderDirection}
                    handleRequestSort={handleRequestSort}
                />
                <TableBody>
                    {
                        sortedRowInformation(data, getComparator(orderDirection, valueToOrderBy))
                            .slice(page * numberOfRows, page * numberOfRows + numberOfRows)
                            .map((row) => (
                                <TableRow
                                    key={row.Title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.Title}
                                    </TableCell>
                                    <TableCell align="right">{row.Director}</TableCell>
                                    <TableCell align="right">{row.Genre}</TableCell>
                                    <TableCell align="right">{row.imdbRating}</TableCell>
                                    <TableCell align="right">{row.imdbVotes}</TableCell>
                                    <TableCell><Button variant="contained" color="primary" component={Link} to={`/edit/${row.id}`}>Edit</Button></TableCell>
                                    <TableCell><Button variant="contained" color="error" onClick={()=>deleteMovieData(row.id)}>Delete</Button></TableCell>
                                </TableRow>
                            ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TabelFooter>
                <TableRow>
                    <TabelPagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={data.length}
                        rowsPerPage={numberOfRows}
                        page={page}
                        onPageChange={changePageHandler}
                        onRowsPerPageChange={changeRowsPerPageHandler}
                    />
                </TableRow>
            </TabelFooter>
        </TableContainer>
    )
}


export default AllMovies