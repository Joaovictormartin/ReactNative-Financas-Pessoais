import React from "react";

import { TransationCardProps } from '../../../interface/TransationCardProps'

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

interface Props {
  data: TransationCardProps
}

export function TransationCard({ data }: Props) {
  return (
    <Container>
      <Title>
        {data.name}
      </Title>

      <Amount transactionTypes={data.transactionTypes}>
        {data.transactionTypes === 'down' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
