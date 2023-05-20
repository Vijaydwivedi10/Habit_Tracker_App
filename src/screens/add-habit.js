import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import { CheckboxGroup } from 'components/checkbox-group';
import { FullPageSpinner } from 'components/lib';
import { useSnackbar } from 'context/snackbar-context';
import { useAddHabitMutation, useHabitsQuery } from 'api/habits';
import { Form, FormBody, FormButton, FormErrorText, FormHeader, FormPrimaryText } from 'components/form';
import { useLocale } from 'localization';
import { habitSchema } from 'data/constraints';

const AddHabitScreen = () => {
  const { weekdays } = useLocale();
  const { openSnackbar } = useSnackbar();

  const { data: habits, isLoading } = useHabitsQuery();
  const addHabitMutation = useAddHabitMutation();

  const { control, register, handleSubmit, errors, getValues, reset } = useForm({
    defaultValues: { name: '', description: '', frequency: [] },
    resolver: yupResolver(habitSchema),
  });

  const onSubmit = async (form) => {
    const { name, description, frequency } = form;
    const position = habits.length;
    try {
      await addHabitMutation.mutateAsync({ name, description, frequency, position });
      openSnackbar('success', 'Habit added!');
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const formErrors = Object.values(errors);

  const errorText = addHabitMutation?.error?.message || formErrors?.[0]?.message || '';

  const disableActions = addHabitMutation?.isLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Create new goal</FormPrimaryText>
        <FormErrorText>{errorText}</FormErrorText>
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
          label="Frequency"
          name="frequency"
          control={control}
          getValues={getValues}
          values={weekdays}
          error={!!errors?.frequency}
        />

        <FormButton type="submit" pending={disableActions}>
          Create Goal
        </FormButton>
      </FormBody>
    </Form>
  );
};

export {AddHabitScreen};
