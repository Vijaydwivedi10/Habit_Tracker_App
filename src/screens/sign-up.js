import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import {
  Form,
  FormBody,
  FormButton,
  FormDivider,
  FormErrorText,
  FormHeader,
  FormLink,
  FormListContainer,
  FormPrimaryText,
  FormSecondaryText,
} from 'components/form';
import { useAuth } from 'context/auth-context';
import { signUpSchema } from 'data/constraints';
import { useForm } from 'react-hook-form';
import { useAsync } from 'utils/hooks';
import { AuthProviderList } from 'components/auth-providers-list';

function SignUpScreen() {
  const { signUp, signInWithAuthProvider,  } = useAuth();
  const { isLoading, isError: isAuthError, error: authError, run } = useAsync();

  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = ({ email, password }) => {
    run(signUp({ email, password }));
    reset();
  };

  const handleAuthProviderClick = (event, provider) => {
    event.preventDefault();

    run(signInWithAuthProvider(provider));
  };


  const errorMessages = Object.values(errors);
  const isError = isAuthError || errorMessages.length !== 0;
  const errorMessage = authError?.message || errorMessages[0]?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <FormPrimaryText>Sign Up</FormPrimaryText>
        <FormSecondaryText>
          Already have an account?<FormLink to="/signin">Sign In</FormLink>
        </FormSecondaryText>
        <FormErrorText>{isError ? errorMessage : ' '}</FormErrorText>
      </FormHeader>

      <FormBody>
        <FormListContainer>

        <AuthProviderList
          text="Sign Up With"
          onAuthProviderClick={handleAuthProviderClick}
          disabled={isLoading}
        />
        
        </FormListContainer>

        <FormDivider />

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

        <TextField
          inputRef={register}
          name="password"
          type="password"
          autoComplete="current-password"
          label="Password"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.password}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />
        <TextField
          inputRef={register}
          name="passwordConfirmation"
          type="password"
          autoComplete="password"
          label="Password confirmation"
          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
          error={!!errors?.passwordConfirmation}
          disabled={isLoading}
          variant="outlined"
          fullWidth
        />

        <FormButton type="submit" pending={isLoading}>
          Sign Up
        </FormButton>
      </FormBody>
    </Form>
  );
}

export { SignUpScreen };
