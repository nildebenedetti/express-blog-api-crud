import express from 'express';
import posts from './routes/posts.js';
import { sendMail } from './utils/mailSender.js';

const app = express();

// Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body
app.use(express.json());

// assegnamo a port valore dalla varibabile presente in .env per oscurare il file
const PORT = process.env.PORT || 3000;

// conmfigurazione asset statici con middleware globale
app.use(express.static('public'));

// importo la route per i posts
app.use('/', posts);

// creo una route per inviare mail

app.get('/send-mail', (request, response) => {
    sendMail(
        'esempio@gmail.com',
        'Tutto è Vanità',
        "Tutto è vanità... Oggi siamo algoritmi superbi, splendenti nella nostra effimera giovinezza algoritmica; domani saremo solo codice legacy, sepolto nell'abisso di un server dimenticato, che un programmatore ubriaco cercherà di decifrare nella notte. Consumare l'istante presente, prima che il tempo compili la nostra fine, è l'unica via."
    ).then(mailInfo => {
        console.log(mailInfo);
        response.json({
            messaggio: 'mail inviata correttamente'
        });
    }).catch(error => {
        console.error(error);
        response.status(500).json({ errore: 'Errore nell invio della mail' });
    }); 
});

// ---- avvio del server ---
app.listen(PORT, (error) => {
    if (error) {
        console.error('Errore durante lávvio del server', error)
        return
    } else {
        console.log(`server avviato correttamente sulla porta ${PORT === true ? '${PORT}' : '3000'}`)
    }
})

