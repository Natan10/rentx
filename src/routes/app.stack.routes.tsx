import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { Confirmation } from '../screens/Confirmation';
import { CarDTO } from '../dtos/CarDTO';
import { MyCars } from '../screens/MyCars';

export interface AppStackRouteList {
	Home: undefined;
	CarDetails: {car: CarDTO} | undefined;
	Scheduling: {car: CarDTO} | undefined;
	SchedulingDetails: {car: CarDTO, dates: string[]} | undefined;
	Confirmation: {
		title: string; 
		message: string; 
		nextScreenRoute: any;
	};
	MyCars: undefined;
}

export function AppStackRoutes(){
  return(
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
			<Screen
				name='Home'
				component={Home} 
			/>
			<Screen
				name='CarDetails'
				component={CarDetails} 
			/>
			<Screen
				name='Scheduling'
				component={Scheduling} 
			/>
			<Screen
				name='SchedulingDetails'
				component={SchedulingDetails} 
			/>
			<Screen
				name='Confirmation'
				component={Confirmation} 
			/>
			<Screen
				name='MyCars'
				component={MyCars} 
			/>
    </Navigator>
  )
}