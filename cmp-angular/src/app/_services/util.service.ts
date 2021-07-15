import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { Config } from './Config';
import { RequestMethod } from './RequestMethod';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    constructor(private httpClient: HttpClient, private router: Router) {
    }

    public createPostApi(url: string, data?: any, requestMethod?: RequestMethod, customHttpOptions?: object): Observable<any> {
        url = Config.BACK_END_URL.concat(url);
        let httpOptions = customHttpOptions;
        if (!customHttpOptions) {//default
            httpOptions = {
                headers: new HttpHeaders({
                    'Content-type': 'application/json'
                })
            };
        }
        return this.httpClient.post(url, data, httpOptions);
    }

    public goToRoute(path: string, extras?: any): void {
        this.router.navigate([path], extras);
    }

    copy(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

    getRoutes(): any[] {
        let routes = this.router.config;
        routes.sort((a, b) => {
            if (!a.data || !b.data) {
                return 0;
            }
            if (a.data.order > b.data.order) {
                return 1;
            }
            if (a.data.order < b.data.order) {
                return -1;
            }
            return 0;
        });
        routes = routes.filter(r => r.data);
        return routes;
    }

    goToHomePage() {
        this.goToRoute("/");
    }
}
