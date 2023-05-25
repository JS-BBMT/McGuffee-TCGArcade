import React, {useEffect, useState} from 'react';
import './style.css';
import PrizeCard from "../../Component/PrizeCard";
import {
  Table,
  TableBody,
  TableRow,
  TablePagination,
  Paper,
  TableContainer, TableHead, TableCell
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import pokemonimage from '../../assets/images/pokemonimage.svg';
const PrizesScreen = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [prizes, setPrizes] = useState([
    {
      name: "Prize Name",
      img: pokemonimage,
      date: new Date()
    }
  ]);

  useEffect(() => {

  }, [])

  const columns = [
    {
      id: "img",
      label: "Prize",
    },
    {
      id: "name",
      label: "Name",
    },
    {
      id: "date",
      label: "Date Won",
    }

  ]

  const classes = makeStyles({
    root: {
      width: "100%"
    },
    container: {
      maxHeight: 440
    }
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div className='prize-container'>
      <div className='standard-card-container'>
        <PrizeCard title="My Prizes">

        </PrizeCard>
      </div>
    </div>
  );
};

export default PrizesScreen;
