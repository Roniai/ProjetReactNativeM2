import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Button, StyleSheet, Text, View } from 'react-native';

const url = 'http://10.0.2.2:8080/employe/';

export default function App() {
  const [data, setData] = useState([]);

  const getEmploye = () => {
    fetch(url)
      .then((res) => res.json())
      .then((resJson) => {
        setData(resJson);
      })
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getEmploye();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Mba misy raha ve?</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Text>{item.nom}</Text>
            </View>
          )
        }}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
