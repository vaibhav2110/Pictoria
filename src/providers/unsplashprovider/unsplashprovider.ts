import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
/*
  Generated class for the UnsplashproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UnsplashproviderProvider {
    
    clientId: string = '4d086911b1afc564d9cb68edea9559906b900334b782fb14ab69782998f5b6fa';
    pageNo: number = 1
  constructor(public http: Http,
              private processHTTPMsgService: ProcessHttpmsgProvider) {
    console.log('Hello UnsplashproviderProvider Provider');
    
      
  }
    

    getPhotos(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/photos/?page='+pg+'&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { return this.processHTTPMsgService.extractData(res); })
        .catch(error => { console.log(error); return this.processHTTPMsgService.handleError(error);})
    }
    getFeatured(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/photos/curated/?page='+pg+'&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getDownload(id: string): Observable<any>{
        return this.http.get('https://api.unsplash.com/photos/'+id+'/download/?utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getCollections(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/collections/featured/?page='+pg+'&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getCollection(id: string, pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/collections/'+id+'/photos/?page='+pg+'&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getUser(username: string):Observable<any>{
        return this.http.get('https://api.unsplash.com/users/'+username+'/?utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getUserPhotos(username: string, pg: number):Observable<any>{
        return this.http.get('https://api.unsplash.com/users/'+username+'/photos/?page='+pg+'&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { console.log(res);return this.processHTTPMsgService.extractData(res); })
        .catch(error => { return this.processHTTPMsgService.handleError(error);})
    }
    getNaturePhotos(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/search/photos/?page='+pg+'&query=nature&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { return this.processHTTPMsgService.extractData(res); })
        .catch(error => { console.log(error); return this.processHTTPMsgService.handleError(error);})
    }
    getSpacePhotos(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/search/photos/?page='+pg+'&query=space&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { return this.processHTTPMsgService.extractData(res); })
        .catch(error => { console.log(error); return this.processHTTPMsgService.handleError(error);})
    }
    getMinimalPhotos(pg: number): Observable<any>{
        return this.http.get('https://api.unsplash.com/search/photos/?page='+pg+'&query=minimal&utm_source=wallpaper&utm_medium=referral&client_id='+this.clientId).
        map(res => { return this.processHTTPMsgService.extractData(res); })
        .catch(error => { console.log(error); return this.processHTTPMsgService.handleError(error);})
    }

}
