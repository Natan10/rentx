import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { format } from 'date-fns';
import { useNetInfo } from '@react-native-community/netinfo';

import { 
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer
} from './styles';

import { BackButton } from '../../components/BackButton';
import { Acessory } from '../../components/Acessory';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';
import { getPlatformDate } from '../../utils/getPlatformDate';
import api from '../../services/api';
import { Alert } from 'react-native';
import { useAuth } from '../../hooks/auth';

interface Params {
	car: CarDTO;
	dates: string[];
}

interface RentalPeriod{
	start: string;
	end: string;
}

export const SchedulingDetails = () => {
	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO)

	const {user} = useAuth()
	const netInfo = useNetInfo();
  const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();

	const {car, dates} = route.params as Params;
	const rentTotal = Number(dates.length * car.price);

	const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
	const [loading, setLoading] = useState(false);

	async function handleConfirmRental(){
		setLoading(true);
		try {	
			await api.post(`/rentals`, {
				user_id: 1,
				car_id: car.id,
				start_date: new Date(dates[0]),
				end_date: new Date(dates[dates.length - 1]),	
				total: rentTotal
			},{
				headers: {
					authorization: `Bearer ${user.token}`
				}
			});

			navigation.navigate('Confirmation', {
				title: 'Carro alugado!',
				message: 'Agora você só precisar ir\naté a concessionária da RENTX\npegar o seu automóvel.',
				nextScreenRoute: 'Home'
			});
		} catch (error) {
			Alert.alert('Não foi possível confirmar o agendamento.')
			console.log(error);	
			setLoading(false);
		}
	}

	function handleGoBack(){
		navigation.goBack()
	}

	useEffect(() => {
		setRentalPeriod({
			start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
			end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
		})
	},[]);

	useEffect(() => {
		async function fetchCarUpdated(){
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}
		if(netInfo.isConnected === true) {
			fetchCarUpdated();
		}
	},[netInfo.isConnected]);

  return(
    <Container>
      <Header>
        <BackButton onPress={handleGoBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={
						!!carUpdated.photos ? 
						carUpdated.photos:
						[{id: car.thumbnail, photo: car.thumbnail}]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

				{	carUpdated.accessories && 
					<Accessories>
						{carUpdated.accessories.map(accessory => (
							<Acessory 
								key={accessory.type} 
								name={accessory.name}  
								icon={getAccessoryIcon(accessory.type)}
							/>
						))}
					</Accessories>
				}

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name='calendar' 
              size={RFValue(24)}
              color={theme.colors.shape} 
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name='chevron-right' 
            size={RFValue(10)}
            color={theme.colors.text} 
          />

          <DateInfo>
            <DateTitle>ATE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title='Alugar Agora'
          color={theme.colors.success}
					onPress={handleConfirmRental}
					loading={loading}
					enabled={!loading}
        />
      </Footer>
    </Container>
  );
}

