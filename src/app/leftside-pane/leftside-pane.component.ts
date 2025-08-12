import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalService } from '../../services/localservice';
import { HttpService } from '../../services/httpservice';
import { Constants } from '../../utilities/constants';

@Component({
  selector: 'app-leftside-pane',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './leftside-pane.component.html',
  styleUrl: './leftside-pane.component.css'
})
export class LeftsidePaneComponent {
  isLoading = false;

  constructor(private router : Router, private localService : LocalService, private constant : Constants, private httpService : HttpService){}


  async logOut() : Promise<void>{

    try
    {
    this.isLoading = true;
    const response = await this.httpService.postSolely(this.constant.account, this.constant.logout);
    const result = JSON.parse(response);

    if(this.constant.isAllOkay(result.code))
      this.proceedToClear();

    }catch(error)    {
      console.error("Logout Failed!");
    }finally{
      this.isLoading = false;
    }

  }

  proceedToClear() : void{
    setTimeout( () => {
      this.localService.clearData();
      this.router.navigate(['/login']);
    }, 2500);
  }

}
