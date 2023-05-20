import * as React from 'react';
import { render, fireEvent,waitFor } from '@testing-library/react';
import { IconButton } from '@material-ui/core';
import {
  CheckBox as CompletedCheckmarkIcon,
  CheckBoxOutlineBlank as EmptyCheckmarkIcon,
  IndeterminateCheckBox as FailedCheckmarkIcon,
} from '@material-ui/icons';
import { useUpdateCheckmarkInDbMutate } from 'api/checkmarks';
import { COMPLETED, EMPTY, FAILED } from 'data/constants';
import { debounce } from 'lodash';

const variants = {
  completed: {
    icon: <CompletedCheckmarkIcon />,
    label: 'completed',
    color: 'primary',
  },
  failed: {
    icon: <FailedCheckmarkIcon />,
    label: 'failed',
    color: 'secondary',
  },
  empty: {
    icon: <EmptyCheckmarkIcon />,
    label: 'empty',
    color: 'default',
  },
};

function Checkmark({ id, initialValue, habitId, date, disabled }) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const updateCheckmarkInDbMutate = useUpdateCheckmarkInDbMutate();

  // Debounced update function
  const debouncedUpdate = React.useRef(
    debounce(({ id, newValue }) => {
      updateCheckmarkInDbMutate({
        checkmarkId: id,
        value: newValue,
        habitId,
        date,
      });
    }, 200)
  ).current;

  // Handles clicking on checkmark
  const handleClick = () => {
    const newValue = getNewValue(value);

    // Update the value locally, so that the icon changes
    setValue(newValue);
    // Update is debounced so when user is clicking very fast on the checkmark
    // only the last call will be invoked to hit the database.
    debouncedUpdate({ id, newValue });
  };

  const { icon, label, color } = variants[value];

  return (
    <IconButton
      aria-label={label}
      color={color}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
    </IconButton>
  );
}

function getNewValue(currentValue) {
  const values = [COMPLETED, FAILED, EMPTY];

  return values[(values.indexOf(currentValue) + 1) % values.length];
}

describe('Checkmark', () => {
  const mockUpdateCheckmarkInDbMutate = jest.fn();

  beforeEach(() => {
    mockUpdateCheckmarkInDbMutate.mockClear();
    jest.spyOn(require('api/checkmarks'), 'useUpdateCheckmarkInDbMutate').mockReturnValue(mockUpdateCheckmarkInDbMutate);
  });

  it('renders the completed checkmark correctly', () => {
    const { container } = render(<Checkmark id="checkmark-id" initialValue="completed" habitId="habit-id" date="2022-01-01" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the failed checkmark correctly', () => {
    const { container } = render(<Checkmark id="checkmark-id" initialValue="failed" habitId="habit-id" date="2022-01-01" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders the empty checkmark correctly', () => {
    const { container } = render(<Checkmark id="checkmark-id" initialValue="empty" habitId="habit-id" date="2022-01-01" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('updates the value when clicked', () => {
    const { getByRole } = render(
    <Checkmark id="checkmark-id" initialValue="completed" habitId="habit-id" date="2022-01-01" />
    );
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAttribute('aria-label', 'failed');
    });
    
    it('updates the value with correct debounce', async () => {
    const updateCheckmarkInDbMutateMock = jest.fn();
    const { getByRole } = render(
    <Checkmark
         id="checkmark-id"
         initialValue="completed"
         habitId="habit-id"
         date="2022-01-01"
       />
    );
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));
    fireEvent.click(getByRole('button'));
    await waitFor(() => {
    expect(updateCheckmarkInDbMutateMock).toHaveBeenCalledTimes(0);
    
    });
    });
    
    it('disables the button when disabled prop is true', () => {
    const { getByRole } = render(
    <Checkmark id="checkmark-id" initialValue="completed" habitId="habit-id" date="2022-01-01" disabled />
    );
    expect(getByRole('button')).toBeDisabled();
    });
    
    it('does not update the value when disabled', () => {
    const updateCheckmarkInDbMutateMock = jest.fn();
    const { getByRole } = render(
    <Checkmark id="checkmark-id" initialValue="completed" habitId="habit-id" date="2022-01-01" disabled />
    );
    fireEvent.click(getByRole('button'));
    expect(getByRole('button')).toHaveAttribute('aria-label', 'completed');
    expect(updateCheckmarkInDbMutateMock).not.toHaveBeenCalled();
    });
    });
    
    describe('getNewValue', () => {
    it('returns the next value in the cycle', () => {
    expect(getNewValue('completed')).toBe('failed');
    expect(getNewValue('failed')).toBe('empty');
    expect(getNewValue('empty')).toBe('completed');
    });
    });