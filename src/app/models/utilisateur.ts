import { Compte } from 'src/app/models/compte';

export class Utilisateur {
    id?: number;
    numCompte: string;
    compte: Compte;
    password : string;
    telephone: string;
    nbsession:string;
    modipass:boolean;
    Utilisateur(numCompte: string,compte: Compte,password : string,telephone: string,nbsession:string,modipass:boolean) {
        this.numCompte=numCompte;
        this.compte=compte;
        this.password=password;
        this.telephone=telephone;
        this.nbsession=nbsession;
        this.modipass=modipass;
    }
    
}
