import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
/*
  Generated class for the ProcessHttpmsgProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProcessHttpmsgProvider {

  constructor(public http: Http) {
    console.log('Hello ProcessHttpmsgProvider Provider');
  }
    
    public extractData(res: Response){
        let body = res.json();
        return body || { };
    }
    public handleError(error: any){
        console.log(error);
        let err = error._body;
        return Observable.throw(err);
    
}
}