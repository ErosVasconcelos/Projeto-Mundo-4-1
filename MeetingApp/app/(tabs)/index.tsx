import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FornecedoresProvider } from "../FornecedoresContext";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <FornecedoresProvider>
      <View style={styles.container}>
        <Text style={styles.titulo}>Bem-vindo ao Meeting!</Text>

        <View style={styles.botaoContainer}>
          <Button title="Cadastrar Fornecedor" onPress={() => router.push("/cadastro")} />
        </View>

        <View style={styles.botaoContainer}>
          <Button title="Listar Fornecedores" onPress={() => router.push("/listagem")} />
        </View>

      </View>
    </FornecedoresProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  botaoContainer: {
    width: "80%",
    marginBottom: 10, 
  },
});

