import React, { useState } from "react";
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";

import AppSvg from "../../assets/svg/icon-apple.svg";
import GoogleSvg from "../../assets/svg/icon-google.svg";
import LogoSvg from "../../assets/svg/icon-logo.svg";

import { useAuth } from '../../hooks/Auth';

import { SignInSocialButton } from '../../components/SignInSocialButton';

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from "./styles";

export function SignIn() {

  const [ isLoading, setIsLoading ] = useState(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (err) {
      Alert.alert("Aviso", "Não foi possível conectar a conta Google");
      setIsLoading(false);
    } 
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (err) {
      Alert.alert("Aviso", "Não foi possível conectar a conta Apple");
      setIsLoading(false);
    } 
  }

  function load() {
    return(
      <ActivityIndicator 
        color="#fff" 
        size="small"
        style={{marginTop: 18}}
      />
    )
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)} 
            height={RFValue(68)} 
          />

          <Title>Controle suas{`\n`}finanças de forma{`\n`}muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{`\n`}uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          
          {
            Platform.OS === "ios" && ( 
              <SignInSocialButton
                svg={AppSvg}
                title="Entrar com Apple"
                onPress={handleSignInWithApple}
              />
            )
          }
          
        </FooterWrapper>

        { isLoading && load()}
      </Footer>
    </Container>
  );
}
