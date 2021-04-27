import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators,NgForm  } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs/internal/types';
import { CrudService } from '../../services/crud.service';
import { map } from 'rxjs/operators';
import { Prod, ItemData } from '../../shared/models/user.interface';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  listOfData: ItemData[] = [];
  data:Prod[];
  editProd:any;
  prodForm!: FormGroup;
  isVisible = false;
  editprodForm!:FormGroup;
  constructor(private fb: FormBuilder,private CrudSvc: CrudService) {}

  ngOnInit(){
    this.prodForm = this.fb.group({
      nombre: [null, [Validators.required]],
      sku: [null, [Validators.required]],
      descripcion: [null, [Validators.required]]
    });

    this.editprodForm = this.fb.group({
      key:[null,''],
      Ednombre: [null, [Validators.required]],
      Edsku: [null, [Validators.required]],
      Eddescripcion: [null, [Validators.required]]
    });
    this.getData();
  }

  async guardarDatos(): Promise<void> {
    for (const key in this.prodForm.controls) {
      this.prodForm.controls[key].markAsDirty();
      this.prodForm.controls[key].updateValueAndValidity();
    }
    console.log(this.prodForm.value);
    const producto = this.prodForm.value;
    console.log(producto)
    try{
      const prod = await this.CrudSvc.regProd(producto)
      console.log(prod)
    }catch (error){
      console.log(error)
    } 
  }

  getData(): void {
    this.CrudSvc.getAll().snapshotChanges().subscribe(item => {
      this.data = [];
      this.listOfData = this.data;
     
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$keyRegistro"]=element.key
        this.data.push(x as Prod)
        console.log( this.data)
      })
      console.log(this.data)
      console.log(this.listOfData)
    }) 
  }

  async editar(prod:Prod){
    this.editProd = prod;
    console.log(prod)
    this.CrudSvc.selectedP = prod;
    this.isVisible = true;
  }

  async guardaredDatos(key,Ednombre,Edsku,Eddescripcion){
    let $keyRegistro = key.value;
    let nombre = Ednombre.value;
    let sku = Edsku.value;
    let descripcion = Eddescripcion.value;
    const editArray = {$keyRegistro,nombre,sku,descripcion}

    try{
      const prod = await this.CrudSvc.updatePro(editArray)
      this.isVisible = false;
    }catch (error){
      console.log(error)
    } 
    
    console.log(editArray)
  }
  async borrar($key:string){
    console.log($key)
    this.CrudSvc.delete($key);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
