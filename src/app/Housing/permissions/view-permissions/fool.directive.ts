import {Directive,OnInit,Optional,Output,EventEmitter} from '@angular/core'
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Directive({
  selector: '[fool]',
  exportAs: 'fool'
})
export class FoolDirective implements OnInit {
  @Output() paginatorLoaded:EventEmitter<MatPaginator>=new EventEmitter<MatPaginator>()
  ngOnInit()
  {
    console.log('from directive');

    setTimeout(()=>{
      if (this.table && this.sort)
        (this.table.dataSource as any).sort=this.sort
      if (this.paginator)
        this.paginatorLoaded.emit(this.paginator)
    })
  }
  constructor(@Optional() private sort:MatSort,@Optional() private table:MatTable<any>,@Optional() private paginator:MatPaginator){}
}
