import React, { useState } from "react";
import { Modal } from "react-native";

import { Input } from "../../components/Forms/Input";
import { Button } from "../../components/Forms/Button";
import { TransactionTypesButton } from "../../components/Forms/TransactionTypesButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export function Register() {
  const [transactionTypes, setTransactionTypes] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [ category, setCategory ] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleTransactionSelect(type: "up" | "down") {
    setTransactionTypes(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypesButton
              type="up"
              title="Income"
              isActive={transactionTypes === "up"}
              onPress={() => handleTransactionSelect("up")}
            />
            <TransactionTypesButton
              type="down"
              title="Outcome"
              isActive={transactionTypes === "down"}
              onPress={() => handleTransactionSelect("down")}
            />
          </TransactionTypes>

          <CategorySelectButton 
            title={category.name}
            onPress={handleOpenSelectCategory}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </Container>
  );
}
