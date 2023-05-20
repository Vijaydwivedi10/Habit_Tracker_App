import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { habitSchema } from 'data/constraints';
import { useHabitQuery, useUpdateHabitMutation } from 'api/habits';
import { useLocale } from 'localization';
import { NotFoundHabitScreen } from './not-found-habit';
import { Form, FormBody, FormButton, FormErrorText, FormHeader, FormPrimaryText} from 'components/form';

const defaultHabit = {
  name: '',
  description: '',
  frequency: [],
};

function EditHabitScreen() {
  const navigate = useNavigate();
  const { weekdays } = useLocale();
  const { habitId } = useParams();
  const { openSnackbar } = useSnackbar();

  const { data: habit, error: habitError, isFetching } = useHabitQuery(habitId);
  const updateHabitMutation = useUpdateHabitMutation();

  const {
    control,
    register,
    handleSubmit,
    errors,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: defaultHabit,
    resolver: yupResolver(habitSchema),
  });

  const onSubmit = (form) => {
    updateHabitMutation.mutate(
      { id: habitId, ...form },
      {
        onSuccess: () => {
          openSnackbar('success', "Goal Saved!");
          navigate('/manage-habits');
        },
      }
    );
    reset(defaultHabit);
  };

  React.useEffect(() => {
    if (habit) {
      const { name, description, frequency } = habit;

      setValue('name', name);
      setValue('description', description);
      setValue('frequency', frequency);
    }
  }, [habit, setValue, habitId]);

  const formErrors = Object.values(errors);

  const errorText = habitError ? habitError.message : formErrors[0]?.message;

  if (isFetching) {
    return <FullPageSpinner />;
  }

  if (!habit) {
    return <NotFoundHabitScreen />;
  }

  const disableActions = updateHabitMutation.isLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Edit Goal</FormPrimaryText>
        <FormErrorText>{errorText || ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="name"
          label="Goal name"
          error={!!errors?.name}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <TextField
          inputRef={register}
          name="description"
          label="Description"
          error={!!errors?.description}
          variant="outlined"
          disabled={disableActions}
          fullWidth
        />

        <CheckboxGroup
          name="frequency"
          label="Frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" pending={disableActions}>
          Save Goal
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { EditHabitScreen };
