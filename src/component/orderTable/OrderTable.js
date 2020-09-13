import React from 'react';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function OrderTable({orderTableData}) {
  //let temp2 = [...temp]
  //  console.log('pop', props)
    return (
        <div>
        <TableContainer className="order-table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ORDER NO</TableCell>
              <TableCell align="center">TOTAL AMOUNT</TableCell>
              <TableCell align="center">TOTAL QUANTITY</TableCell>
              <TableCell align="center">USER NAME</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderTableData.map((row) => (
              <TableRow key={row.orderNum}>
                <TableCell component="th" scope="row">
                  {row.orderNum}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell
                  align="center"
                  style={{ textTransform: "capitalize" }}
                >
                  {row.userName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    )
}

export default OrderTable;
