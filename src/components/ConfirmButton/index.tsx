import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import {
  Container,
  Title,
} from './styles';

interface Props extends RectButtonProps {
  title: string;
}

export const ConfirmButton = ({ title, ...rest}: Props) => {
  return(
    <Container {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}