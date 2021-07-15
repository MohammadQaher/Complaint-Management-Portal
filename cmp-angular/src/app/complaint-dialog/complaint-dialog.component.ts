import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-complaint-dialog',
  templateUrl: './complaint-dialog.component.html',
  styleUrls: ['./complaint-dialog.component.scss']
})
export class ComplaintDialogComponent implements OnInit {

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) { }
  complaintForm!: FormGroup;
  status: string = "PENDING";
  userId: any;

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().id;
    this.complaintForm = new FormGroup({
      userId: new FormControl(this.userId),
      rid: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      status: new FormControl(this.status),
    });
  }

  createComplaint() {
    let wrapper = this.complaintForm.value;
    this.userService.createComplaint(wrapper).subscribe(data => {
    });
  }
}

