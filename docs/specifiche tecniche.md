# Piattaforma IoT

- [Piattaforma IoT](#piattaforma-iot)
  * [Introduzione](#introduzione)
  * [Funzionalità](#funzionalit-)
    + [Impianti](#impianti)
    + [Nodi](#nodi)
    + [Sensori](#sensori)
    + [MQTT](#mqtt)
    + [Allarmi e soglie](#allarmi-e-soglie)
    + [Interfaccia grafica](#interfaccia-grafica)
  * [Autenticazione ed autorizzazione](#autenticazione-ed-autorizzazione)
  * [Backend](#backend)
  * [Hosting](#hosting)

## Introduzione

**Obiettivo**: creazione di un'applicazione web per lo stoccaggio, la visualizzazione ed il trasferimento di dati derivanti da una rete di dispositivi (ciascuno connesso ad un certo numero di sensori) ed acquisiti tramite protocollo MQTT.

## Funzionalità

### Impianti

- la rete di dispositivi potrebbe dover monitorare più impianti di una certa azienda
- l'app dovrà quindi essere in grado di visualizzare gli impianti registrati e permettere di inserirne di nuovi
- nella visualizzazione impianti dovranno essere elencati anche tutti i dispositivi ad essi associati

### Nodi

- arruolamento di nuovi nodi
  - inserimento manuale del codice identificativo
  - QR code
  
- modifica delle informazioni

- spegnimento volontario di un nodo

- **informazioni aggiuntive**
  - <u>ogni nodo</u> sarà dotato di <u>un solo tipo di sensore</u> per una determinata grandezza fisica 
  
    <u>es</u>: un nodo non potrà avere due sensori di temperatura installati al suo interno
  
  - la locazione di un nodo all'interno di un impianto <u>non viene memorizzata</u> nella piattaforma: l'utente dovrà assegnare un nome significativo al nodo affinchè ne riconosca posizione e tipologia

### Sensori

- tipologia
  - temperatura
  - pressione
  - umidità
  - CO2
  - luminosità (?)

### MQTT

- protocollo utilizzato per scambiare i dati acquisiti da ogni nodo con i servizi backend della piattaforma

- tipi di payload

  ```json
  // Payload nominale
  "payload": {
      "date": "18/01/2023",
      "node_id": "12345",
      "battery": "{1,2,3,4,5}",	// livello batteria nodo
      "values": {					// valori acquisiti dai sensori
          "temp": 23.5,				// temperatura
          "press": 46.0,				// pressione
          "hum": 12.3,				// umidità
          "co2": 326.45,				// CO2
          "lum": 125.67,				// luminosità
      }
  }
  
  // Payload posizionale
  "payload": "18/01/2023,12345,23.5,..."
  ```

### Allarmi e soglie

- diversificare tipi di allarme
  - **permanenti** -> disabilitabili solo dall'utente
  - **temporanei** -> validi fino a che non si rientra nel range accettabile
- **esempi di allarmi**
  - batteria di un nodo scarica (*allarme temporaneo?*)
  - disconnessione di un nodo (*allarme permanente?*)
    - persa connessione MQTT
- possibilità di notificare gli utenti tramite mail quando scatta un allarme
- impostazione di un **set point**
  - soglia oltre la quale (o sotto la quale) può scattare un allarme
  - il backend pubblica su un topic MQTT (canale comandi) -> <u>comunicazione bidirezionale</u>
- <u>**idea**</u>: impostazione di regole automatiche
  - <u>es</u>: se la soglia sale o scende sotto un certo valore, allora spegni il nodo X

### Interfaccia grafica

- deve essere <u>responsive</u>, ovvero capace di adattarsi a varie tipologie di schermi/dispositivi
- deve permettere la visualizzazione dei dati acquisiti dai sensori, in particoalre tramite l'utilizzo di <u>grafici</u> opportuni
  - le grandezze fisiche devono essere visualizzate sullo stesso grafico (ovviamente con possibilità di mascherarne alcune)
  - ogni grandezza dovrà avere il <u>proprio asse delle ordinate</u> (sempre visibile), mentre quello delle <u>ascisse è comune</u> a tutte e <u>rappresenta il tempo</u> trascorso
- deve consentire di <u>scaricare i dati in locale</u> nell'intervallo temporale desiderato nei formati `.xlsx`, `.csv` e `.json`
- deve permettere la <u>massima personalizzazione</u> possibile per ogni caso d'uso con i minimi cambiamenti necessari da effettuare

## Autenticazione ed autorizzazione

- la piattaforma deve consentire l'accesso solo ad utenti autenticati al sistema
- saranno presenti diversi livelli di autenticazione:
  - **utente**: generalmente può soltanto visualizzare dati e schermate senza modificare nulla
  - **admin**: gestisce utenti, impianti, dispositivi, allarmi e soglie
  - **gestore** (?): utente con qualche autorizzazione in più (<u>es</u>: permesso di marcare un allarme come "*solved*")
- autenticazione mediante username e password
- servizio per recupero password tramite mail (?)

## Backend

- tecnologie impiegate:
  - Node.js `v18.13.0`
  - MongoDB `v6.0.4`
  - Mosquitto `v2.0.15`
- dati utente da memorizzare:
  - username
  - email
  - password
  - ruolo

## Hosting

Per la comparazione tra i vari servizi di hosting esaminati vedere [qui](hosting/valutazione_hosting.md).
