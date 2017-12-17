export class User {
  constructor(public nome: string,
              public cognome: string,
              public email: string, // id dell'utente
              public eventi: string[], // eventi partecipa
              public password: string,
              public profilePicturePath: string,
              public descrizione: string) {
  }
}
