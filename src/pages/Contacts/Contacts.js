import React, { useState, useEffect } from "react";
import { useContacts } from "./useContacts";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ContactsTable from "./ContactsTable";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import ViewModeToggleButtons from "./ViewModeToggleButtons";
import { DATA_VIEW_MODE } from "./viewModesConstants";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headerContainer: {
      marginBottom: theme.spacing(3),
    },
    toggleButtonGroup: {
      maxHeight: "40px",
    },
  })
);

export default function Contacts() {
  const savedDataViewMode =
    localStorage.getItem("dataViewMode") || DATA_VIEW_MODE.TABLE;
  const [dataViewMode, setDataViewMode] = useState(savedDataViewMode);

  const contacts = useContacts();

  useEffect(() => {
    localStorage.setItem("dataViewMode", dataViewMode);
  }, [dataViewMode]);

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid container>
        <Grid item xs={12} className={classes.headerContainer}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <Typography variant="h3" component="h1" gutterBottom>
              Contacts
            </Typography>
            <ViewModeToggleButtons
              dataViewMode={dataViewMode}
              setDataViewMode={setDataViewMode}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          {(() => {
            if (contacts.isLoading) {
              return <CircularProgress />;
            }

            if (contacts.isError) {
              return (
                <div>
                  <p>...Error...</p>
                </div>
              );
            }
            if (dataViewMode === DATA_VIEW_MODE.TABLE) {
              return <ContactsTable data={contacts.data} />;
            }
            if (dataViewMode === DATA_VIEW_MODE.GRID) {
              return (
                <div>
                  <p>...Grid...</p>
                </div>
              );
            }
            return null;
          })()}
        </Grid>
      </Grid>
    </Container>
  );
}
