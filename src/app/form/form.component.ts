import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  userForm: any;
  listItem: any = [];
  contractual: any = [];
  permanent: any = [];
  successAlert: boolean = false;
  statusAlert: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      select: new FormControl('', Validators.required),
    });
  }

  formSubmit() {
    this.listItem.push(this.userForm.value);
    if (this.userForm.value['select'] === 'Contractual') {
      this.contractual.push(this.userForm.value);
    } else if (this.userForm.value['select'] === 'Permanent') {
      this.permanent.push(this.userForm.value);
    }
    this.successAlert = true;
    setTimeout(() => {
      this.successAlert = false;
    }, 3000);
    this.userForm.reset();
  }

  id: any = 'AllEmployee';
  tabChange(ids: any) {
    this.id = ids;
  }

  contractBtn(element: any) {
    this.permanent.push(element);
    this.permanent.forEach((value: any, index: any) => {
      if (this.permanent[index].select === 'Contractual')
        element.select = 'Permanent';
    });
    this.contractual.forEach((value: any, index: any) => {
      if (this.contractual[index].select === 'Permanent') {
        this.contractual.splice(index, 1);
      }
    });
  }

  permanentBtn(element: any) {
    this.contractual.push(element);
    this.contractual.forEach((value: any, index: any) => {
      if (this.contractual[index].select === 'Permanent') {
        element.select = 'Contractual';
      }
    });
    this.permanent.forEach((value: any, index: any) => {
      if (this.permanent[index].select === 'Contractual') {
        this.permanent.splice(index, 1);
      }
    });
  }
}
