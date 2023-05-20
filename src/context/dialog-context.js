import { createContext, useContext, useState, useRef } from 'react';

import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';


const DialogContext = createContext();

const DialogProvider = ({ children }) => {
  const [dialogs, setDialogs] = useState([]);

  const openDialog = (props) => {
    const dialog = { ...props, open: true };

    setDialogs((dialogs) => [...dialogs, dialog]);
  };

  const closeDialog = () => {
    setDialogs((dialogs) => {
      const latestDialog = dialogs.pop();

      if (!latestDialog) return dialogs;
      if (latestDialog.onClose) latestDialog.onClose();

      return [...dialogs].concat({ ...latestDialog, open: false });
    });
  };

  const contextValue = useRef({ openDialog, closeDialog });

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map(
        (
          {
            open,
            title,
            description,
            confirmText,
            onConfirm,
            color = 'primary',
          },
          i
        ) => (
          <Dialog
            key={`${i}-${title}`}
            open={open}
            onClose={closeDialog}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
          >
            <DialogTitle id="dialog-title">{title}</DialogTitle>

            <DialogContent>
              <DialogContentText id="dialog-description">
                {description}
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={closeDialog} color={color}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  closeDialog();
                  onConfirm();
                }}
                color={color}
                variant="contained"
                autoFocus
              >
                {confirmText}
              </Button>
            </DialogActions>
          </Dialog>
        )
      )}
    </DialogContext.Provider>
  );
};

function useDialog() {
  const context = useContext(DialogContext);

  if (context === undefined) {
    throw new Error('useDialog must be used within DialogProvider');
  }

  return context;
}

export { DialogProvider, useDialog };
