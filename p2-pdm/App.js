import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable, Image } from 'react-native';
import {useState} from 'react';
import { FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  const [pais, setPais] = useState('');
  const [listaPaises, setListaPaises] = useState([]);
  const [tipoBusca, setTipoBusca] = useState('name');
  const buscarPais = async () => {
    const resposta = await fetch(
    `https://restcountries.com/v3.1/${tipoBusca}/${pais}`);
    const dados = await resposta.json();
    setListaPaises(dados);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Picker
        selectedValue={tipoBusca}
        style={{
          width: 200,
          backgroundColor: 'white',
          marginBottom: 10
        }}
        onValueChange={(itemValue) =>
          setTipoBusca(itemValue)
        }
      >

        <Picker.Item
          label="Buscar por País"
          value="name"
        />

        <Picker.Item
          label="Buscar por Capital"
          value="capital"
        />

      </Picker>

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

      {tipoBusca === 'name' && (
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
      )}
      {tipoBusca === 'capital' && (
        <FlatList
          data={listaPaises}
            renderItem={({ item }) => (
              <View>
                <Text><Text style={{ fontWeight: 'bold' }}>Nome Comum: </Text> 
                {item.translations.por.common} </Text>
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
      )}
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
