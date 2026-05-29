import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import {useState} from 'react';
import { FlatList } from 'react-native';

export default function App() {
  const [pais, setPais] = useState('');
  const [listaPaises, setListaPaises] = useState([]);
  const buscarPais = async () => {
    const resposta = await fetch(
    `https://restcountries.com/v3.1/name/${pais}`);
    const dados = await resposta.json();
    setListaPaises(dados);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TextInput
        style={styles.input}
        placeholder='Digite um país'
        value={pais}
        onChangeText={setPais}
      />

      <Pressable
        style={styles.button}
        onPress={buscarPais}>
        <Text
        style={styles.buttonText}>
          Buscar
        </Text>
      </Pressable>

      <FlatList
        data={listaPaises}
          renderItem={({ item }) => (
            <View>
              <Text><Text style={{ fontWeight: 'bold' }}>Nome Comum: </Text> 
              {item.translations.por.common} </Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Nome Oficial: </Text> 
              {item.name.official} </Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Nome em Russo: </Text> 
              {item.translations.rus.official} </Text>
              <Text><Text style={{ fontWeight: 'bold' }}>Mapas: </Text> 
              {item.maps.openStreetMaps} </Text>
              <Text style={{ fontWeight: 'bold' }}>Bandeira: </Text>
              <Image
                source={{ uri: item.flags.png }}
                style={{
                  width: 300,
                  height: 200
                }}
              />
            </View>
          )}
          keyExtractor={(item) => item.name.common}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494c4e',
    alignItems: 'center',
  },input: {
    width: '70%',
    borderColor: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    textAlign: 'center',
    borderRadius: 4
  },button: {
    width: '50%',
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 4
  },buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});
