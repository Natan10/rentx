import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';

import { useAuth } from '../hooks/auth';

import { LoadAnimation } from '../components/LoadAnimation';

export const Routes = () => {
	const {user, loading} = useAuth();

  return(
		loading ? <LoadAnimation /> :
    <NavigationContainer>
			{user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
