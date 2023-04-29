import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import PostCardItem from './src/components/PostCardItem';

/*Lancer dans un émulateur*/
/*1.Activer WIFI dans l'Emulateur
  *2.http://10.0.2.2:<port> => fait référence à http://localhost:<port> de votre machine*/
/*private String url = "http://10.0.2.2:8000/api/employe";*/
/*Lancer dans un smartphone Android*/
/*private String url = "http://192.168.43.206:8000/api/employe; //Adresse IP WIFI*/
const url = 'http://10.0.2.2:8080/employe/';

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getEmploye = async () => {
    setLoading(true)
    await fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .catch(e => console.log(e))
    setLoading(false)
  }

  useEffect(() => {
    getEmploye();
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        onRefresh={getEmploye}
        renderItem={({ item }) => (
          <PostCardItem
            numero={item.numero}
            nom={item.nom}
            nbjours={item.nbjours}
            tauxjournalier={item.tauxjournalier}
            /* onEdit={() => edit(item.id, item.numero, item.nom, item.nbjours, item.tauxjournalier)}
            onDelete={() => deleteEmploye(item.id)} */
          />
        )}
      />
    </SafeAreaView>
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
