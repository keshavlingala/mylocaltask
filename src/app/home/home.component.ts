import {Component, HostListener, OnInit} from '@angular/core';
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
import {NgClass, NgIf, NgStyle, SlicePipe} from "@angular/common";
import {MatTooltip} from "@angular/material/tooltip";
import {AutofocusDirective} from "../autofocus.directive";
import {TaskItemComponent} from "../task-item/task-item.component";
import {Task, TaskData} from "../models";
import {MatFabButton} from "@angular/material/button";

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
    TaskItemComponent,
    MatFabButton,
    NgIf,
    NgClass,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  data: TaskData = {
    backlog: [],
    inProgress: [],
    completed: [],
    deleted: []
  }
  public isDragging: boolean = false;

  ngOnInit(): void {
    this.data = JSON.parse(localStorage.getItem('taskData') || '') || this.data;
    console.log(this)
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
    this.taskUpdated();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.shiftKey && event.key === 'N') {
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
  }

  dragChange($event: boolean) {
    this.isDragging = $event;
  }

  taskUpdated() {
    console.log('Task Updated')
    localStorage.setItem('taskData', JSON.stringify(this.data));
  }
}

