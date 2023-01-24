import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loadingCar.json';

import { Container } from './styles';

export const LoadAnimation = () => {
	return(
		<Container>
			<LottieView 
				autoPlay 
				loop
				resizeMode="contain"
				style={{height: 200}}
				source={loadingCar} 
			/>
		</Container>
	);
}