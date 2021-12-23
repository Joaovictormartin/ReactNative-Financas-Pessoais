import React from "react";
import { Alert, Platform } from 'react-native';
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

  const { signInWithGoogle, signInWithApple } = useAuth();

  async function handleSignInWithGoogle() {
    try {

      await signInWithGoogle();

    } catch (err) {
      console.log(err)
      Alert.alert("Aviso", "Não foi possível conectar a conta Google");
    }
  }

  async function handleSignInWithApple() {
    try {

      await signInWithApple();

    } catch (err) {
      console.log(err)
      Alert.alert("Aviso", "Não foi possível conectar a conta Apple");
    }
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
          <SignInSocialButton
            svg={AppSvg}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
          
          {
            Platform.OS === "ios" ? ( null
            ) : null
          }
          
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
