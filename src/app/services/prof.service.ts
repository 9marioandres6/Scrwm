import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Prof } from '../models/prof';
import { environment } from '../../environments/environment';

declare var M: any; 

@Injectable({
  providedIn: 'root'
})
export class ProfService {

userProf: Prof;
profs: Prof[];
env = environment.apiUrl;

  private URL_API = environment.apiUrl + 'api/scrwm/profs';

  constructor(private http: HttpClient){
    if(!this.userProf){
      this.userProf = new Prof();
      this.findProf()
    }
  }
 
  findProf(){
    this.getProfs()
    .subscribe(res => {
      const A = this.profs = res as Prof[];
      for (var i in A){
        if(A[i].userId === sessionStorage.getItem('currentUserId')){
          this.userProf = A[i];
          //M.toast({ html: "Prof found" }); 
          return; 
        }
      }
    })
  }

  getProfs() { return this.http.get(this.URL_API) }
  postProf(prof: Prof) { return this.http.post(this.URL_API, prof) }
  putProf(prof: Prof) { return this.http.put(this.URL_API + `/${prof._id}`, prof) }
  deleteProf(_id: string) { return this.http.delete(this.URL_API + `/${_id}`) }

}