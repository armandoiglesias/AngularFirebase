import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service'
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  constructor(private _cs:ChatService) { 
    this._cs.cargarMensaje()
      .subscribe(()=> {
        console.log("mensajes cargados...");
        setTimeout(function() {
          //this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 1500);

        

      })
  }

  ngOnInit() {
    this.elemento = document.getElementById("app-mensaje");

  }

  mensaje:string = "";
  elemento:any;
  enviar(){
    if(this.mensaje.length == 0){
      return ;
    }

    this._cs.agregarMensaje(this.mensaje)
      .then(() => console.log("hecho"))
      .catch((error)=> console.error(error));
    this.mensaje  ="";

  }

}
