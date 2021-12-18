import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppSvg from "../../assets/svg/icon-apple.svg";
import GoogleSvg from "../../assets/svg/icon-google.svg";
import LogoSvg from "../../assets/svg/icon-logo.svg";

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
            
          />

          <SignInSocialButton
            svg={AppSvg}
            title="Entrar com Apple"
          />
          
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
