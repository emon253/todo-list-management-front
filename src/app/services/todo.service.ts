import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConst } from '../constants/AppConst';
import { TodoDto } from '../models/TodoDto';
import { Observable, catchError } from 'rxjs';
import { ErrorHandler } from '../constants/ErrorHandler';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  BASE_URL: string = AppConst.BASE_URL;
  constructor(private http: HttpClient) {}

  saveTodo(todo: TodoDto): Observable<TodoDto> {
    return this.http
      .post<TodoDto>(this.BASE_URL + '/api/v1/save-todo', todo)
      .pipe(catchError(ErrorHandler.handleError));
  }

  retrieveTodos(): Observable<TodoDto[]> {
    return this.http.get<TodoDto[]>(this.BASE_URL + '/api/v2/find-all-todo');
  }

  updateTodoStatus(todoID: number): Observable<TodoDto> {
    return this.http
      .put<TodoDto>(this.BASE_URL + '/api/v2/update-todo', todoID)
      .pipe(catchError(ErrorHandler.handleError));
  }

  deleteTodo(todoID: number) {
    return this.http
      .delete<TodoDto>(this.BASE_URL + '/api/v1/delete-todo/' + todoID)
      .pipe(catchError(ErrorHandler.handleError));
  }

  uploadImage(todoID: number, image: string): Observable<any> {
    return this.http.put(this.BASE_URL + `/api/v1/upload-image/${todoID}`, String(image));
  }
}
