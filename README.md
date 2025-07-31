# ProjetReactNativeM2
## Prérequis :
- Télécharger et installer Java puis configurer : [Comment configurer java](https://www.lemagit.fr/conseil/Bien-debuter-comment-parametrer-JAVA_HOME-dans-Windows)
- Télécharger et installer Android Studio
- Créer un émulateur (ou AVD) : [Créer et gérer des appareils virtuels](https://developer.android.com/studio/run/managing-avds?hl=fr)
- Activer le mode débogage de votre téléphone si vous ne voulez pas utiliser un émulateur : [Activer le mode débogage Android](https://developer.android.com/codelabs/basic-android-kotlin-training-run-on-mobile-device?hl=fr#0)

## Backend : (JAVA Spring Boot)
Repository : DAO
Model : Modèle (Hibernate)
### Configurer PostgreSQL :
- Télécharge et installer PostgreSQL
- Utiliser comme mot de passe **admin** (nom d'utilisateur par défaut : **postgres**)
- Lancer pgAdmin
- Créer une base de données vice nommé : **m2reactnat_db**
- Créer une table nommée : **employe**
- Créer les colonnes suivantes : {
  id : integer
  nbjours : integer
  nom : character varying (50)
  numero : integer
  tauxjournalier : integer
}
**NB :** Pour faire un test de l'endpoint, n'oublier pas de télécharger et d'installer **Postman**
//POST Parameter Body
{
    "numero":,
    "nom":"",
    "nbjours":,
    "tauxjournalier":
}
// Endpoint POST : http://localhost:8080/employe/create
// Endpoint GET : http://localhost:8080/employe/

### Configurer et lancer l'application :
- Build apps : Installer tous les dependances
```cmd
mvn compile
```

- Lance le projet
```cmd
cd backend-reactnative
cd backreact
mvn spring-boot:run
```

## Frontend : React Native
### Configurer le port etl'IP :
Vous avez le choix entre utiliser un émulateur ou utiliser directement votre appareil (device).
Aller dans le fichier **App.js** pour configurer l'url
**1-Utiliser un émulateur :** 
- Activer WIFI dans l'Emulateur
- Changer l'url :
```
const url = 'http://10.0.2.2:8080/employe';
```
**NB :** http://10.0.2.2:<port> => fait référence à http://localhost:<port> de votre machine*/

**2-Utiliser un appareil Andoid (device) :**
- Lier l'ordinateur et un téléphone à une même réseau
- Lancer la ligne de commande "ipconfig" pour connaître votre Adresse IP
```cmd
ipconfig
```
- Changer l'url (Par example : :
```cmd
const url = '[http://adresse_ip:8080/employe](http://192.168.1.127:8080/employe)';
```
**NB : ** http://adresse_ip:<port> => fait référence à http://localhost:<port> de votre machine */

### Configurer et lancer l'application :
- Build apps : Installer tous les dependances
```cmd
npm install
```

- Lance le projet
```cmd
cd frontend-reactnative
cd frontreact
npm run android
```
