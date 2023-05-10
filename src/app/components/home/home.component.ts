import { ApiService } from './../../services/api.service';
import { Sonuc } from './../../models/Sonuc';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal } from '@ionic/angular';
import { Gonderi } from 'src/app/models/Gonderi';
import { Kullanici } from 'src/app/models/Kullanici';
import { Yorum } from 'src/app/models/Yorum';
import { Begeni } from 'src/app/models/Begeni';


@Component({  
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  kullanicilar!:Kullanici[];
  yorumlar!:Yorum[];
  gonderiler!:Gonderi[];
  @ViewChild(IonModal) modal!: IonModal;
  constructor(

    public apiServis:ApiService,
    public alert:AlertController
  ) { }

  ngOnInit() {
    this.kullaniciListele();
    this.gonderiListele();
  }
  
  Sonuc = new Sonuc();
  begeni: Begeni = new Begeni();
  
  // modal 
  cancel() {
    this.modal.dismiss(null, 'kapat');
  }



  alertVer(sonuc:Sonuc){
    
    this.presentAlert(sonuc.mesaj)

  }
  async presentAlert(mesaj:string) {
    const alert = await this.alert.create({
      header: '',
      message: mesaj,
      buttons: ['Tamam']
    });
  
    await alert.present();
  }

  kullaniciListele() {
    this.apiServis.kullaniciListele().subscribe((d: Kullanici[]) => {
      this.kullanicilar = d;
      console.log(d);
    })
  }

  gonderiListele(){
    this.apiServis.gonderiListele().subscribe((d:Gonderi[]) => {
      this.gonderiler = d;
      console.log(d);
    })
  }

  gonderiYorumlariListele(gonderiId:any){

    this.apiServis.yorumByGonderiId(gonderiId).subscribe((d: Yorum[]) =>{
      this.yorumlar = d;
      console.log(d);
    })
  }

  begeniEkle(gonderiId:number){
    this.begeni.begeniGonderiId = gonderiId;
    this.begeni.begeniKullaniciId = 2;
    
    this.apiServis.begeniEkle(this.begeni).subscribe((d: any) => {

    });
    this.Sonuc.islem = true;
    this.Sonuc.mesaj = "Beğenildi !"
    this.alertVer(this.Sonuc)
  }

}
