import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  kadi!: string;
  parola!:string;
  constructor(
    public apiServis:ApiService
  ) { }

  ngOnInit() {}
  oturumAc(){
    this.kadi = "ardakerem";
    this.parola = "123456";

    this.apiServis.tokenAl(this.kadi,this.parola).subscribe(d=> {
      console.log(d);
    });
  }
}
