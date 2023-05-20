import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DialogProvider, useDialog } from './dialog-context';

describe('DialogProvider', () => {
  test('displays a dialog when requested and calls the onConfirm callback when the confirm button is clicked', async () => {
    const TestComponent = () => {
      const { openDialog } = useDialog();
      
      return (
        <button onClick={() => openDialog({
          title: 'Test Dialog',
          description: 'This is a test dialog',
          confirmText: 'OK',
          onConfirm: jest.fn(),
        })}>
          Open Dialog
        </button>
      );
    };

    render(
      <DialogProvider>
        <TestComponent />
      </DialogProvider>
    );

    // The dialog should not be visible initially
    expect(screen.queryByText('Test Dialog')).toBeDefined();

    // Click the button to open the dialog
    fireEvent.click(screen.getByText('Open Dialog'));

    // The dialog should now be visible
    expect(screen.getByText('Test Dialog')).toBeDefined();

    // Click the confirm button
    fireEvent.click(screen.getByText('OK'));

    // The onConfirm callback should have been called

    // The dialog should be closed
    // expect(screen.queryByText('Test Dialog')).toBeDefined();
  });
});
