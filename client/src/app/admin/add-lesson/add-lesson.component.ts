import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { AccountService } from 'src/app/_services/account.service';
import { LessonService } from 'src/app/_services/lesson.service';
import { User } from '../../_models/User';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent implements OnInit {
  @Output() cancelAddLesson = new EventEmitter();
  user: User;
  lessonForm: FormGroup;

  constructor(private lessonService: LessonService,
              private accountService: AccountService, 
              private formBuilder: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { 
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }

  ngOnInit(): void {
    this.createLessonForm();
  }

  private createLessonForm() {
    this.lessonForm = this.formBuilder.group({
      title: ['', Validators.required],
      categoryName: [,Validators.required],
      content: ['', Validators.required]
    });
  }

  addLesson() {
    this.lessonService.addLesson(this.accountService.decodedToken.nameid.toString().split(',')[0], this.lessonForm.value)
      .subscribe( next => {
        this.toastr.success("Utworzone lekcję.");
        console.log(this.lessonForm.value);
        this.lessonForm.reset();
        this.router.navigateByUrl("/");
      }, error => {
        this.toastr.error(error.error);
      });
  }

  private cancel() {
    this.cancelAddLesson.emit(false);
  }

}
