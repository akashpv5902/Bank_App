import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
    @Input() item:string|undefined ;
    //input- it is used to hold the data from parent component
    @Output() onCancel = new EventEmitter();
    //output() -it is used to hold data child component
    @Output() onDelete = new EventEmitter();
    constructor() { }

  ngOnInit(): void {
  }
cancel(){   
  // alert('no')
  this.onCancel.emit()
}

delete(){
  // alert('delete clicked')
  this.onDelete.emit(this.item)
}
}
