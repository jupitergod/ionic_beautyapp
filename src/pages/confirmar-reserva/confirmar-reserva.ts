import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

import * as moment from 'moment';
/**
 * Generated class for the ConfirmarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmar-reserva',
  templateUrl: 'confirmar-reserva.html',
})
export class ConfirmarReservaPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public menuCtrl: MenuController,public loadingCtrl: LoadingController,public events: Events, public apiProvider: ApiProvider) {

    this.dataCentro={};
    this.idCliente = 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmarReservaPage');



  this.apiProvider.getCarrito()
      .then(data => {
      console.log(data);
          this.dataCentro.servicios = data;
      });


  this.apiProvider.getTotal()
      .then(data => {
      console.log(data);
      this.dataCentro.total = data.toFixed(2); 
      });


    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

      this.idCliente = data.idCliente;
      console.log(this.idCliente);




   
      }
      else{
      this.idCliente = 0;
      } 

      this.dataCentro.fecha = this.navParams.get('fecha'); 
   this.dataCentro.nombreStaff = this.navParams.get('nombreStaff');
      this.dataCentro.fechaInicio = this.navParams.get('fechaInicio'); 
      this.dataCentro.fechaFinal = this.navParams.get('fechaFinal'); 


      this.dataCentro.hora = this.navParams.get('hora'); 
           this.dataCentro.horaF = this.navParams.get('horaF'); 

            this.dataCentro.idCuponCliente = this.navParams.get('idCuponCliente'); 
            
      this.dataCentro.data = this.navParams.get('centro'); 
      this.dataCentro.idEmpleado = this.navParams.get('idEmpleado'); 
      this.dataCentro.idCliente = this.idCliente; 

      

     });


    console.log(this.dataCentro);
  }

getDattt(str){
if(str){
   return moment.utc(str).format('h:mm a');

}
else{return ' '}

}



const confirmacionLista = () => { 


    this.apiProvider.verificarLogin()
    .then(data => { 

      console.log(data);

      if(data){

        let loading = this.loadingCtrl.create({content : "Creando Cita..."});
  loading.present();
 this.dataCentro.idCliente = data.idCliente;
  console.log(this.dataCentro);

     this.apiProvider.addCita(this.dataCentro)
      .then(data => {
    

        if(data){
        console.log(data);
        if(data.insertId>0){

          this.navCtrl.setRoot('ReservaHechaPage');

        }
       }
       else{console.log('Ha ocurrido un error');}

         loading.dismissAll(); 

       
      });


      }
      else{

   
   let profileModal = this.modalCtrl.create('LogindPage',{'total':this.dataCentro.total});
   profileModal.present();



       //this.menuCtrl.open();
      } 

     

     });


 };








}
