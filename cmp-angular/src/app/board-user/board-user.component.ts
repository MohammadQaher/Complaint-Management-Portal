import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from '../_services/token-storage.service';
import { ComplaintDialogComponent } from '../complaint-dialog/complaint-dialog.component';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.scss']
})
export class BoardUserComponent implements OnInit {

  displayedColumns: string[] = ['rid', 'title', 'description', 'status'];
  dataSource!: MatTableDataSource<any>;
  userId: any;
  username: any;

  constructor(private userService: UserService, public dialog: MatDialog, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = this.tokenStorage.getUser().id;
    this.username = this.tokenStorage.getUser().user;
    this.getUserComplaint()
  }

  openDialog() {
    this.dialog.open(ComplaintDialogComponent, {
      height: '400px',
      width: '600px',
    }).afterClosed().subscribe(result => {
      this.getUserComplaint()
    })
  }

  getUserComplaint() {
    this.userService.getAllComplaintsByUserId(this.userId).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
