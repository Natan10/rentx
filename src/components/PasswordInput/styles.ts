import { RFValue } from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

interface Props {
	isFocused: boolean;
}

export const Container = styled.View`
	flex-direction: row;

	margin-bottom: 8px;
`;

export const IconContainer = styled.View<Props>`
	width: 55px;
	height: 56px;

	margin-right: 2px;

	justify-content: center;
	align-items: center;

	background-color: ${({theme}) => theme.colors.background_secondary};

	${({isFocused, theme}) => isFocused && css`
			border-bottom-width: 2px;
			border-bottom-color: ${theme.colors.main};
	`}
`;

export const InputText = styled.TextInput<Props>`
	flex: 1;

	padding: 0 23px;

	background-color: ${({theme}) => theme.colors.background_secondary};
	color: ${({theme}) => theme.colors.text};
	font-family: ${({theme}) => theme.fonts.primary_400};
	font-size: ${RFValue(15)}px;

	${({isFocused, theme}) => isFocused && css`
			border-bottom-width: 2px;
			border-bottom-color: ${theme.colors.main};
	`}
`;