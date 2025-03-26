import { Observable } from "rxjs/Observable";

export interface CanComponentDeactivate{
    canDeactivate: () => Observable
}