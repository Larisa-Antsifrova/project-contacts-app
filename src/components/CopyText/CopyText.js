// React imports
import React, { useState, useCallback } from "react";
// Components imports
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
// Helpers imports
import PropTypes from "prop-types";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useCopyToClipboard } from "react-use";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

// Styles configuration
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      cursor: "pointer",
      textTransform: "lowercase",
      display: "flex",
      alignItems: "center",
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  })
);

// Declaring constants to manage Tooltip text
const COPY_STATUS = {
  COPY: "copy",
  COPIED: "copied",
};

const TITLE_BY_COPY_STATUS = {
  [COPY_STATUS.COPY]: "Copy",
  [COPY_STATUS.COPIED]: "Copied",
};

export default function CopyText({ text }) {
  const classes = useStyles();

  const [, copyToClipboard] = useCopyToClipboard();
  const [statusCopy, setStatusCopy] = useState(COPY_STATUS.COPY);

  const onClickCopy = useCallback(() => {
    copyToClipboard(text);
    setStatusCopy(COPY_STATUS.COPIED);
  }, [copyToClipboard, text]);

  const onClickAwayCopy = useCallback(() => {
    setStatusCopy(COPY_STATUS.COPY);
  }, []);

  return (
    <ClickAwayListener onClickAway={onClickAwayCopy}>
      <Tooltip title={TITLE_BY_COPY_STATUS[statusCopy]} placement="top" arrow>
        <Button className={classes.root} onClick={onClickCopy}>
          <FileCopyOutlinedIcon className={classes.icon} fontSize="small" />
          {text}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
}

CopyText.propTypes = {
  text: PropTypes.string.isRequired,
};
