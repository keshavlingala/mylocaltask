import {Component, HostListener, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {TaskItemComponent} from "../task-item/task-item.component";
import {Task, TaskData} from "../models";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CdkDropList,
    TaskItemComponent,
    MatIcon
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnChanges {
  data: TaskData = {
    backlog: [],
    inProgress: [],
    completed: [],
    deleted: []
  }

  constructor(
    private taskService: TaskService
  ) {

  }

  ngOnInit(): void {
    this.data = this.taskService.data;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.taskUpdated()
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      this.addBacklog();
      event.preventDefault();
    }
  }

  addBacklog() {
    this.data.backlog.push({
      title: '',
      editing: true,
      id: Date.now()
    });
    this.taskUpdated();
  }

  taskUpdated() {
    this.taskService.data = this.data;
  }


  deleteTask(item: any) {
    this.data.deleted.push(item);
    this.data.backlog = this.data.backlog.filter(i => i.id !== item.id);
    this.data.inProgress = this.data.inProgress.filter(i => i.id !== item.id);
    this.data.completed = this.data.completed.filter(i => i.id !== item.id);
    this.taskUpdated();
  }


  ngOnChanges(changes: SimpleChanges) {
    this.taskUpdated();
  }

}

