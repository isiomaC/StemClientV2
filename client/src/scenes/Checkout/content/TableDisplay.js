import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import approximatePrice from '../../../utils/approximatePrice'

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
  },
  root: {
      marginTop: '10px'
  }
});

const  TableDisplay = ({rows}) => {
  const classes = useStyles();

  return (
    <TableContainer className={classes.root} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Quantity</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Price&nbsp;(€)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>
                {row.quantity}x
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{approximatePrice(row.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableDisplay