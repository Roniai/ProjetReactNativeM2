import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Surface, Title, TextInput } from 'react-native-paper';
import PostCardItem from './src/components/PostCardItem';
import ModalView from './src/components/ModalView';

/*Lancer dans un émulateur*/
/*1.Activer WIFI dans l'Emulateur
  *2.http://10.0.2.2:<port> => fait référence à http://localhost:<port> de votre machine*/
/*private String url = "http://10.0.2.2:8000/api/employe";*/
/*Lancer dans un smartphone Android*/
/*private String url = "http://192.168.43.206:8000/api/employe; //Adresse IP WIFI*/
const url = 'http://10.0.2.2:8080/employe';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  /* Tous les attributs de l'entité Employe */
  const [id, setId] = useState(0);
  const [numero, setNumero] = useState("0");
  const [nom, setNom] = useState('');
  const [nbjours, setNbjours] = useState("0");
  const [tauxjournalier, setTauxjournalier] = useState("0");

  /* Récuperer tous les employés */
  const getEmploye = async () => {
    setLoading(true)
    await fetch(url + "/")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch(e => console.log(e))
    setLoading(false)
  }

  /* Ajouter un nouveau Employé */
  const addEmploye = (numero, nom, nbjours, tauxjournalier) => {
    fetch(url + "/create", {
      method: "POST",
      headers,
      body: JSON.stringify({
        "numero": numero,
        "nom": nom,
        "nbjours": nbjours,
        "tauxjournalier": tauxjournalier,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('post:', resJson)
        updateEmploye()
      }).catch(e => { console.log(e) })
  }

  /* Modifier un nouveau Employé */
  const editEmploye = (id, numero, nom, nbjours, tauxjournalier) => {
    fetch(url + "/update" + `/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        "numero": numero,
        "nom": nom,
        "nbjours": nbjours,
        "tauxjournalier": tauxjournalier,
      })
    }).then((res) => res.json())
      .then(resJson => {
        console.log('updated:', resJson)
        updateEmploye()
      }).catch(e => { console.log(e) })
  }

  /* Réinitialisation des données */
  const updateEmploye = () => {
    getEmploye()
    setVisible(false);
    setId(0)
    setNumero("0")
    setNom('')
    setNbjours("0")
    setTauxjournalier("0")
  }

  const edit = (id, numero, nom, nbjours, tauxjournalier) => {
    setVisible(true)
    setId(id)
    setNumero(numero)
    setNom(nom)
    setNbjours(nbjours)
    setTauxjournalier(tauxjournalier)
  }

  useEffect(() => {
    getEmploye();
  }, [])

  return (
    <SafeAreaView style={styles.container}>

      <StatusBar style="auto" />
      {/* ############## En tête ############## */}
      <Surface style={styles.header}>
        <Title>Liste des Employés</Title>
        <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
          <Text style={styles.buttonText}>Ajout</Text>
        </TouchableOpacity>
      </Surface>

      {/* ############## Corps ############## */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id + index.toString()}
        refreshing={loading}
        /* onRefresh={getEmploye} */
        renderItem={({ item }) => (
          <PostCardItem
            numero={item.numero}
            nom={item.nom}
            nbjours={item.nbjours}
            tauxjournalier={item.tauxjournalier}
            onEdit={() => edit(item.id, item.numero, item.nom, item.nbjours, item.tauxjournalier)}
            /* onDelete={() => deleteEmploye(item.id)} */
          />
        )}
      />

      {/* ############## Fenêtre de formulaire ############## */}
      <ModalView
        visible={visible}
        title="Ajout d'un employé"
        onDismiss={() => setVisible(false)}
        onSubmit={() => {
          if (id && numero && nom && nbjours && tauxjournalier) {
            editEmploye(parseInt(id), parseInt(numero), nom, parseInt(nbjours), parseInt(tauxjournalier))
          } else {
            addEmploye(parseInt(numero), nom, parseInt(nbjours), parseInt(tauxjournalier))
          }
        }}
        cancelable
      >
        <TextInput
          label="Numero"
          value={numero.toString()}
          onChangeText={(text) => setNumero(text)}
          mode="outlined"
        />
        <TextInput
          label="Nom"
          value={nom.toString()}
          onChangeText={(text) => setNom(text)}
          mode="outlined"
        />
        <TextInput
          label="Nombre de jours"
          value={nbjours.toString()}
          onChangeText={(text) => setNbjours(text)}
          mode="outlined"
        />
        <TextInput
          label="Taux journalier"
          value={tauxjournalier.toString()}
          onChangeText={(text) => setTauxjournalier(text)}
          mode="outlined"
        />
      </ModalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 0,
    padding: 16,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'steelblue',
  },
  buttonText: {
    color: 'white'
  },
});
