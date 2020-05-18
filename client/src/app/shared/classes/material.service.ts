import {ElementRef} from "@angular/core";

declare var M

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
}

export class MaterialService {
  static toast(message: String) {
    M.toast({html: message})
  }

  static InitializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef) {
    return M.Modal.init(ref.nativeElement)
  }
}
