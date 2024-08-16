import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable()
export class BaseComponent {
    subs = new Subscription();
    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}