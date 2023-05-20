import {
    habitSchema,
    signInSchema,
    signUpSchema,
    resetPasswordSchema,
  } from './constraints';
  
  describe('habitSchema', () => {
    test('validates a habit with required fields', async () => {
      const data = {
        name: 'My habit',
        frequency: ['monday'],
      };
      const result = await habitSchema.validate(data);
      expect(result).toEqual(data);
    });
  
    test('throws an error when name is missing', async () => {
      const data = {
        frequency: ['monday'],
      };
      await expect(habitSchema.validate(data)).rejects.toThrow('Title is required.');
    });
  
    test('throws an error when frequency is missing', async () => {
      const data = {
        name: 'My habit',
      };
      await expect(habitSchema.validate(data)).rejects.toThrow('You have to select at least one day.');
    });
  });
  
  describe('signInSchema', () => {
    test('validates a sign in form with valid email and password', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
      };
      const result = await signInSchema.validate(data);
      expect(result).toEqual(data);
    });
  
    test('throws an error when email is missing', async () => {
      const data = {
        password: 'password123',
      };
      await expect(signInSchema.validate(data)).rejects.toThrow('Email address is required.');
    });
  
    test('throws an error when email is invalid', async () => {
      const data = {
        email: 'invalid-email',
        password: 'password123',
      };
      await expect(signInSchema.validate(data)).rejects.toThrow('Email address is invalid');
    });
  
    test('throws an error when password is missing', async () => {
      const data = {
        email: 'test@example.com',
      };
      await expect(signInSchema.validate(data)).rejects.toThrow('You have to enter the password.');
    });
  
    test('throws an error when password is too short', async () => {
      const data = {
        email: 'test@example.com',
        password: 'short',
      };
      await expect(signInSchema.validate(data)).rejects.toThrow('Password must be at least 6 characters.');
    });
  });
  
  describe('signUpSchema', () => {
    test('validates a sign up form with valid email, password, and password confirmation', async () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        passwordConfirmation: 'password123',
      };
      const result = await signUpSchema.validate(data);
      expect(result).toEqual(data);
    });
  
    test('throws an error when email is missing', async () => {
      const data = {
        password: 'password123',
        passwordConfirmation: 'password123',
      };
      await expect(signUpSchema.validate(data)).rejects.toThrow('Email address is required.');
    });
  
  });  