import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton, MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbar, MatIcon, MatMenuTrigger, MatMenu, MatMenuItem, MatButton, MatIconButton, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task-app';

  clearAll() {
    localStorage.clear()
  }

  downloadTasks() {
    let data = JSON.parse(localStorage.getItem('taskData') || '')
    //    Download JSON Object as a file
    let a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'}));
    a.download = 'taskData.json';
    a.click();
  }
}
