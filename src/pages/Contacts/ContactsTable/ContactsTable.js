import { format } from "date-fns";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ContactsTable({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="contacts table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Full name</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell align="right">Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.login.uuid}>
              <TableCell>
                <Avatar
                  alt={`${item.name.title}. ${item.name.first} ${item.name.last}`}
                  src={item.picture.thumbnail}
                />
              </TableCell>
              <TableCell>{`${item.name.title}. ${item.name.first} ${item.name.last}`}</TableCell>
              <TableCell>
                <Typography>
                  {format(
                    new Date(item.dob.date),
                    "EEEE, MM/dd/yyyy, h:mm:ss aa"
                  )}
                </Typography>
                <Typography>{`${item.dob.age} years`}</Typography>
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{`/${item.location.country}/
              ${item.location.street.number} ${item.location.street.name}, ${item.location.city},
              ${item.location.state}, ${item.location.postcode}`}</TableCell>
              <TableCell align="right">{item.location.country}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
