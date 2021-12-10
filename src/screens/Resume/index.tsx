import React, { useState, useEffect, useCallback } from "react";
import { VictoryPie } from "victory-native";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "styled-components";

import { TransationCardProps } from "../../../interface/TransationCardProps";
import { dataTransactionKey } from "../../utils/asyncStorageKeys";
import { CategoryData } from "../../../interface/ResumeProps";
import { HistoryCar } from "../../components/HistoryCar";
import { categories } from "../../utils/categories";

import {
  Container,
  LoadContainer,
  Header,
  Title,
  Content,
  ChartContainer,
} from "./styles";
import { color } from "react-native-reanimated";

export function Resume() {
  const { colors } = useTheme();

  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    const response = await AsyncStorage.getItem(dataTransactionKey); //pega os dados do AsyncStorage
    const responseFormatted = response ? JSON.parse(response) : []; //transforma em obj

    const expensives = responseFormatted.filter(
      //filtra somente os types negativos
      (item: TransationCardProps) => item.transactionTypes === "down"
    );

    //calcula o total de gastos
    const expensivesTotal = expensives.reduce(
      (acumullator: number, expensives: TransationCardProps) => {
        return acumullator + Number(expensives.amount);
      },
      0
    );

    const totalByCategory: CategoryData[] = []; //cria o arry de categorias

    //primeiro forEach na lista de categoria que está no uteis
    categories.forEach((category) => {
      let categorySum = 0;

      //segundo forEach na lista q foi filtrada os negativos
      expensives.forEach((expensive: TransationCardProps) => {
        if (expensive.category.name === category.name) {
          //compara os nomes
          categorySum += Number(expensive.amount); //soma todos todos os valores das categorias iguais
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          //transforma para real$
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        //add no arry
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });

        setIsLoading(false);
      }
    });
    setTotalByCategory(totalByCategory); //set o valor no useState
  }

  useEffect(() => {
    loadData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const loadingContainer = () => {
    return (
      <LoadContainer>
        <ActivityIndicator 
          color={colors.primary}
          size="large"
        />
      </LoadContainer>
    )
  }

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? loadingContainer() : (
        <Content>
          <ChartContainer>
            <VictoryPie
              data={totalByCategory} //fonte de dados
              x="percent" //label
              y="total" //valor
              colorScale={totalByCategory.map((item) => item.color)} // cor interna do gráfico
              labelRadius={100} //distancia dos labels
              style={{
                labels: {
                  fontSize: RFValue(15),
                  fontWeight: "bold",
                  fill: colors.shape,
                },
              }}
            />
          </ChartContainer>

          {totalByCategory.map((item) => (
            <HistoryCar
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
