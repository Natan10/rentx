import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RFValue } from 'react-native-responsive-fontsize';
import {useNetInfo} from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';
import {Car as ModelCar} from '../../database/model/Car';
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
	
	const [cars, setCars] = useState<ModelCar[]>([]);
	const [loading, setLoading] = useState(true);

	const netInfo = useNetInfo();

	function handleCarDetails(car: CarDTO){
		navigation.navigate('CarDetails', {
			car
		});
	}

	async function offlineSynchronize(){
		await synchronize({
			database,
			pullChanges: async ({lastPulledAt}) => {
				const {data} = await api
				.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);
				const {changes, latestVersion} = data;
				return {
					changes,
					timestamp: latestVersion
				}
			},
			pushChanges: async ({changes}) => {
				const user = changes.users;
				await api.post('/users/sync', user);
			}	
		})
	}

	useEffect(() => {
		let isMounted = true;

		async function fetchCars(){
			try {
				const carCollection = database.get<ModelCar>('cars');
				const cars = await carCollection.query().fetch();

				const {data} = await api.get('/cars');
				setCars(data);

				if(isMounted){
					setCars(cars);
				}
			} catch (error) {
				console.log(error);
			}finally{
				if(isMounted){
					setLoading(false);
				}
			}
		}
		fetchCars();

		return () => {
			isMounted = false;
		};
	},[]);

	useEffect(() => {
		if(netInfo.isConnected === true){
			offlineSynchronize();
		}
	},[netInfo.isConnected])

	/*
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

	function handleOpenMyCars(){
		navigation.navigate('MyCars');
	}

	Acao de voltar ao scrollar para a esquerda
	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		})
	},[]);
	*/
	
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

			{/* <PanGestureHandler onGestureEvent={onGestureEvent}>
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
			</PanGestureHandler> */}
    </Container>
  )
}

// const style = StyleSheet.create({
// 	button: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		justifyContent: 'center',
// 		alignItems: 'center'
// 	}
// })