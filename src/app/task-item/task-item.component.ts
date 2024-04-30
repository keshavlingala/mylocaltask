import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AutofocusDirective} from "../autofocus.directive";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

import {Task} from "../models";
import {NgClass} from "@angular/common";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-task-item',
  standalone: true,
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
  imports: [
    MatTooltip,
    NgClass,
    MatIcon,
    AutofocusDirective,
    CdkDrag,
    CdkDragHandle
  ]
})
export class TaskItemComponent {
  @Input({required: true, alias: 'taskItem'}) task!: Task;
  @Output() updatedTask = new EventEmitter<Task | null>();
  @Output() deletedTask = new EventEmitter<Task>();
  @Input() dragDisabled: boolean = false;

  constructor(
    private taskService: TaskService
  ) {
  }

  async editOff(event: Event, item: Task) {
    await Promise.resolve().then(() => item.editing = false);
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
