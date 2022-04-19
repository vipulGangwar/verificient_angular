import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-test-compo',
  templateUrl: './test-compo.component.html',
  styleUrls: ['./test-compo.component.css']
})
export class TestCompoComponent implements OnInit {

  todo_list = [];

  baseURL: string = "http://127.0.0.1:8000/";

  todo = {"todo_text": "", "schedule_date":""}

  headers = {}

  constructor(private http: HttpClient) { }

  getTodoData(): Observable<any> {
    return this.http.get(this.baseURL + 'to-do/list/')
  }

  ngOnInit(): void {
    this.getTodoDataList();
  }


  getTodoDataList() {
    this.getTodoData()
      .subscribe(data => {
        this.todo_list=data.data;
  })
}

   addTodo(todo): Observable<any> {
    const body = {"todo_text": todo.todo_text, "schedule_date":todo.schedule_date};
    return this.http.post(this.baseURL + 'to-do/list/', body, {headers: this.headers});
  }


  addTodoData() {
    this.addTodo(this.todo)
      .subscribe(data => {
        this.todo=data.data;
        this.ngOnInit();
  })

  this.getTodoDataList();

}


  deleteTodo(id): Observable<any> {
    return this.http.delete(this.baseURL + 'to-do/list/' +'?id=' + id);
  }

  deleteTodoData(id) {
    this.deleteTodo(id)
      .subscribe(data => {
        this.todo=data.data;
        this.ngOnInit();
  })

}

completeTodo(id): Observable<any> {
    const body = {"todo_id": id};
    return this.http.post(this.baseURL + 'to-do/completed/', body, {headers: this.headers});
  }

  completeTodoData(id) {
    this.completeTodo(id)
      .subscribe(data => {
        this.todo=data.data;
        this.ngOnInit();
  })

}

editTodo(id, todo_text, schedule_date): Observable<any> {
    const body = {"todo_id": id, 'todo_text':todo_text, "schedule_date":schedule_date};
    return this.http.put(this.baseURL + 'to-do/list/', body, {headers: this.headers});
  }

  editTodoData(id, todo_text, schedule_date) {
    this.editTodo(id, todo_text, schedule_date)
      .subscribe(data => {
        this.todo=data.data;
        this.ngOnInit();
  })

}

}