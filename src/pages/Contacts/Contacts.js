import React from "react";
import { useContacts } from "./useContacts";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContactsTable from "./ContactsTable";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headerContainer: {
      marginBottom: theme.spacing(3),
    },
  })
);

export default function Contacts() {
  const contacts = useContacts();
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headerContainer}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contacts
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return (
                <div>
                  <p>...Loading...</p>
                </div>
              );
            }

            if (contacts.isError) {
              return (
                <div>
                  <p>...Error...</p>
                </div>
              );
            }

            return <ContactsTable data={contacts.data} />;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
}
