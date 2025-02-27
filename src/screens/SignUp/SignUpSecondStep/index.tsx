import React, { useState } from 'react';
import {
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { useTheme } from 'styled-components';

import api from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';

import { 
	Container,
	Header,
	Steps,
	Title,
	Subtitle,
	Form,
	FormTitle
} from './styles';

interface Params {
	user: {
		name: string;
		email: string;
		driverLicense: string;
	}
}

export const SignUpSecondStep = () => {
	const navigation = useNavigation();
	const theme = useTheme();
	const route = useRoute();

	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const {user} = route.params as Params;

	async function handleRegister(){
		if(!password || !passwordConfirm){
			return Alert.alert('Informa a senha e confirmação dela.');
		}

		if(password !== passwordConfirm){
			return Alert.alert('As senha não são iguais');
		}

		await api.post('/users', {
			name: user.name,
			email: user.email,
			driver_license: user.driverLicense,
			password,
		}).then(() => {
			navigation.navigate('Confirmation', {
				message: 'Agora é só fazer login\ne aproveitar', 
				title: 'Conta criada!', nextScreenRoute: 'SignIn'
			});
		}).catch(() => {
			return Alert.alert('Opa', 'Não foi possível cadastrar')
		});
	}

	return(
		<KeyboardAvoidingView
			behavior='position'
			enabled
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} >
				<Container>
					<Header>
						<BackButton onPress={() => navigation.goBack()} />
						<Steps>
							<Bullet active />
							<Bullet />
						</Steps>
					</Header>

					<Title>
						Crie sua {'\n'}conta
					</Title>
					<Subtitle>
						Faça seu cadastro de{'\n'}
						forma rápida e fácil
					</Subtitle>

					<Form>
						<FormTitle>2. Dados</FormTitle>

						<PasswordInput 
							iconName='lock'
							placeholder='Senha'
							onChangeText={setPassword}
							value={password}
						/>

						<PasswordInput 
							iconName='lock'
							placeholder='Repetir Senha'
							onChangeText={setPasswordConfirm}
							value={passwordConfirm}
						/>
					</Form>

					<Button
						color={theme.colors.success}
						title='Cadastrar'
						onPress={handleRegister}
					/>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}