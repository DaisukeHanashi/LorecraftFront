import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-workspace',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './admin-workspace.component.html',
  styleUrl: './admin-workspace.component.css'
})
export class AdminWorkspaceComponent {

}
