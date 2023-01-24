import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { LoadAnimation } from '../../components/LoadAnimation';
import { Car } from '../../components/Car';

import { CarDTO } from '../../dtos/CarDTO';
import api from '../../services/api';

import { 
	Container, 
	Header, 
	Title,
	SubTitle,
	Content,
	Appointments,
	AppointmentsTitle,
	AppointmentsQuantity,
	CarWrapper,
	CarFooter,
	CarFooterTitle,
	CarFooterPeriod,
	CarFooterDate
} from './styles';
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface CarProps {
	car: CarDTO;
	id: string;
	user_id: string;
	startDate: string;
	endDate: string;
}

export const MyCars = () => {
	const [cars, setCars] = useState<CarProps[]>([]);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const navigation = useNavigation();
	
	function handleGoBack(){
		navigation.goBack()
	}

	useEffect(() => {
		async function fetchCars(){
			try {
				const {data} = await api.get(`/schedules_byuser?user_id=1`);
				setCars(data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchCars();
	},[]);

  return(
		<Container>
			<Header>
				<StatusBar 
					barStyle='light-content'
					translucent
					backgroundColor='transparent'
				/>
        <BackButton
         onPress={handleGoBack} 
         color={theme.colors.shape}
        />

        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

				<SubTitle>
					Conforto, segurança e praticidade.
				</SubTitle>
      </Header>

			{loading ? <LoadAnimation /> : (
				<Content>
					<Appointments>
						<AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
						<AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
					</Appointments>

					<FlatList 
						data={cars}
						keyExtractor={item => item.id}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: getBottomSpace()
						}}
						renderItem={({item}) => (
							<CarWrapper>
								<Car data={item.car}/>
								<CarFooter>
									<CarFooterTitle>Período</CarFooterTitle>
									<CarFooterPeriod>
										<CarFooterDate>{item.startDate}</CarFooterDate>
										<AntDesign 
											name='arrowright'
											size={20}
											color={theme.colors.title}
											style={{marginHorizontal: 10}}
										/>
										<CarFooterDate>{item.endDate}</CarFooterDate>
									</CarFooterPeriod>
								</CarFooter>
							</CarWrapper>
						)}
					/>
				</Content>
			)}
		</Container>
  );
}