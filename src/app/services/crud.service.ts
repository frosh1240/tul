import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument} from '@angular/fire/firestore';
import { Prod, Productos } from '../shared/models/user.interface';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  
  prodList:AngularFireList<Prod>;
  public prod$: Observable<Prod[]>;
  idProd:string;
  private itemsCollection: AngularFirestoreCollection<Prod>;
  selectedP: Productos = new Productos();

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private fdb: AngularFireDatabase) {
    this.prodList = fdb.list('productos');
    this.getAll();
  }

  async regProd(prod:Prod){
    return this.prodList.push(prod)
  }


  getAll(): AngularFireList<Prod> {
    console.log(this.prodList)
    return this.prodList;
  }

  updatePro(prod:Prod){
    console.log(prod)
    return this.prodList.update(prod.$keyRegistro,{
      nombre: prod.nombre,
      sku: prod.sku,
      descripcion: prod.descripcion,
    })
  }

  selectedProduct(id): void{
    this.prodList = this.fdb.list('/productos',(ref)=>
      ref.orderByChild(id)
    )
  }
  delete($key:string): void {
    console.log($key)
    this.prodList.remove($key);
  } 
}
