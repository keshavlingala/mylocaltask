import {Component} from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatInput} from "@angular/material/input";
import {SlicePipe} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {AutofocusDirective} from "../autofocus.directive";
import {TaskItemComponent} from "../task-item/task-item.component";
import {Task} from "../models";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CdkDropList,
    CdkDrag,
    MatIcon,
    CdkDragHandle,
    FormsModule,
    MatInput,
    MatFormField,
    SlicePipe,
    MatTooltip,
    AutofocusDirective,
    TaskItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  backlog = ['Hello', 'Something', 'Something else']
    .map(item => {
      return {
        title: item,
        editing: false,
        id: Date.now()
      } as Task
    })
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep']
    .map(item => {
      return {
        title: item,
        editing: false,
        id: Date.now()
      } as Task
    })

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog']
    .map(item => {
      return {
        title: item,
        editing: false,
        id: Date.now()
      } as Task
    })

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
  }

  addBacklog() {
    this.backlog.push({
      title: '',
      editing: true,
      id: Date.now()
    });
  }

}

