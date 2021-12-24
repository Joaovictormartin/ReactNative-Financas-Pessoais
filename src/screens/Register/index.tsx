import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import { Modal, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";

import * as Yup from "yup";
import uuid from 'react-native-uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useAuth } from '../../hooks/Auth';

import { Button } from "../../components/Forms/Button";
import { InputForm } from "../../components/Forms/InputForm";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { TransactionTypesButton } from "../../components/Forms/TransactionTypesButton";


import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  WrapperButton,
  TransactionTypes,
} from "./styles";

interface FormDate {
  name: string;
  amount: number;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  amount: Yup.number()
    .typeError("Informe um valor número")
    .positive("O valor não pode ser negativo")
    .required("Preço é obrigatório"),
});

export function Register() {
  const [transactionTypes, setTransactionTypes] = useState("");
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
    icon: "",
    color: "",
  });

  const navigation = useNavigation();
  const { user } = useAuth();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleTransactionSelect(type: "up" | "down") {
    setTransactionTypes(type);
  }

  function handleOpenSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormDate) {
    if (!transactionTypes) {
      return Alert.alert("Atenção", "Selecione o tipo da transação");
    }

    if (category.key === "category") {
      return Alert.alert("Atenção", "Selecione a categoria");
    }

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionTypes,
      category: category,
      date: new Date()
    };
 
    try {
      const dataTransactionKey = `@gofinances:transactions_user:${user.id}`; //key AsyncStorage
      const data = await AsyncStorage.getItem(dataTransactionKey);   //pega o ultimo dado do AsyncStorage
      const currentData = data ? JSON.parse(data) : [];              //converte para JSON

      const dataFormatted = [                                        //junta o ultimo com o new
        ...currentData,
        newTransaction,
      ];

      await AsyncStorage.setItem(dataTransactionKey, JSON.stringify(dataFormatted)); //salva o dado com a nova transaction

      reset();
      setTransactionTypes('');
      setCategory({
        key: 'category',
        name: 'Categoria',
        icon: "",
        color: "",
      })

      //@ts-ignore
      navigation.navigate('Listagem');

    } catch (err) {
      Alert.alert("Aviso", "Não foi possível salvar");
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionTypes>
              <TransactionTypesButton
                type="up"
                title="Income"
                isActive={transactionTypes === "up"}
                onPress={() => {
                  handleTransactionSelect("up")
                }}
              />
              <TransactionTypesButton
                type="down"
                title="Outcome"
                isActive={transactionTypes === "down"}
                onPress={() => {
                  handleTransactionSelect("down")
                }}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategory}
            />
          </Fields>
          
          <WrapperButton>
            <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
          </WrapperButton>
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
