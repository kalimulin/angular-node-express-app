import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from "../../../shared/services/positions.service";
import {Position} from "../../../shared/interfaces";
import {MaterialInstance, MaterialService} from "../../../shared/classes/material.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef
  positions: Position[] = []
  loading = false
  positionId = null
  modal: MaterialInstance
  form: FormGroup

  constructor(private positionsService: PositionsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    })
    this.loading = true
    this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.loading = false
        this.positions = positions
      })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy()
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.disable()
    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }
    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition)
        .subscribe(
          position => {
            this.positions[this.positions.findIndex(p => p._id === position._id)] = position
            MaterialService.toast('Позиция обновлена')
            this.modal.close()
          },
          error => {
            MaterialService.toast(error.error.message)
          },
          () => {
            this.form.enable()
            this.form.reset({name: '', post: 1})
          }
        )
    } else {
      this.positionsService.create(newPosition)
        .subscribe(
          position => {
            MaterialService.toast('Позиция создана')
            this.positions.push(position)
            this.modal.close()
          },
          error => {
            MaterialService.toast(error.error.message)
          },
          () => {
            this.form.enable()
            this.form.reset({name: '', post: 1})
          }
        )
    }
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm('Удалить позицию?')
    if (decision) {
      this.positionsService.delete(position).subscribe(
        res => {
          const i = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(i, 1)
          MaterialService.toast(res.message)
        },
        err => MaterialService.toast(err.error.message)
      )
    } else {

    }
  }

}
