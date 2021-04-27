// React imports
import React from "react";
// Custom hooks imports
import { useContacts } from "./useContacts";
import { useDataViewMode } from "./useDataViewMode";
// Components imports
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import ContactsTable from "./ContactsTable";
import ViewModeToggleButtons from "./ViewModeToggleButtons";
// Helpers imports
import { makeStyles, createStyles } from "@material-ui/core/styles";
// Constants imports
import { DATA_VIEW_MODE } from "./viewModesConstants";

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
  const [dataViewMode, setDataViewMode] = useDataViewMode();
  const contacts = useContacts();
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
              return <CircularProgress data-testid="contacts-loader" />;
            }

            if (contacts.isError) {
              return (
                <div data-testid="contacts-error">
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
