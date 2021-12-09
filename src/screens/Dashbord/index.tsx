import React, { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { dataTransactionKey } from "../../utils/asyncStorageKeys";

import { HighlightCard } from "../../components/HighlightCard";
import { TransationCard } from "../../components/TransationCard";

import {
  DateListProps,
  HighlightDate,
} from "../../../interface/DashboardProps";

import {
  Container,
  LoadContainer,
  Header,
  UserWrapper,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transitions,
  Title,
  TransitionsList,
} from "./styles";

export function Dashboard() {
  const { colors } = useTheme();

  const [transitions, setTransitions] = useState<DateListProps[]>([]);
  const [highlightData, setHighlightData] = useState<HighlightDate>({} as HighlightDate);
  const [isLoading, setIsLoading] = useState(false);

  //função para pega a última data de entrada ou saída
  function getLastTransitionDate(collection: DateListProps[], type: "up" | "down") {

    const lastTransition = new Date(
    Math.max.apply(Math, collection //para pegar a maior data(ultima)
    .filter((item) => item.transactionTypes === type) //filtra pelo type
    .map((item) => new Date(item.date).getTime()))); //retorna só a data

    return `${lastTransition.getDate()} de ${lastTransition.toLocaleDateString('pt-BR', { month: 'long' })}`
  }

  async function loadTransitions() {
    let entriesTotal = 0; //Variavel para soma as entradas
    let expensiveTotal = 0; //Variavel para soma as saídas

    const response = await AsyncStorage.getItem(dataTransactionKey); //pega os dados do AsyncStorage
    const transaction = response ? JSON.parse(response) : []; //o JSON transforma em obj

    const transactionsFormatted: DateListProps[] = transaction
    .map((item: DateListProps) => {
        if (item.transactionTypes === "up") {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount) //Formatando para moeda real
          .toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          });

        const date = Intl.DateTimeFormat("pt-BR", {
          //transforma o item para data dd/mm/yyyy
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          transactionTypes: item.transactionTypes,
          category: item.category,
          date,
        };
      }
    );

    setTransitions(transactionsFormatted);

    const lastTransitionEntries = getLastTransitionDate(transaction, "up"); //pega a ultima data de entrada
    const lastTransitionExpensive = getLastTransitionDate(transaction, "down"); //pega a ultima data de saída
    const totalInterval = `01 a ${lastTransitionExpensive}`

    const total = entriesTotal - expensiveTotal; //Variavel para soma o total
    setHighlightData({
      entries: {
        //Formantando a entrada para o real
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransition: `Última entrada dia ${lastTransitionEntries}`
      },
      expensives: {
        //Formantando a saída para o real
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransition: `Última saída dia ${lastTransitionExpensive}`
      },
      total: {
        //Formantando o total para o real
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransition: totalInterval
      },
    });

    setIsLoading(false);
  }

  useEffect(() => {
    loadTransitions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransitions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Avatar
                  source={{
                    uri: "https://avatars.githubusercontent.com/u/69825217?v=4",
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>João</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData?.entries?.amount}
              lastTransition={highlightData?.entries?.lastTransition}
            />

            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData?.expensives?.amount}
              lastTransition={highlightData?.expensives?.lastTransition}
            />

            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransition={highlightData?.total?.lastTransition}
            />
          </HighlightCards>

          <Transitions>
            <Title>Listagem</Title>
            
            <TransitionsList
              data={transitions}
              keyExtractor={(item: DateListProps) => item.id.toString()}
              renderItem={({ item }: any) => <TransationCard data={item} />}
            />
          </Transitions>
        </>
      )}
    </Container>
  );
}
