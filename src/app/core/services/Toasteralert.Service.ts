import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterAlertService {


    constructor(public toastr: ToastrService
    ) { 
      
    }
  
    toastrwarnning(warning:any) {
      this.RemoveToastr();
      this.toastr.warning(warning, '', {
        positionClass: 'toast-top-center', enableHtml: true
       
      });
    }
  
    toastrwarnningbottomright(warning:any) {
      this.RemoveToastr();
      this.toastr.warning(warning, '', {
        positionClass: 'toast-bottom-right', enableHtml: true
      });
    }
  
    toastrerror(error:any) {
      this.RemoveToastr();
      this.toastr.error(error, '', {
        positionClass: 'toast-top-center'
      });
    }
  
  toastersuccesstop(success:any){
    this.RemoveToastr();
    this.toastr.success(success, '', {
      positionClass: 'toast-top-center'
    });
  }
  
  toastersuccessbottomright(success:any){
    this.RemoveToastr();
    this.toastr.success(success, '', {
      positionClass: 'toast-bottom-right'
    });
  }
  
  
    toastrerrorbottom(warning:any) {
      this.RemoveToastr();
      this.toastr.warning(warning, '', {
        positionClass: 'toast-bottom-right'
      });
    }
  
    toastrwarningbottom(error:any) {
      this.RemoveToastr();
      this.toastr.error(error, '', {
        positionClass: 'toast-bottom-right'
      });
    }
  
    RemoveToastr() {
      this.toastr.clear();
    }
  }
  