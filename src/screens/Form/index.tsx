import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { HeaderForm } from "../../components/HeaderForm";

export function Form() {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  async function handleNew() {
    try {
      const id = uuid.v4();

      const newData = {
        id,
        name,
        user,
        password,
      };

      await AsyncStorage.setItem(
        "@savepass:passwords",
        JSON.stringify(newData)
      );
      Toast.show({
        type: "success",
        position: "top",
        text1: "Senha salva com sucesso!",
        visibilityTime: 3000,
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        position: "top",
        text1: "Erro ao salvar a senha!",
        visibilityTime: 3000,
      });
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.content}>
        <ScrollView>
          <HeaderForm />

          <View style={styles.form}>
            <Input label="Nome do serviço" onChangeText={setName} />
            <Input
              label="E-mail ou usuário"
              autoCapitalize="none"
              onChangeText={setUser}
            />
            <Input label="Senha" secureTextEntry onChangeText={setPassword} />
          </View>

          <View style={styles.footer}>
            <Button title="Salvar" onPress={handleNew} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
