import { View, Text, FlatList, Image, Button, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useFornecedores } from "./FornecedoresContext";

export default function ListagemScreen() {
  const { fornecedores } = useFornecedores();
  const router = useRouter();

  // Estado para pesquisa e filtro
  const [pesquisa, setPesquisa] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");

  // Filtrando fornecedores dinamicamente
  const fornecedoresFiltrados = fornecedores.filter((fornecedor) => {
    const nomeCorrespondente = fornecedor.nome.toLowerCase().includes(pesquisa.toLowerCase());
    const categoriaCorrespondente = categoriaSelecionada ? fornecedor.categoria === categoriaSelecionada : true;
    return nomeCorrespondente && categoriaCorrespondente;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Fornecedores</Text>

      {/* Barra de pesquisa */}
      <TextInput
        style={styles.input}
        placeholder="Pesquisar fornecedores..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {/* Filtro de categoria */}
      <Picker
        selectedValue={categoriaSelecionada}
        onValueChange={(itemValue: string) => setCategoriaSelecionada(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todas as categorias" value="" />
        <Picker.Item label="Alimentos" value="Alimentos" />
        <Picker.Item label="Roupas" value="Roupas" />
        <Picker.Item label="Eletrônicos" value="Eletrônicos" />
      </Picker>

      <FlatList
        data={fornecedoresFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imagem && <Image source={{ uri: item.imagem }} style={styles.imagem} />}
            <View style={styles.infoContainer}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.texto}>📍 {item.endereco}</Text>
              <Text style={styles.texto}>📞 {item.contato}</Text>
              <Text style={styles.texto}>📌 {item.categoria}</Text>
              <Button
                title="Editar"
                onPress={() => router.push({ pathname: "/editar", params: { id: item.id } })}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f9f9f9" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { height: 40, borderColor: "#ccc", borderWidth: 1, marginBottom: 10, paddingLeft: 8, borderRadius: 5 },
  picker: { height: 50, marginBottom: 10 },
  card: { flexDirection: "row", padding: 15, backgroundColor: "white", marginVertical: 5, borderRadius: 5, alignItems: "center" },
  imagem: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  infoContainer: { flex: 1 },
  nome: { fontSize: 18, fontWeight: "bold" },
  texto: { fontSize: 14, color: "#555" },
});
