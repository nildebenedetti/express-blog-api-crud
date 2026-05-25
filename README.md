# Esercizio su NodeJS CRUDS

Esercizio
Milestone 1

Mettete il file posts, quello in allegato (è diverso da quello di ieri, sono stati aggiunti dei parametri) nella cartella data

Assicuriamoci di aver creato le cartelle:
controllers per i controllers definiti nel nostro progetto.
routers con il nostro instradatore per i post.

Milestone 2

Continuiamo le logiche delle nostre CRUD:

Index dovrà restituire la lista dei post in formato JSON (controllare se gli status HTTP restituito sono corretti)
Show dovrà restituire un singolo post in formato JSON (stessa cosa per gli stati)
Destroy dovrà eliminare un singolo post dalla lista (dopo aver ovviamente controllato l'esistenza). Stampatevi in console il menu dopo la rimozione, cosi da assicurarvi che il post è stato rimosso.

Testate su Postman i vari casi limite (valori errati, id negativi, id non presenti ecc...)

Bonus
Implementare almeno 2 filtri nella rotta index per permettere di effettuare delle ricerche o dei filtri nei campi (avete tanti parametri su cui applicare delle ricerche).
Testare con Postman la correttezza dei filtri inseriti

Super Bonus
Importare uno dei due middleware nel file server.js

app.use(express.urlencoded()); // Utile per le richieste application/x-www-form-urlencoded

o
app.use(express.json()); // Utile per le richieste application/json


Modificare la rotta Create per leggere i dati contenuti in request.body e stamparli in console.
Testare l'invio dei dati tramite Postman inviado i dati nel formato che abbiamo importato
Restituire nella risposta i soliti campi passati nella richiesta di creare (echo-back)

Esempio risposta:

{
    "messaggio": "Stai provando a creare dei dati",
    "dati": {
        "title": "...",
        "content": "...",
        ...

    }
}