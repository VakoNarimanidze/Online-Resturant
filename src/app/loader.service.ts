import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(public http:HttpClient) { }

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false)

  startLoading(){
    this.isLoading.next(true)
  }

  stopLoading(){
    this.isLoading.next(false)
  }
}
