import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  roadUrl = environment.road;
  constructor(private http:HttpClient) { }

  private getHttp(url:string) {
    let promise = new Promise((resolve, reject) => {
        this.http.get(url).subscribe(data => {
            resolve(data);
        }, err => {
            reject(err);
        });
    });
    return promise;
  }

  public search(args):any{
    return this.getHttp(`${this.roadUrl}/roads/search?qry=${args.qry}&limit=${args.limit || 50}&page=${args.page || 1}`)
  }

  public getRoad(rid):any{
    return this.getHttp(`${this.roadUrl}/roads/getbyrid?rid=${rid}`)
  }
  public getSegment(id):any{
    return this.getHttp(`${this.roadUrl}/roads/getsegmentbyid?id=${id}`)
  }

  public getRoadWithSegment(id):any{
    return this.getHttp(`${this.roadUrl}/roads/getroadwithsegmentbyid?id=${id}`)
  }

  public getlocations(name):any{
    return this.getHttp(`${this.roadUrl}/geolocation/search?name=${name}`)
  }

  public getlocationbyId(id):any{
    return this.getHttp(`${this.roadUrl}/geolocation/getbyid?id=${id}`)
  }
}
