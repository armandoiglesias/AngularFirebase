import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Mensaje} from '../interfaces/mensaje.interface'

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {
chats: FirebaseListObservable<any[]>;
usuario:any = null;

  constructor(private af: AngularFireDatabase
    ,public afAuth: AngularFireAuth
  ) {
    if(localStorage.getItem('firechatUser')){
      this.usuario = JSON.parse(localStorage.getItem('firechatUser'));

    }
    // this.chats = af.list('/chats');
  }
  
  cargarMensaje(){
    this.chats = this.af.list('/chats', {
      query:{
        limitToLast: 20
        , orderByKey : true
      }
    });
    return this.chats;
  }
  agregarMensaje(texto:string){
    let mensaje:Mensaje = {
      nombre: this.usuario.displayName
      , mensaje : texto
      , uid : this.usuario.uid
    }

    return this.chats.push(mensaje);


  }

  login(proveedor:string) {
    
    let provider:any = "";
    console.log(proveedor);
    switch (proveedor){
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider();
        break;
      default :
        provider = new firebase.auth.GoogleAuthProvider();
    }

    this.afAuth.auth.signInWithPopup(provider)
      .then(resp => {
        //console.log(resp)\
        this.usuario = resp.user;
        localStorage.setItem('firechatUser', JSON.stringify(this.usuario));

      });
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('firechatUser');
    this.usuario = null;

  }




}
