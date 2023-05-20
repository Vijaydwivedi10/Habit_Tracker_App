import * as React from 'react';
import { FullPageSpinner, FullPageErrorFallback } from 'components/lib';
import { useFirebase } from './firebase-context';
import { useAsync } from 'utils/hooks';
import { useAuth } from './auth-context';
import { defaultLocale } from 'localization/locales';
import { createTheme, defaultThemeConstants } from 'theme';
import { useTheme } from '@material-ui/core';
import { useLocale } from 'localization';

const UserContext = React.createContext();
UserContext.displayName = 'UserContext';

const defaultUserData = {
  theme: defaultThemeConstants,
  performanceGoal: 75,
  locale: {
    code: defaultLocale.code,
  },
};

function UserProvider({ children }) {
  const {
    data: userData,
    setData: setUserData,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
  } = useAsync({
    data: defaultUserData,
  });

  const { db } = useFirebase();
  const { user } = useAuth();

  React.useEffect(() => {
    const userDataRef = db.ref(`users/${user.uid}`);

    userDataRef.on('value', (snapshot) => {
      const userHasData = snapshot.exists();

      if (userHasData) {
        setUserData({
          ...defaultUserData,
          ...snapshot.val(),
        });
      } else {
        setUserData(defaultUserData);
      }
    });

    return () => userDataRef.off();
  }, [db, user, setUserData]);

  const { theme } = userData;
  const { setTheme } = useTheme();

  React.useEffect(() => {
    if (theme) {
      setTheme(createTheme(theme));
    }
  }, [theme, setTheme]);

  // const { locale } = userData;
  // const { setLocaleByCode } = useLocale();

  // React.useEffect(() => {
  //   if (locale) {
  //     setLocaleByCode(locale.code);
  //   }
  // }, [locale, setLocaleByCode]);

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  if (isSuccess) {
    return (
      <UserContext.Provider value={userData}>
        {children}
      </UserContext.Provider>
    );
  }

  throw new Error(`Unhandled status: ${status}`);
}

function useUser() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error(`useUser must be used within a UserProvider`);
  }
  return context;
}

export { UserProvider, useUser };
