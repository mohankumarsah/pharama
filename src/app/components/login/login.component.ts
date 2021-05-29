import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  private formSubmitAttempt!: boolean;
  public loginInvalid!: boolean;
  constructor(
    private fb: FormBuilder,
    private loginservice: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  async onSubmit() {
    console.log("onSubmit call")
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      try {
        console.log("onSubmit call",this.form.valid)
        const username = this.form.get('username')?.value;
        const password = this.form.get('password')?.value;
        this.checkLogin()
      } catch (err) {
        this.loginInvalid = false;
        console.log("onSubmit call error")
      }
    } else {
      this.formSubmitAttempt = true;
      console.log("error")
      
    }
  }

  checkLogin() {
    (this.loginservice.authenticate(this.form.get('username')?.value, this.form.get('password')?.value).subscribe(
      () => {
        this.router.navigate(['/common-dashboard'])
        
      },
      () => {
        this.loginInvalid = true
       

      }
    )
    );

  }
}
