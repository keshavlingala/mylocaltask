import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TaskData} from "./models";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor() {
    try {
      this._data.next(JSON.parse(localStorage.getItem('taskData') || ''))
    } catch (e) {
      console.log('Error parsing data from local storage')
    }
    this._data.asObservable().subscribe({
      next: (data) => {
        localStorage.setItem('taskData', JSON.stringify(data))
      },
      error: (e) => {
        console.log('Error saving data to local storage', e)
      }
    })
  }

  private _data = new BehaviorSubject({
    backlog: [],
    deleted: [],
    inProgress: [],
    completed: []
  } as TaskData)

  get data() {
    return this._data.value;
  }

  set data(data: TaskData) {
    console.log('Setting Data', data)
    this._data.next(data)
  }

  getTasks() {
    return this._data.asObservable();
  }

}
