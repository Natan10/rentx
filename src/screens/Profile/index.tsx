import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';

import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';
import { Button } from '../../components/Button';

import { 
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	LogoutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
	Content,
	Options,
	Option,
	OptionTitle,
	Section
} from './styles';

export const Profile = () => {
	const theme = useTheme();
	const navigation = useNavigation();
	const netInfo = useNetInfo();
	const { user, signOut, updatedUser } = useAuth();

	const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');
	const [avatar, setAvatar] = useState(user.avatar);
	const [name, setName] = useState(user.name);
	const [driverLicense, setDriverLicense] = useState(user.driver_license);

	const handleBack = () => {
		navigation.goBack();
	}

	const handleSignOut = async () => {
		Alert.alert(
			'Tem certeza?',
			'Se você sair, irá precisar de internet para conectar-se novamente.',
			[
				{
					text: 'Cancelar',
					onPress: () => {},
					style: 'cancel'
				},
				{
					text: 'Sair',
					onPress: () => signOut()
				}
			]
		);
	}

	const handleOptionChange = (optionSelected: 'dataEdit' | 'passwordEdit') => {
		if(netInfo.isConnected === false && optionSelected === 'passwordEdit'){
			Alert.alert('Você está offline','Para mudar a senha, conecte-se a Internet')
		}else{
			setOption(optionSelected);
		}
	}

	const handleSelectAvatar = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4,4],
			quality: 1
		});

		if(result.canceled) {
			return;
		}

		if(result.assets[0].uri) {
			setAvatar(result.assets[0].uri);
		}
	}

	const handleProfileUpdate = async () => {
		try {
			const schema = yup.object().shape({
				driverLicense: yup.string().required('CNH é obrigatória'),
				name: yup.string().required('Nome é obrigatório')
			});

			const data = {name, driverLicense};
			await schema.validate(data);

			await updatedUser({
				id: user.id,
				user_id: user.user_id,
				email: user.email,
				driver_license: driverLicense,
				name,
				avatar,
				token: user.token
			});

			Alert.alert('Perfil atualizado!')

		}catch(err){
			if(err instanceof yup.ValidationError){
				return Alert.alert('Opa', err.message);
			}
			console.log(err)
			return Alert.alert('Não foi possível atualizar o perfil')
		}
	}

	return(
		<KeyboardAvoidingView behavior='position' enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<Header>
						<HeaderTop>
							<BackButton color={theme.colors.shape} onPress={handleBack} />
							<HeaderTitle>Editar Perfil</HeaderTitle>
							<LogoutButton onPress={handleSignOut}>
								<Feather name='power' size={24} color={theme.colors.shape} />
							</LogoutButton>
						</HeaderTop>

						<PhotoContainer>
							{!!avatar && 
								<Photo 
									source={{
										uri: avatar
									}}
								/>
							}
							<PhotoButton onPress={handleSelectAvatar}>
								<Feather name='camera' size={24} color={theme.colors.shape} />
							</PhotoButton>
						</PhotoContainer>
					</Header>

					<Content style={{marginBottom: useBottomTabBarHeight()}} >
						<Options>
							<Option
							onPress={() => handleOptionChange('dataEdit')}
							active={option === 'dataEdit'}>
								<OptionTitle active={option === 'dataEdit'} >Dados</OptionTitle>
							</Option>
							<Option 
								onPress={() => handleOptionChange('passwordEdit')}
								active={option === 'passwordEdit'}>
								<OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
							</Option>
						</Options>
						
						{option === 'dataEdit' ? (
							<Section>
								<Input 
									iconName='user'
									placeholder='Nome'
									autoCorrect={false}
									defaultValue={user.name}
									onChangeText={setName}
								/>
								<Input 
									iconName='mail'
									editable={false}
									defaultValue={user.email}
								/>
								<Input 
									iconName='credit-card'
									placeholder='CNH'
									keyboardType='numeric'
									defaultValue={user.driver_license}
									onChangeText={setDriverLicense}
								/>
							</Section>
						):(
							<Section>
								<PasswordInput 
									iconName='lock'
									placeholder='Senha atual'
								/>
								<PasswordInput 
									iconName='lock'
									placeholder='Nova senha'
								/>
								<PasswordInput 
									iconName='lock'
									placeholder='Repetir senha'
								/>
							</Section>
						)}

						<Button 
							title='Salvar alterações'
							onPress={handleProfileUpdate}
						/>
					</Content>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
