# Piattaforma IoT

 ## Introduzione

- **Obiettivo**: creazione di un'applicazione web per lo stoccaggio, la visualizzazione ed il trasferimento di dati derivanti da una rete di dispositivi (avente ciascuno un certo numero di sensori) ed acquisiti tramite protocollo MQTT.

## Funzionalità

### Nodi

- arruolamento di nuovi nodi
  - inserimento manuale del codice identificativo
  - QR code
- modifica delle informazioni
- spegnimento volontario di un nodo
- **informazioni aggiuntive**
  - ogni dispositivo sarà dotato di <u>un solo tipo</u> di sensore per una determinata grandezza fisica (es: un nodo non potrà avere due sensori di temperatura contemporaneamente)

### MQTT

- 

- tipi di payload

  ```json
  "payload": {
      "date": "18/01/2023",
      "node": {
          "id": "12345",
          "batt": "{1,2,3,4,5}",
          "temp": 23.5,
          "press": 46.0,
          "hum": 12.3
      }
  }
  
  "payload": "18/01/2023,12345,23.5," -> payload posizionale
  ```

- elenco dei sensori (con locazione)
  - batteria
  - attivo/disattivo -> perso connessione con MQTT

### Allarmi e soglie

- impostazione di un set point
  - soglia oltre la quale (o sotto la quale) può scattare un allarme
  - il backend pubblica su un topic MQTT -> <u>comunicazione bidirezionale</u>
  - diversificare tipi di allarme
    - **permanenti** -> disabilitabili solo dall'utente
    - **temporanei** -> validi fino a che non si rientra nel range accettabile
  - <u>idea</u>: impostazione di regole automatiche
    - ex: se la soglia sale/scende sotto un certo valore -> spegni il nodo X

## Hosting

