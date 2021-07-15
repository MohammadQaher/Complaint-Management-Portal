import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../_services/user.service';
import { UtilService } from '../_services/util.service';

@Component({
  selector: 'app-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent implements OnInit {
  complaintForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { userId: any, rid: string, title: string, description: string, status: string },
    private util: UtilService, private userService: UserService) {
  }

  ngOnInit() {
    if (this.data) {
      this.complaintForm = new FormGroup({
        'userId': new FormControl(this.data.userId),
        'rid': new FormControl(this.data.rid),
        'title': new FormControl(this.data.title),
        'description': new FormControl(this.data.description),
        'status': new FormControl(this.data.status),
      });
    } else {
      this.complaintForm = new FormGroup({
        'userId': new FormControl(null),
        'rid': new FormControl(null),
        'title': new FormControl(null),
        'description': new FormControl(null),
        'status': new FormControl(null),
      });
    }
  }

  updateComplaint() {
    let wrapper = this.complaintForm.value;
    this.userService.updateComplaint(wrapper).subscribe(data => {
      this.complaintForm.patchValue(data);
    });
  }
}
