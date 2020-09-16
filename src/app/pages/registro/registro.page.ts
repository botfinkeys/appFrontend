import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { concatMap } from 'rxjs/operators';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nuevoUsuario: NuevoUsuario;
  loginUsuario: LoginUsuario;
  //numCompte = '';
 // telephone = ''+'00212';
  password = '';
  myForm:FormGroup;
  isLogged = false;
  registrationForm:FormGroup;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private router: Router
  ) {

   
    this.registrationForm = this.formBuilder.group({
      numCompte: '',
      telephone: ''
      
    });
      


   }

  

  ngOnInit() {
    this.testLogged();
  }
  showHideAutoLoader() {
    
    this.loadingController.create({
      message: 'please wait ...',
      duration: 1000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {

        this.password=Math.floor(100000 + Math. random() * 900000)+'';
        console.log(this.password);
       this.nuevoUsuario = new NuevoUsuario(this.registrationForm.get('numCompte').value, this.registrationForm.get('telephone').value, this.password);
       this.loginUsuario = new LoginUsuario(this.registrationForm.get('numCompte').value, this.password);
      // this.showHideAutoLoader();
       this.authService.registro(this.nuevoUsuario).pipe().subscribe(
         data => {
         /*concatMap (nuevoRes => this.authService.login(this.loginUsuario))
           this.tokenService.setToken(data.token);
           this.isLogged = true;*/
           this.presentToast('le compte est activé');
           this.router.navigate(['/login']);
         },
         err => {
           this.presentToast(err.error.mensaje);
         }
       );
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }
  ionViewWillEnter() {
    this.testLogged();
    this.vaciar();
  }

  onRegister() {
    console.log("  leng  :  "+(''+this.telephone).length)
  
	  

  
  }

  vaciar() {

    
    this.registrationForm = this.formBuilder.group({
      numCompte: '',
      telephone: ''+'00212'
      
    });
    //this.numCompte = '';
   // this.telephone = ''+'00212';
    this.password = '';
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  public errorMessages = {
    numCompte: [
      { type: 'required', message: '  Numero de compte est obligatoire' },
      { type: 'minlength', message: ' Exactement 9 caractère' },
      { type: 'maxlength', message: ' maximum 9 caractère' }
    ],
    telephone: [
      { type: 'required', message: '  le numero telephone est obligatoire ' },
      { type: 'pattern', message: '  Please enter un numero telephone reel commence par 00212 ' },
      { type: 'minlength', message: ' Entrer  14 chiffre exactement' },
      { type: 'maxlength', message: ' maximum 14 chiffre' }
    ]
  };

  get numCompte() {
    return this.registrationForm.get('numCompte');
  }
 
  
  get telephone() {
    return this.registrationForm.get('telephone');
  }



  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    this.vaciar();
  }

  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Attention!',
      message: 'Saisir un numero de telephone valide',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }


}
