import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  nuevoUsuario: boolean;
  nuevoGrupo: boolean;

  usuario: object = {
    email: '',
    perfil: '',
    nombre: '',
    apellido: '',
    cargo: '',
    grupo: ''
  }

  grupo: object = {
    nombreGrupo: '',
    descripcionGrupo: ''
  }


  constructor() {
    this.nuevoUsuario = false;
    this.nuevoGrupo = false;
  }

  ngOnInit() {

  }

  cambioNuevoUsuario() {
    this.nuevoUsuario = !this.nuevoUsuario;
    this.nuevoGrupo = false;
  }
  cambioNuevoGrupo() {
    this.nuevoGrupo = !this.nuevoGrupo;
    this.nuevoUsuario = false;
  }
  crearUsuario( formulario: NgForm){
    console.log(formulario);
  }
  crearGrupo( formulario: NgForm ){
    console.log(formulario);
  }
 

}

