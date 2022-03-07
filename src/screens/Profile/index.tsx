import React from "react";
import { View, TextInput, Text, Button } from "react-native";

export function Profile() {
  return (
    <View>
      <Text>Perfil</Text>

      <TextInput placeholder="Nome" autoCorrect={false} />
      <TextInput placeholder="Sobrenome" autoCorrect={false} />

      <Button title="Salvar" onPress={() => {}}/>
    </View>
  );
}
