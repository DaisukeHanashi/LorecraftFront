import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LeftsidePaneComponent } from '../leftside-pane/leftside-pane.component';

@Component({
  selector: 'app-admin-workspace',
  standalone: true,
  imports: [RouterModule, LeftsidePaneComponent],
  templateUrl: './admin-workspace.component.html',
  styleUrl: './admin-workspace.component.css'
})
export class AdminWorkspaceComponent {

}
