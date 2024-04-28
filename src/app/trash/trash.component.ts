import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {TaskData} from "../models";
import {TaskService} from "../task.service";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {TaskItemComponent} from "../task-item/task-item.component";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-trash',
  standalone: true,
  templateUrl: './trash.component.html',
  imports: [
    MatButton,
    RouterLink,
    TaskItemComponent,
    MatIcon
  ],
  styleUrl: './trash.component.scss'
})
export class TrashComponent implements OnChanges {
  data!: TaskData;

  constructor(
    private taskService: TaskService
  ) {
    try {
      this.data = JSON.parse(localStorage.getItem('taskData') || '')
    } catch (e) {
      console.log('Error parsing data from local storage')
    }
  }

  restoreAll() {
    this.data.backlog.push(...this.data.deleted)
    this.data.deleted = []
    this.updateData()
  }

  deleteAll() {
    this.data.deleted = []
    this.updateData()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.updateData()
  }

  private updateData() {
    this.taskService.data = this.data
  }
}
