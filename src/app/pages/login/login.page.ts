import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { ToastController } from '@ionic/angular';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/Utilisateur';
import { AlertController } from '@ionic/angular';
import { FormBuilder, Validators,FormControl, FormGroup } from "@angular/forms";
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginUsuario: LoginUsuario;
  //numCompte = '';//+this.tokenService.currentUser().username;
 // password = '';//+this.tokenService.currentUser().password;
  isLogged = false;
  localuser='';
  localpassword='';
  utilisateur: Utilisateur;
  nblogin='';
  nblogin2:boolean;
  biometrie:boolean;

  registrationForm:FormGroup;
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private toastController: ToastController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    public loadingController: LoadingController,
    private faio: FingerprintAIO,
    private router: Router
  ) { 
    this.registrationForm = this.formBuilder.group({
      numCompte: '',
      kiwi: Boolean,
      password: ''
      
    });


  }

  ngOnInit() {
    this.testLogged();
    this.ionViewWillEnter();
    
    
  }

  public errorMessages = {
    numCompte: [
      { type: 'required', message: '  Numero de compte est obligatoire' },
      { type: 'minlength', message: ' minimum 9 caractère' },
      { type: 'maxlength', message: ' maximum 9 caractère' }
    ],
    password: [
      { type: 'required', message: '  le mot de passe est obligatoire ' },
      { type: 'pattern', message: '  Please enter un mot de passe avec 6 chiffre ' },
      { type: 'minlength', message: ' entrer  6 chiffre exactement' },
      { type: 'maxlength', message: ' maximum 6 chiffre' }
    ]
   

  };

  showHideAutoLoader() {
    
    this.loadingController.create({
      message: 'please wait ...',
      duration: 3000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {

   this.loginUsuario = new LoginUsuario(this.registrationForm.get('numCompte').value, this.registrationForm.get('password').value);
    //this.showHideAutoLoader();
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        this.authService.infomrations(this.registrationForm.get('numCompte').value).subscribe(
          data => {
            //this.showHideAutoLoader();
           this.nblogin=data.nbsession;
           this.localuser=this.registrationForm.get('numCompte').value;
           this.localpassword=this.registrationForm.get('password').value;
           console.log(this.tokenService.currentUser());
           if(this.tokenService.currentUser()== null){
            console.log("  au null 2 ");
            //this.presentAlertConfirm();
        
          }
          if( this.registrationForm.get('kiwi').value==true){
            console.log("password enregistrer ");
            localStorage.setItem('currentUser', JSON.stringify({ username: this.localuser,password:this.localpassword }));
            console.log('Confirm Okay');

          }
          else{
            console.log("password non enregistrer ");
            localStorage.removeItem('currentUser');

          }
          //localStorage.setItem('currentUser', JSON.stringify({ token: "jwt will come later", username: this.numCompte,password:this.password }));
                    
            console.log(this.tokenService.currentUser());
           this.nblogin2=data.modipass;
            if(!data.modipass){
             // console.log("login vers changer password . ");
              this.router.navigate(['/editpassword']);
              this.vaciar();
            }
            else{
            //console.log("login normal . ");
          
            this.router.navigate(['/home']);
            this.vaciar();
          }
          

          },
          err => {
            console.log( err.error.message);
          }
        );

     
        
      },
      err => {
        this.presentToast(err.error.message);
      }
    ); 

        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }



  public showFingeerprintAuthentication() {

    this.faio.isAvailable().then((result: any) => {
      console.log(result)

      this.faio.show({
        cancelButtonTitle: 'Cancel',
        description: "Some biometric description",
        disableBackup: true,
        title: 'Scanner Title',
        fallbackButtonTitle: 'FB Back Button',
        subtitle: 'This SubTitle'
      })
        .then((result: any) => {
          console.log(result);
          this.loginbiometric();
          alert("Authentifié avec succès!");
        })
        .catch((error: any) => {
          console.log(error)
          alert("Match not found!")
        });

    })
      .catch((error: any) => {
        this.presentToast("Votre portable ne prend pas en charge cette fonctionnalité");
        console.log(error)
      });
  }




  get numCompte() {
    return this.registrationForm.get('numCompte');
  }
 
  get password() {
    return this.registrationForm.get('password');
  }

  get kiwi() {
    return this.registrationForm.get('kiwi');
  }
  notify() {
    console.log("toggled: "+ this.registrationForm.get('kiwi').value); 
  }
  ionViewWillEnter() {
    console.log("toogel  :"+this.registrationForm.get('kiwi').value);
    this.testLogged();
    this.vaciar();
    //localStorage.removeItem('currentUser');
    
    console.log("  au demarage "+   this.registrationForm.get('numCompte').value)
    console.log(this.tokenService.currentUser());
    if(this.tokenService.currentUser()==null){
      console.log("  biometrie desactivier");
      this.biometrie=false;
    }
    else{
    //  this.numCompte = ''+this.tokenService.currentUser().username;
      this.registrationForm = this.formBuilder.group({
        numCompte: ''+this.tokenService.currentUser().username,
        kiwi: this.registrationForm.get('kiwi').value,
        password: ''

        
      });
      this.biometrie=true;
      console.log("  biometrie activier ")
      console.log(" username :  "+this.tokenService.currentUser().username)
      //this.password = '';//+this.tokenService.currentUser().password;
      console.log("  not nulll ")
    }
  }


  loginbiometric(){

    this.loginUsuario = new LoginUsuario(this.tokenService.currentUser().username, this.tokenService.currentUser().password);
    console.log("login biometrie");
    console.log("name  :  "+ this.tokenService.currentUser().username +"   password  :   "+this.tokenService.currentUser().password);
    //this.showHideAutoLoader();
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.tokenService.setToken(data.token);
        this.isLogged = true;
        this.authService.infomrations(this.tokenService.currentUser().username).subscribe(
          data => {
            //this.showHideAutoLoader();
           this.nblogin=data.nbsession;
           this.localuser=this.tokenService.currentUser().username;
           this.localpassword=this.tokenService.currentUser().password;
           console.log(this.password);
          /* if(this.tokenService.currentUser==null){
            console.log("  au null 2 ");
            this.presentAlertConfirm();}*/
          //localStorage.setItem('currentUser', JSON.stringify({ token: "jwt will come later", username: this.numCompte,password:this.password }));
                    
            console.log(this.tokenService.currentUser());
           this.nblogin2=data.modipass;
            if(!data.modipass){
             // console.log("login vers changer password . ");
            // alert("Authentifié avec succès!");
              this.router.navigate(['/editpassword']);
              this.vaciar();
            }
            else{
            //console.log("login normal . ");
            //alert("Authentifié avec succès!");
            this.router.navigate(['/home']);
            this.vaciar();
          }
          

          },
          err => {
            console.log( err.error.message);
          }
        );

     
        
      },
      err => {
        this.presentToast(err.error.message);
      }
    ); 



  }

  onLogin() {
    console.log("login wait. "+(''+this.password).length);
    
    this.loginUsuario = new LoginUsuario(this.registrationForm.get('numCompte').value, this.registrationForm.get('password').value);
    //this.showHideAutoLoader();
    
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





  vaciar() {
    console.log("toggled: "+ this.registrationForm.get('kiwi').value); 

    if(this.tokenService.currentUser()==null){
      console.log("  au null ");
      this.registrationForm = this.formBuilder.group({
        numCompte: '',
        kiwi: [false],
        password: ''
        
      });
   // this.password = '';

    }
    else{
      
      this.registrationForm = this.formBuilder.group({
        numCompte: ''+this.tokenService.currentUser().username,
        kiwi: [false],
        password: ''
        
      });
      
      //.numCompte = ''+this.tokenService.currentUser().username;
      console.log(" username :  "+this.tokenService.currentUser().username)
      //this.password = '';//+this.tokenService.currentUser().password;
  }
}

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogged = false;
    
    this.vaciar();
  }

  testLogged(): void {
    this.isLogged = this.tokenService.getToken() != null;
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
