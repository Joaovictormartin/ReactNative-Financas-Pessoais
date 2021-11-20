import React from "react";

import { HighlightCard } from "../../components/HighlightCard";
import { TransationCard, TransationCardProps } from "../../components/TransationCard";

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Avatar,
  User,
  UserGreeting,
  UserName,
  IconLogout,
  HighlightCards,
  Transitions,
  Title,
  TransitionsList,
} from "./styles";

export interface DateListProps extends TransationCardProps {
  id: string;
}

export function Dashboard() {

  const data: DateListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date:"13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Hamburgueria Pizzy",
      amount: "R$ 59,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date:"10/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel do apartamento",
      amount: "R$ 1.200,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date:"27/03/2020"
    }
  ]

  return (
    <Container>
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

          <IconLogout name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrega"
          amount="R$ 17.400,00"
          lastTransition="Última entrada dia 13 de abril"
        />

        <HighlightCard
          type="down"
          title="Saídas"
          amount="- R$ 1.259,00"
          lastTransition="Última saída dia 03 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransition="01 à 16 de abril"
        />
      </HighlightCards>

      <Transitions>
        <Title>Listagem</Title>
        
        <TransitionsList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <TransationCard data={item}/>}
        />

      </Transitions>
    </Container>
  );
}
