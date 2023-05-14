import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Password } from '../_models/password';
import { User } from '../_models/User';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: User;
  passsword: Password;
  birth: any;
  accountForm: FormGroup;
  passwordForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(public accountService: AccountService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
                this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
              }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: 'theme-blue'
    };
    // this.route.data.subscribe(data => {
    //   this.user = data['user'];
    // });
    // this.user =  this.accountService.currentUserNew;
    this.birth = this.user.birthDate.toString().split('T')[0];
    // console.log(this.birth);
    // this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.createAccountForm();
    this.createPasswordForm();
  }

  loadUser() {
    // this.user; new FormControl(this.user.birthDate.toISOString().split("T")[0])
  }

  createAccountForm() {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      birthDate: ['', Validators.required],
      description: [''] });
  }

  createPasswordForm() {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    // tslint:disable-next-line: object-literal-key-quotes
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  changeAccountInfo() {
    this.toastr.success('Zapisano zmiany.');
  }

  changePassword() {
    this.toastr.success('Zapisano zmiany.');
  }

  updateUser() {
    this.accountService.updateUser(this.accountService.decodedToken.nameid.toString().split(',')[0], this.accountForm.value)
    .subscribe(next => {
      this.toastr.success('Zapisano zmiany.');
      console.log(this.accountForm.value);
      this.accountForm.reset(this.user);
    }, error => {
      this.toastr.error(error.error);
    });
    // console.log(this.user);
  }

  updateUserPassword() {
    this.accountService.updateUserPassword(this.accountService.decodedToken.nameid.toString().split(',')[0], this.passwordForm.value)
    .subscribe(next => {
      this.toastr.success('Zapisano zmiany.');
      // console.log(this.user);
      this.passwordForm.reset();
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }, error => {
      this.toastr.error(error.error);
    });
    // console.log(this.user);
  }

}
