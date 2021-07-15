import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { AdminDialogComponent } from '../admin-dialog/admin-dialog.component';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss']
})
export class BoardAdminComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'description', 'status', 'Action'];
  dataSource: MatTableDataSource<any>;

  constructor(public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getAdminComplaint();
  }

  openDialog(row: any) {
    if (row) {
      this.dialog.open(AdminDialogComponent,
        {
          data: row,
          height: '600px',
          width: '600px',
        },

      ).afterClosed().subscribe(result => {
        this.dialog.closeAll()
        this.getAdminComplaint();
      })
    } else {
      this.dialog.open(AdminDialogComponent, {
        height: '600px',
        width: '600px',
      }).afterClosed().subscribe(result => {
      })
    }
  }

  getAdminComplaint() {
    this.userService.getAllComplaints().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    });
  }


  deleteComplaint(complaintRid: any): void {
    this.dialog.open(ConfirmationDialog, {
      data: {
        yesCallback: () => {
          this.userService.deleteComplaintById(complaintRid).subscribe(data => {
            this.getAdminComplaint();
          });
        },
        noCallback: () => {
        }
      }
    });
  }
}
