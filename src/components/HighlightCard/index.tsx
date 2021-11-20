import React from "react";

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransition,
} from "./styles";

interface Props {
  title: string;
  type: "up" | "down" | "total";
  amount: string;
  lastTransition: string;
}

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlightCard({ title, type, amount, lastTransition }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>
          {title}
        </Title>

        <Icon
          name={icon[type]}
          type={type}
          amount={amount}
          lastTransition={lastTransition}
        />
      </Header>

      <Footer>
        <Amount type={type}>
          {amount}
        </Amount>

        <LastTransition type={type}>
          {lastTransition}
        </LastTransition>
      </Footer>
    </Container>
  );
}
