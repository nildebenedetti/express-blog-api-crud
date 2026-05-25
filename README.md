# Esercizio su NodeJS Routes

Potete partire dall'esercizio di ieri oppure, come consigliato rifare tutto fa capo per capire se siamo abbastanza abili a creare un progetto NodeJS.

1. Fare lo scaffolding delle cartelle:
routers per le Rotte delle nostra risorse
controllers che conterra le funzioni di risoluzione delle varie rotte

2. Creare un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità post.

All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

Tutte le risposte saranno dei testi (in formato JSON) che confermeranno l’operazione che il server deve eseguire, secondo le convenzioni REST.

Ad esempio: 

Se viene chiamata /posts col verbo GET ci aspettiamo per esempio
{
  messagge: "Lista dei post"
}

Se viene chiamato /posts/1 col verbo DELETE ci aspettiamo per esempio
{
  messagge: “Cancellazione del post 1”
}


e via dicendo…

Registrare il router dentro app.js con il prefisso posts/.

Nota:

Avete anche l’array dei post che vi abbiamo fornito, salvatelo da qualche parte.
Ci servirà per i prossimi step.
Per oggi vi può servire in caso vogliate provare i bonus.

## Bonus
Provare a restituire la lista dei post dalla rotta index, in formato json
Provare a restituire un singolo post dalla rotta show, sempre in formato json con i controlli in caso l'utente inserisca dei dati non corretti

## Super Bonus
Fare una rotta che invia una mail, come nell'esempio visto a lezione e inziare a spammare le il mondo 😈 
