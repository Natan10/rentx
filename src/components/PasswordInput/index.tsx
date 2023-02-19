import React, {useState} from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { TextInputProps } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useTheme} from 'styled-components';

import { 
	Container,
	IconContainer,
	InputText,
} from './styles';

interface Props extends TextInputProps{
	iconName: React.ComponentProps<typeof Feather>['name'];
	value?: string;
}

export const PasswordInput = ({iconName,value, ...rest}: Props) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(true);
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	
	const theme = useTheme();

	const handleInputFocus = () => {
		setIsFocused(true)
	}

	const handleInputBlur = () => {
		setIsFocused(false);
		setIsFilled(!!value);
	}

	const handlePasswordVisibilityChange = () => {
		setIsPasswordVisible(old => !old)
	}

	return (
		<Container>
			<IconContainer isFocused={isFocused}>
				<Feather
					name={iconName} 
					size={24}
					color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
				/>
			</IconContainer>
			<InputText 
				{...rest} 
				autoCorrect={false}
				secureTextEntry={isPasswordVisible} 
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
				isFocused={isFocused}
			/>
			<IconContainer isFocused={isFocused}>
				<BorderlessButton onPress={handlePasswordVisibilityChange}>
					<Feather
						name={isPasswordVisible ? 'eye' : 'eye-off'} 
						size={24}
						color={theme.colors.text_detail}
					/>
				</BorderlessButton>
			</IconContainer>
		</Container>
	)
}

