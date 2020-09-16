import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editpassword',
  templateUrl: './editpassword.page.html',
  styleUrls: ['./editpassword.page.scss'],
})

export class EditpasswordPage implements OnInit {

  msjOK = '';
  msjErr = '';
  //password = '';
  //password2= '';
  nuevoUsuario: NuevoUsuario=new NuevoUsuario('', '','');
  userName = 'pepito';
  utilisateur: Utilisateur;
  localuser='';
  nblogin:string;
  firstlogin=false;
  localpassword='';
  registrationForm:FormGroup;


  constructor(private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router) 
    {

      this.registrationForm = this.formBuilder.group({
        password: '',
        password2: ''
        
      });


    } 

    ionViewWillEnter() {

      this.registrationForm = this.formBuilder.group({
        password: '',
        password2: ''
        
      });

      this.nuevoUsuario.numCompte=this.tokenService.getUserName();

    this.authService.infomrations(this.tokenService.getUserName()).subscribe(
      data => {
        this.firstlogin=data.modipass;
        
      

      },
      err => {
        console.log( err.error.message);
      }
    );
    

    this.authService.infomrations(this.tokenService.getUserName()).subscribe(
      data => {
        this.utilisateur = data;
        this.utilisateur.compte=data.compte;
        console.log("get info");
        console.log(this.utilisateur.compte);
        console.log("get info 2");
        console.log(this.utilisateur);
        console.log("nb session   :  "+data.nbsession);
        console.log(this.nblogin);
        
          

       
      },
      err => {
        console.log( err.error.message);
      }
    );
    console.log(this.nuevoUsuario.numCompte);

    }

  ngOnInit() {
   this.ionViewWillEnter();
  }
  
  onUpdate(): void {
    this.userName=this.tokenService.getUserName();
    
    if(this.registrationForm.get('password').value == this.registrationForm.get('password2').value ){

      this.nuevoUsuario.password=this.registrationForm.get('password').value;
   this.authService.updateuser(this.userName, this.nuevoUsuario).subscribe(
      data => {
        this.localuser=this.userName;
        this.localpassword=this.registrationForm.get('password').value;
        this.presentAlertConfirm();
        //this.presentToast(data.mensaje);

        this.router.navigate(['/home']);
        this.vider();
      },
      err => {
        this.presentToast(err.error.mensaje);
      }
    );}

    else{
      this.presentToast("les deux password ne sont pas compatible");
    }
 
  }


  get password() {
    return this.registrationForm.get('password');
  }

  get password2() {
    return this.registrationForm.get('password2');
  }
  public errorMessages = {
    password: [
      { type: 'required', message: '  le mot de passe est obligatoire ' },
      { type: 'pattern', message: '  Please enter un mot de passe avec 6 chiffre ' },
      { type: 'minlength', message: ' entrer  6 chiffre exactement' },
      { type: 'maxlength', message: ' maximum 6 chiffre' }
    ],
    password2: [
      { type: 'required', message: '  le mot de passe est obligatoire ' },
      { type: 'pattern', message: '  Please enter un mot de passe avec 6 chiffre ' },
      { type: 'minlength', message: ' entrer  6 chiffre exactement' },
      { type: 'maxlength', message: ' maximum 6 chiffre' }
    ]
  };


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }


  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirmation!',
      message: 'Enregistrer Votre mot de pass pour activer l\'authentification biometric',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            localStorage.removeItem('currentUser');

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Oui',
          handler: () => {
            localStorage.setItem('currentUser', JSON.stringify({ username: this.localuser,password:this.localpassword }));
            console.log('Confirm Okay');
            console.log(this.tokenService.currentUser());
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }
  vider(){

    this.registrationForm = this.formBuilder.group({
      password: '',
      password2: ''
      
    });
  }

  async presentAlertConfirmpass() {
    const alert = await this.alertCtrl.create({
      header: 'Attention !',
      message: 'le mot de passe doit contenir 6 chiffre',
      buttons: [
        {
          text: 'Retour',
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
