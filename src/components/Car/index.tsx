import React from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { RectButtonProps } from 'react-native-gesture-handler';

import {CarDTO} from '../../dtos/CarDTO';
import {Car as ModelCar} from '../../database/model/Car'

import { 
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

interface Props extends RectButtonProps {
  data: ModelCar;
}

export const Car = ({ data, ...rest }: Props) => {
	const netInfo = useNetInfo();
	const MotorIcon = getAccessoryIcon(data.fuel_type);

	return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>{`RS ${netInfo.isConnected === true ? data.price : '...'}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage 
        source={{
          uri: data.thumbnail
        }} 
        resizeMode="contain"
      />
    </Container>
  );
}