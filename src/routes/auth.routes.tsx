import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Confirmation } from '../screens/Confirmation';
import { CarDTO } from '../dtos/CarDTO';
import { Splash } from '../screens/Splash';
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

export interface AuthRouteList {
	Splash: undefined;
	Confirmation: {
		title: string; 
		message: string; 
		nextScreenRoute: any;
	};
	SignIn: undefined;
	SignUpFirstStep: undefined;
	SignUpSecondStep: {
		user: {
			name: string;
			email: string;
			driverLicense: string;
		}
	};
}

const {Navigator, Screen} = createStackNavigator();

export function AuthRoutes(){
  return(
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
			<Screen
				name='Splash'
				component={Splash} 
			/>
			<Screen
				name='SignIn'
				component={SignIn} 
			/>
			<Screen
				name='SignUpFirstStep'
				component={SignUpFirstStep} 
			/>
			<Screen
				name='SignUpSecondStep'
				component={SignUpSecondStep} 
			/>
			<Screen
				name='Confirmation'
				component={Confirmation} 
			/>
    </Navigator>
  )
}