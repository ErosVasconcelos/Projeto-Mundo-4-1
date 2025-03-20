import { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useFornecedores } from "./FornecedoresContext";

export default function CadastroScreen() {
  const router = useRouter();
  const { adicionarFornecedor } = useFornecedores();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [contato, setContato] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState<string | undefined>();

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const cadastrarFornecedor = () => {
    if (!nome || !endereco || !contato || !categoria) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }

    const novoFornecedor = { id: Date.now().toString(), nome, endereco, contato, categoria, imagem };
    adicionarFornecedor(novoFornecedor);
    Alert.alert("Sucesso", "Fornecedor cadastrado!");
    router.push("/listagem");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Fornecedor</Text>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Endereço" value={endereco} onChangeText={setEndereco} />
      <TextInput style={styles.input} placeholder="Contato" value={contato} onChangeText={setContato} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Categoria" value={categoria} onChangeText={setCategoria} />
      <Button title="Selecionar Imagem" onPress={escolherImagem} />
      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
      <Button title="Cadastrar" onPress={cadastrarFornecedor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "white" },
  titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
  imagem: { width: 100, height: 100, alignSelf: "center", marginVertical: 10 },
});
