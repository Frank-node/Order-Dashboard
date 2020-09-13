import React from 'react';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

function DetailTable({detailTableData}) {
    return (
        <div>
        <TableContainer className="order-table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>USER NAME</TableCell>
              <TableCell align="center">ORDER NO</TableCell>
              <TableCell align="center">ORDER DATE</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell align="center">QUANTITY</TableCell>
              <TableCell align="center">TOTAL AMOUNT</TableCell>
              <TableCell align="center">CITY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {detailTableData.map((row) => (
              <TableRow key={row.orderNum}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ textTransform: "capitalize" }}
                >
                  {row.userName}
                </TableCell>
                <TableCell align="center">{row.orderNum}</TableCell>
                <TableCell align="center">{row.createdDate}</TableCell>
                <TableCell
                  align="center"
                  style={{ textTransform: "capitalize" }}
                >
                  {row.status}
                </TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell
                  align="center"
                  style={{ textTransform: "capitalize" }}
                >
                  {row.region}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </div>
    )
}

export default DetailTable
