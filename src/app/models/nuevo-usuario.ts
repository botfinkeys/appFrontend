export class NuevoUsuario {
    numCompte: string;
    password: string;
    telephone: string;
    constructor(numCompte: string,telephone: string, password: string) {
        this.numCompte = numCompte;
        
        this.telephone=telephone;
        this.password = password;
    }
  
}
