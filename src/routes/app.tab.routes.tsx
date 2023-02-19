import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

const {Navigator, Screen} = createBottomTabNavigator();

import { MyCars } from '../screens/MyCars';
import { Profile } from '../screens/Profile';

import { AppStackRoutes } from './app.stack.routes';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';

export interface AppTabRouteList {
	Home: undefined;
	MyCars: undefined;
	Profile: undefined;
}

export function AppTabRoutes(){
	const theme = useTheme();

  return(
    <Navigator
			screenOptions={{
				tabBarActiveTintColor: theme.colors.main,
				tabBarInactiveTintColor: theme.colors.text_detail,
				headerShown: false,
				tabBarShowLabel: false,
				tabBarStyle: {
					paddingVertical: Platform.OS === 'ios' ? 20:0,
					height: 78,
					backgroundColor: theme.colors.background_primary
				}
			}}
		>
			<Screen
				name='Home'
				component={AppStackRoutes}
				options={{
					tabBarIcon: ({color}) => {
						return <HomeSvg width={24} height={24} fill={color} />
					}
				}}
			/>
			<Screen
				name='MyCars'
				component={MyCars} 
				options={{
					tabBarIcon: ({color}) => {
						return <CarSvg width={24} height={24} fill={color} />
					}
				}}
			/>
			<Screen
				name='Profile'
				component={Profile} 
				options={{
					tabBarIcon: ({color}) => {
						return <PeopleSvg width={24} height={24} fill={color} />
					}
				}}
			/>
    </Navigator>
  )
}