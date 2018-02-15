import { UserManagerService } from './../services/user-manager.service';
import { Component, OnInit } from '@angular/core';
import { UserVM } from '../models/user.vm';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit 
{
  public userForm: UserVM = this.cleanUser;
  public currentUsers: UserVM[] = [];

  public get isItUpdate()
  {
    return (this.userForm.id > 0);
  }

  private get cleanUser(): UserVM
  {
    return {
      id: 0,
      firstName: '',
      lastName: '',
      gender: '',
      mobile: ''
    }
  }

  constructor(
    private userManagerService: UserManagerService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public arrangeUpdateUser(userId: number)
  {
    let tempUser = this.currentUsers.find(u => u.id == userId);
    this.userForm = { 
      id: tempUser.id,
      firstName: tempUser.firstName,
      lastName: tempUser.lastName,
      gender: tempUser.gender,
      mobile: tempUser.mobile
    }
  }

  public clearUser()
  {
    this.userForm = this.cleanUser;
  }

  //service calls
  public getAllUsers()
  {
    this.userManagerService.getAllUsers().subscribe(
      data => {
        if (data.isSuccess)
        {
          this.currentUsers = data.userVM;
        }
      },
      err => {

      }
    );
  }

  public addUpdateNewUser()
  {
    if (this.userForm.id == 0)
    {
      this.userManagerService.addNewUser(this.userForm).subscribe(
        data => {
          this.currentUsers.push(data.userVM[0]);
          this.clearUser();
        },
        err => {
  
        }
      );
    }
    else
    {
      this.userManagerService.updateUser(this.userForm).subscribe(
        data => {
          let userIndex = this.currentUsers.findIndex(u => u.id == this.userForm.id);
          this.currentUsers[userIndex] = data.userVM[0];
          this.clearUser();
        },
        err => {
  
        }
      );
    }
    
  }

  public updateUser(userId: number)
  {

  }

  public deleteUser(userId: number)
  {
    this.userManagerService.deleteUser(userId).subscribe(
      data => {
        if (data.isSuccess)
        {
          let userIndex = this.currentUsers.findIndex(u => u.id == userId);
          this.currentUsers.splice(userIndex, 1);
        }
      }
    )
  }
}
