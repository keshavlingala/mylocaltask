import {Component, Input, ViewEncapsulation} from '@angular/core';
import {AutofocusDirective} from "../autofocus.directive";
import {CdkDrag, CdkDragHandle} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";

import {Task} from "../models";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    AutofocusDirective,
    CdkDrag,
    CdkDragHandle,
    MatIcon,
    MatTooltip,
    NgClass
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input({required: true, alias: 'taskItem'}) task!: Task;


  editOff(event: Event, item: Task) {
    item.editing = false;
    item.title = (event.target as HTMLInputElement).value;
    event.preventDefault();
  }

  editOn(item: Task) {
    item.editing = true;
  }

  editHandler($event: KeyboardEvent, item: Task) {
    if ($event.key === 'Enter') {
      item.editing = false;
    }
  }

  toggleFavorite(task: Task) {
    task.favorite = !task.favorite;
    console.log('toggleFavorite', task)
  }
}
