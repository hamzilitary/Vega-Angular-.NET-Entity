import { ErrorHandler, Inject, NgZone } from "@angular/core";
import { ToastyService } from "ng2-Toasty";

export class AppErrorHandler implements ErrorHandler {
    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) {

    }
    handleError(error: any): void {
        //throw new => Error("Method not implemented.");
        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: 'An Unexpected Error Happened.',
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
              });
        });
       
    }

}