import {ElementRef} from "@angular/core";

declare var M

export class MaterialService {
  static toast(message: String) {
    M.toast({html: message})
  }

  static InitializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }
}
