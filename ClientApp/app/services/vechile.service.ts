import { AuthHttp } from 'angular2-jwt';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class VechileService {
  private readonly vechilesEndpoint = '/api/vechiles';

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  create(vechile) {
    return this.authHttp.post(this.vechilesEndpoint, vechile)
      .map(res => res.json());
  }

  getVechile(id) {
    return this.http.get(this.vechilesEndpoint + '/' + id)
      .map(res => res.json());
  }

  update(vechile) {
    return this.authHttp.put(this.vechilesEndpoint + '/' + vechile.id, vechile)
      .map(res => res.json());
  }

  delete(id) {
    return this.authHttp.delete(this.vechilesEndpoint + '/' + id)
      .map(res => res.json());
  }

  getVechiles(filter) {
    console.log(this.toQueryString(filter));
    
    return this.http.get(this.vechilesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());

  }

  toQueryString(obj) {
    var parts: any = [];

    for(var property in obj) {
      var value = obj[property];
      if(value != null && value != undefined)
        parts.push(encodeURIComponent(property) + "=" + encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
