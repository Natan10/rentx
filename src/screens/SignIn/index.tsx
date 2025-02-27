import React, {useState} from 'react';
import { 
	StatusBar,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Alert
} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import theme from '../../styles/theme';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { 
	Container,
	Header,
	Title,
	Form,
	SubTitle,
	Footer
} from './styles';

const schema = Yup.object().shape({
	email: Yup.string()
	.required('E-mail obrigatório')
	.email('Digite um e-mail válido'),
	password: Yup.string().required('A senha é obrigatória')
});

export const SignIn = () => {
	const navigation = useNavigation();
	const { signIn } = useAuth();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSignIn() {
		try {
			await schema.validate({email, password});
			await signIn({email,password})
		} catch (error) {
			if(error instanceof Yup.ValidationError){
				Alert.alert('Opa', error.message);
			} else {
				console.log(error)
				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login, verifique as credenciais'
				)
			}
		}
	}

	function handleNewAccount(){
		navigation.navigate('SignUpFirstStep');
	}

	return( 
		<KeyboardAvoidingView
			behavior='position'
			enabled
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<StatusBar 
						barStyle='dark-content' 
						backgroundColor='transparent'
						translucent
					/>
					<Header>
						<Title>
							Estamos {'\n'}quase lá.
						</Title>
						<SubTitle>
							Faça seu login para começar{'\n'}
							uma experiência incrível.
						</SubTitle>
					</Header>

					<Form>
						<Input 
							iconName='mail'
							placeholder='E-mail'
							keyboardType='email-address'
							autoCorrect={false}
							autoCapitalize="none"
							onChangeText={setEmail}
							value={email}
						/>

						<PasswordInput 
							iconName='lock'
							placeholder='Senha'
							onChangeText={setPassword}
							value={password}
						/>
					</Form>

					<Footer>
						<Button 
							title='Login'
							onPress={handleSignIn}
							enabled={true}
							loading={false}
						/>
						<Button 
							title='Criar conta gratuita'
							onPress={handleNewAccount}
							enabled={true}
							loading={false}
							color={theme.colors.background_primary}
							light
						/>
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}