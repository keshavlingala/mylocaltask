import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutofocusDirective} from "../autofocus.directive";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

import {Task} from "../models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  imports: [
    MatTooltip,
    NgClass,
    MatIcon,
    AutofocusDirective
  ]
})
export class TaskItemComponent {
  @Input({required: true, alias: 'taskItem'}) task!: Task;
  @Output() updatedTask = new EventEmitter<Task | null>();
  @Output() deletedTask = new EventEmitter<Task>();

  editOff(event: Event, item: Task) {
    Promise.resolve().then(() => item.editing = false);
    item.title = (event.target as HTMLInputElement).value;
    this.updatedTask.emit(item);
  }

  editOn(item: Task) {
    item.editing = true;
    this.updatedTask.emit(item);
  }


  toggleFavorite(task: Task) {
    task.favorite = !task.favorite;
    this.updatedTask.emit(task);
  }


  deleteTask(task: Task) {
    this.deletedTask.emit(task);
  }
}
