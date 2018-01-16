
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {

    constructor(private http: Http) {

    }

    upload(vechileId, photo) {
        var formData = new FormData();
        formData.append('file', photo);
        return this.http.post(`/api/vechiles/${vechileId}/photos`, formData)
            .map(res => res.json());
    }

    getPhotos(vechileId) {
        return this.http.get(`/api/vechiles/${vechileId}/photos`)
            .map(res => res.json());
    }
}