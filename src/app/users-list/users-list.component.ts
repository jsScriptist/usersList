import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';
import {User} from '../shared/user';
import {MatListOption} from '@angular/material/list';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  usersList: User[] = [];
  username: string;
  user: string;
  role: string;
  selectedList: User[];

  constructor(public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersList = this.usersService.getUsersList();
    setTimeout(() => {
      this.username = 'Andrew';
    }, 2000);
    setTimeout(() => {
      this.username = 'Katrin';
    }, 4000);
  }

  search(query: string): void {
    this.usersList = this.usersService.findUser(query);
  }
  sortList(direction: string): void {
    this.usersList = this.usersService.sortUsers(direction);
  }
  addUser(): void {
    this.usersService.addUser({
      id: Math.trunc(Math.random() * 100),
      name: this.user,
      username: this.username,
      email: '',
      role: this.role,
      phone: '',
      website: ''
    });
  }
  selectUsers(users: MatListOption[]): void {
    this.selectedList = [];
    users.forEach(i => this.selectedList.push(i.value));
  }
  deleteUsers(): void {
    this.usersService.deleteUsers(this.selectedList);
    this.usersList = this.usersService.getUsersList();
  }
}
