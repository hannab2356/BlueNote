import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addLesson(id: number, model: any) {
    return this.http.post(this.baseUrl + "lessons/addLesson/" + id, model);
  }

  updateLesson() {

  }
}
