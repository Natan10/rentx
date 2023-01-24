import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';
import { CarDTO } from '../dtos/CarDTO';
import { MyCars } from '../screens/MyCars';
import { Splash } from '../screens/Splash';

export interface RouteList {
	Splash: undefined;
	Home: undefined;
	CarDetails: {car: CarDTO} | undefined;
	Scheduling: {car: CarDTO} | undefined;
	SchedulingDetails: {car: CarDTO, dates: string[]} | undefined;
	SchedulingComplete: undefined;
	MyCars: undefined;
}

export function StackRoutes(){
  return(
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
			<Screen
				name='Splash'
				component={Splash} 
			/>
			<Screen
				name='Home'
				component={Home} 
				options={{
					gestureEnabled: false
				}}
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
				name='SchedulingComplete'
				component={SchedulingComplete} 
			/>
			<Screen
				name='MyCars'
				component={MyCars} 
			/>
    </Navigator>
  )
}