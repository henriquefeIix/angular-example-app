import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/core/models/user.model';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnChanges {

  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'birthDate', 'cpf', 'role', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() action: any;
  @Output() userEditEvent = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: (value) => {
        this.dataSource = new MatTableDataSource<User>(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => console.log(error)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('action' in changes && changes['action'].currentValue) {
      const { action, user } = changes['action'].currentValue;
      if (action === 'save') {
        this.dataSource.data = [...this.dataSource.data, user];
      } else {
        this.dataSource.data = this.dataSource.data.map((item) => {
          return (item.id === user.id) ? user : item;
        })
      }
    }
  }

  edit(user: User): void {
    this.userEditEvent.emit(user);
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe({
      next: () => {
        const users = this.dataSource.data.filter((item) => item.id !== id);
        this.dataSource.data = [...users];
      },
      error: (error) => console.error(error)
    });
  }

}
