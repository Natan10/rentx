import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedGestureHandler,
	withSpring
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

import api from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import { 
	Container,
	Header, 
	TotalCars, 
	HeaderContent, 
	CarList,
} from './styles';

import Logo from '../../assets/logo.svg';

export const Home = () => {
	const navigation = useNavigation();
	
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();

	const positionY = useSharedValue(0);
	const positionX = useSharedValue(0);
	const myCarsButtonStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{translateX: positionX.value},
				{translateY: positionY.value},
			]
		}
	});
	const onGestureEvent = useAnimatedGestureHandler({
		onStart: (_, ctx) => {
			ctx['offsetX'] = positionX.value;
			ctx['offsetY'] = positionY.value;
		},
		onActive: (event,ctx) => {
			positionX.value = event.translationX + ctx['offsetX']
			positionY.value = event.translationY + ctx['offsetY']
		},
		onEnd: () => {
			positionX.value = withSpring(0);
			positionY.value = withSpring(0);
		}
	}); 

	function handleCarDetails(car: CarDTO){
		navigation.navigate('CarDetails', {
			car
		});
	}

	function handleOpenMyCars(){
		navigation.navigate('MyCars');
	}

	useEffect(() => {
		async function fetchCars(){
			try {
				const {data} = await api.get('/cars');
				setCars(data);
			} catch (error) {
				console.log(error);
			}finally{
				setLoading(false);
			}
		}

		fetchCars();
	},[]);

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		})
	},[]);
	
  return (
    <Container>
      <StatusBar 
        barStyle='light-content' 
      />
      <Header>
        <HeaderContent>
          <Logo 
            width={RFValue(108)}
            height={RFValue(12)} 
          />
		  		{!loading && (
						<TotalCars>
							Total de {cars.length} carros
						</TotalCars>
					)}
        </HeaderContent>
      </Header>

			{loading ? <LoadAnimation/> : (
				<CarList 
					data={cars}
					keyExtractor={item => item.id}
					renderItem={({item}) => (
						<Car 
							data={item} 
							onPress={() => handleCarDetails(item)}
						/>)}
				/>
			)}

			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<Animated.View
					style={[
						myCarsButtonStyle,
						{
							position: 'absolute',
							bottom: 13,
							right: 22
						}
					]}
				>
					<ButtonAnimated
						style={[style.button, {backgroundColor: theme.colors.main}]} 
						onPress={handleOpenMyCars}
					>
						<Ionicons 
							name='ios-car-sport'
							size={32}
							color={theme.colors.shape}
						/>
					</ButtonAnimated>
				</Animated.View>
			</PanGestureHandler>
    </Container>
  )
}

const style = StyleSheet.create({
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center'
	}
})