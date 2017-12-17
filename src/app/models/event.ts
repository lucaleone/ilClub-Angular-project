export class Event {
  constructor(public key: string,
              public  data: string,
              public  id: number,
              public  descrizione: string,
              public  immagine: string,
              public  ora: string,
              public  owner: string,
              public  partecipanti: string,
              public  sede: string,
              public  titolo: string) {
  }
}
