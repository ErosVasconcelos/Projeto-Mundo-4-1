import { useState } from "react";
import { View, Text, TextInput, Button, Alert, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EditarFornecedor() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const getString = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) || "";

  const [novoNome, setNovoNome] = useState(getString(params.nome));
  const [novoEndereco, setNovoEndereco] = useState(getString(params.endereco));
  const [novoContato, setNovoContato] = useState(getString(params.contato));
  const [novaCategoria, setNovaCategoria] = useState(getString(params.categoria));
  const [imagemUri, setImagemUri] = useState(getString(params.imagem));

  const escolherNovaImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const salvarEdicao = () => {
    if (!novoNome || !novoEndereco || !novoContato || !novaCategoria) {
      Alert.alert("Erro", "Todos os campos devem ser preenchidos!");
      return;
    }

    Alert.alert("Sucesso", "Fornecedor atualizado com sucesso!");
    router.push("/listagem");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Fornecedor</Text>
      <TextInput style={styles.input} value={novoNome} onChangeText={setNovoNome} />
      <TextInput style={styles.input} value={novoEndereco} onChangeText={setNovoEndereco} />
      <TextInput style={styles.input} value={novoContato} onChangeText={setNovoContato} keyboardType="phone-pad" />
      <TextInput style={styles.input} value={novaCategoria} onChangeText={setNovaCategoria} />
      {imagemUri && <Image source={{ uri: imagemUri }} style={styles.imagem} />}
      <Button title="Alterar Imagem" onPress={escolherNovaImagem} />
      <Button title="Salvar Alterações" onPress={salvarEdicao} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  imagem: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
});
