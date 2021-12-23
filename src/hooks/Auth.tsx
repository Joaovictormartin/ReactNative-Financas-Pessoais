import React, { useState, createContext, useContext, ReactNode } from 'react';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { dataUser } from '../utils/asyncStorageKeys';

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
}

interface AuthorizationResponse {
  type: string;
  params: {
    access_token: string;
  };
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URL } = process.env;

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children } : AuthProviderProps) {

  const [ user, setUser ] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {

      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');
    
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = await AuthSession
      .startAsync({ authUrl }) as AuthorizationResponse;
      

      if (type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        const userLoggend = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.given_name,
          photo: userInfo.picture,
        }

        setUser(userLoggend);
        await AsyncStorage.setItem(dataUser, JSON.stringify(userLoggend));
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async function signInWithApple() {
    try {

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if (credential) {
        const userLoggend = {
          id: String(credential.user),
          email: String(credential?.email),
          name: String(credential?.fullName?.givenName),
          photo: undefined,
        }

        setUser(userLoggend);
        await AsyncStorage.setItem(dataUser, JSON.stringify(userLoggend));
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signInWithApple }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context
}

export { AuthProvider, useAuth}