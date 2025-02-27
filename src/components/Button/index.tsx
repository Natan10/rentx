import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Title } from './styles';


interface Props extends RectButtonProps {
  title: string;
  color?: string;
	loading?: boolean;
	light?: boolean; 
}

export const Button = ({
	title, 
	color,
	onPress,
	enabled = true,
	loading = false,
	light = false,
}: Props) => {
	const theme = useTheme();

  return(
    <Container 
			enabled={enabled}
			onPress={onPress} 
			color={color ? color : theme.colors.main}
			style={{
				opacity: (enabled === false || loading === true) ? .5 : 1
			}}
		>
			{loading ? (
				<ActivityIndicator color={theme.colors.shape} />
			): (
				<Title light={light}>{title}</Title>
			)}
    </Container>
  );
}
