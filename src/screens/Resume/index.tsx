import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TransationCardProps } from "../../../interface/TransationCardProps";
import { dataTransactionKey } from "../../utils/asyncStorageKeys";
import { HistoryCar } from "../../components/HistoryCar";
import { categories } from "../../utils/categories";

import { Container, Header, Title, Content } from "./styles";

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem(dataTransactionKey);  //pega os dados do AsyncStorage
    const responseFormatted = response ? JSON.parse(response) : [];   //transforma em obj

    const expensives = responseFormatted.filter(                      //filtra somente os types negativos
      (item: TransationCardProps) => item.transactionTypes === "down"
    );

    const totalByCategory: CategoryData[] = [];                       //cria o arry de categorias

    categories.forEach((category) => {                                //primeiro forEach na lista de categoria que está no uteis
      let categorySum = 0;

      expensives.forEach((expensive: TransationCardProps) => {        //segundo forEach na lista q foi filtrada os negativos
        if (expensive.category.name === category.name) {              //compara os nomes
          categorySum += Number(expensive.amount);                    //soma todos todos os valores das categorias iguais
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString("pt-BR", {           //transforma para real$
          style: "currency",
          currency: "BRL",
        });

        totalByCategory.push({                                        //add no arry
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      }
    });
    setTotalByCategory(totalByCategory);                              //set o valor no useState
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {
          totalByCategory.map((item) => (
            <HistoryCar
              key={item.key}
              title={item.name}
              amount={item.total}
              color={item.color}
            />
          ))
        }
      </Content>
    </Container>
  );
}
