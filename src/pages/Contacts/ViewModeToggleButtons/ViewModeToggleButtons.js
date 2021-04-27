import React, { useCallback } from "react";
import ViewListIcon from "@material-ui/icons/ViewList";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { DATA_VIEW_MODE } from "../viewModesConstants";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) =>
  createStyles({
    toggleButtonGroup: {
      maxHeight: "40px",
    },
  })
);

export default function ViewModeToggleButtons({
  dataViewMode,
  setDataViewMode,
}) {
  const classes = useStyles();

  const handleDataViewMode = useCallback(
    (_, newDataViewMode) => {
      setDataViewMode(newDataViewMode);
    },
    [setDataViewMode]
  );

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={dataViewMode}
      exclusive
      onChange={handleDataViewMode}
      className={classes.toggleButtonGroup}
    >
      <ToggleButton
        value={DATA_VIEW_MODE.TABLE}
        aria-label={DATA_VIEW_MODE.TABLE}
      >
        <ViewListIcon />
      </ToggleButton>
      <ToggleButton
        value={DATA_VIEW_MODE.GRID}
        aria-label={DATA_VIEW_MODE.GRID}
      >
        <ViewModuleIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

ViewModeToggleButtons.propTypes = {
  dataViewMode: PropTypes.oneOf([DATA_VIEW_MODE.TABLE, DATA_VIEW_MODE.GRID])
    .isRequired,
  setDataViewMode: PropTypes.func.isRequired,
};
