import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import { useAuth } from 'context/auth-context';
import { useSnackbar } from 'context/snackbar-context';
import { resetPasswordSchema } from 'data/constraints';
import { useAsync } from 'utils/hooks';
import {
  Form,
  FormBody,
  FormButton,
  FormErrorText,
  FormHeader,
  FormLink,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';


function ResetPasswordScreen() {
  const { resetPassword } = useAuth();
  const { openSnackbar } = useSnackbar();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = ({ email }) => {
    run(
      resetPassword({ email }).then(() => {
        openSnackbar('success', `Sent password reset email to ${email}`);
      })
    );
    reset();
  };

  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Reset password</FormPrimaryText>
        <FormSecondaryText>Enter your email address to reset your password.</FormSecondaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <TextField
          inputRef={register}
          name="email"
          autoComplete="email"
          label="Email address"
          placeholder="john@doe.com"
          error={!!errors?.email}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />
        <FormButton type="submit" pending={isLoading}>
          Reset password
        </FormButton>

        <FormSecondaryText>
          Already have an account?
          <FormLink to="/signin">Sign In</FormLink>
        </FormSecondaryText>
      </FormBody>
    </Form>
  );
}

export { ResetPasswordScreen };
