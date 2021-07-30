import { Router } from '@angular/router';
import { RbService } from '../rb.service';

export class Common {
    constructor(private rbservice: RbService, private router: Router) {

    }
    loggedOut(): any {
        if (!this.rbservice.loggedIn) {
            this.router.navigateByUrl('users/login');
          }
    }

}

