  
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  password?: string;
  photoURL?: string;
}

  
export interface Prod {
  $keyRegistro: string;
  nombre: string;
  sku?: number;
  descripcion?: string;
}

  
export class Productos {
  $keyRegistro?: string | any;
  nombre?: string;
  sku?: number;
  descripcion?: string;
}

export interface ItemData {
  $keyRegistro: string;
  nombre: string;
  sku?: number;
  descripcion?: string;
}
