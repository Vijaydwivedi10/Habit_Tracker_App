import React from 'react';
import { shallow } from 'enzyme';
import authProviders from './auth-providers';

describe('authProviders', () => {
  it('contains the correct number of providers', () => {
    expect(authProviders.length).toBe(3); // Update this number if more providers are added
  });

  it('contains Facebook provider with correct properties', () => {
    const facebookProvider = authProviders.find(provider => provider.id === 'facebook.com');
    expect(facebookProvider).toBeTruthy();
    expect(facebookProvider.color).toBe('#3c5a99');
    // expect(facebookProvider.icon.type.displayName).toBe('FacebookIcon');
    expect(facebookProvider.name).toBe('Facebook');
  });

  it('contains GitHub provider with correct properties', () => {
    const gitHubProvider = authProviders.find(provider => provider.id === 'github.com');
    expect(gitHubProvider).toBeTruthy();
    expect(gitHubProvider.color).toBe('#24292e');
    // expect(gitHubProvider.icon.type.displayName).toBe('GitHubIcon');
    expect(gitHubProvider.name).toBe('GitHub');
  });

  it('contains Google provider with correct properties', () => {
    const googleProvider = authProviders.find(provider => provider.id === 'google.com');
    expect(googleProvider).toBeTruthy();
    expect(googleProvider.color).toBe('#de5246');
    // expect(googleProvider.icon.type.displayName).toBe('GoogleIcon');
    expect(googleProvider.name).toBe('Google');
  });

  it('does not contain any other providers', () => {
    const providerIds = authProviders.map(provider => provider.id);
    expect(providerIds).toEqual(['facebook.com', 'github.com', 'google.com']); // Update this array if more providers are added
  });
});
