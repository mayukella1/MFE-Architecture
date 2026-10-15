import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  productNameSubject = new BehaviorSubject<string>('');

    productName$ = this.productNameSubject.asObservable();

    setProductName(name:string){
        console.log(name)
        this.productNameSubject.next(name)
    }

    // Window Object Communication Example
    setWindowData(key: string, data: any) {
        (window as any)[key] = data;
        console.log(`Window data set: ${key} =`, data);
    }

    getWindowData(key: string) {
        return (window as any)[key];
    }

    clearWindowData(key: string) {
        delete (window as any)[key];
    }

}
