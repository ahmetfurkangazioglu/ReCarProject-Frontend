import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  set(key:string,data:any){
    localStorage.setItem(key,data)
  }
  get(key:string){
   return localStorage.getItem(key)
  }
  delete(key:string){
    localStorage.removeItem(key)
  }

}
