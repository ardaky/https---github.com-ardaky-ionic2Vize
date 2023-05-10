import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kullanici } from '../models/Kullanici';
import { Gonderi } from '../models/Gonderi';
import { Yorum } from '../models/Yorum';
import { Begeni } from '../models/Begeni';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "https://localhost:44384/api/"
  constructor(
    public http:HttpClient
  ) { }
  
  kullaniciListele(): Observable<Kullanici[]> {
    return this.http.get<Kullanici[]>(this.apiUrl + 'kullanicilistele');
  }

  kullaniciById(kullaniciId:number){
    return this.http.get(this.apiUrl+"kullanicibyid/"+kullaniciId);
  }

  kullaniciEkle(kullanici:Kullanici){
    return this.http.post(this.apiUrl+"kullaniciekle",kullanici);
  }

  kullaniciDuzenle(kullanici:Kullanici){
    return this.http.put(this.apiUrl+"kullaniciduzenle",kullanici);
  }

  kullaniciSil(kullaniciId:number){
    return this.http.delete(this.apiUrl+"kullanicisil/"+kullaniciId);
  }

  // gonderi

  gonderiListele(){
    return this.http.get<Gonderi[]>(this.apiUrl+"gonderilistele")
  }

  gonderiById(gonderiId:number){
    return this.http.get(this.apiUrl+"gonderibygonderiId/"+gonderiId);
  }

  gonderiByKullaniciId(gonderiKullaniciId:number){
    return this.http.get(this.apiUrl+"gonderibykullaniciid/"+gonderiKullaniciId);
  }

  gonderiEkle(gonderi:Gonderi){
    return this.http.post(this.apiUrl+"gonderiekle",gonderi);
  }
  gonderiDuzenle(gonderi:Gonderi){
    return this.http.put(this.apiUrl+"gonderiduzenle",gonderi);
  }
  gonderiSil(gonderiId:number){
    return this.http.delete(this.apiUrl+"gonderisil/"+gonderiId);
  }
  
  // yorum

  yorumListele(){
    return this.http.get(this.apiUrl+"yorumlistele")
  }

  yorumById(yorumId:number){
    return this.http.get(this.apiUrl+"yorumlistelebyid/"+yorumId);
  }
  yorumByKullaniciId(kullaniciId:number){
    return this.http.get(this.apiUrl+"yorumlistelebykullanici/"+kullaniciId);
  }
  yorumByGonderiId(gonderiId:number){
    return this.http.get<Yorum[]>(this.apiUrl+"yorumlistelebygonderi/"+gonderiId);
  }
  yorumEkle(yorum:Yorum){
    return this.http.post(this.apiUrl+"yorumekle",yorum);
  }

  yorumSil(yorumId:number){
    return this.http.delete(this.apiUrl+"yorumsil/"+yorumId);
  }

  // beğeni

  begeniListeleByGonderi(gonderiId:number){
    return this.http.get(this.apiUrl+"begenilistelebygonderi/"+gonderiId);
  }
  begeniListeleByKullanici(kullaniciId:number){
    return this.http.get(this.apiUrl+"begenilistelebykullanici/"+kullaniciId);
  }
  begeniEkle(begeni:Begeni){
    return this.http.post(this.apiUrl+"begeniekle",begeni);
  }
  begeniSil(begeniId:number){
    return this.http.delete(this.apiUrl+"begenisil/"+begeniId);
  }

  // oturum

  tokenAl(kadi:string,parola:string){
    var data = "username="+kadi+"&password="+parola+"&grant_type=password";
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});
    return this.http.post(this.apiUrl+"token",data,{headers:reqHeader});
}
}
