import { AuthService } from './../services/auth.service';
import { VechileService } from './../services/vechile.service';
import { KeyValuePair, Vechile } from '../models/vechile';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-vechile-list',
  templateUrl: './vechile-list.component.html',
  styleUrls: ['./vechile-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VechileListComponent implements OnInit {
  queryResult: any = {};
  makes: KeyValuePair[];
  query: any = {
    pageSize: 3
  };
  columns: any = [
    { title: "Id" },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact  Name", key: "contactName", isSortable: true },
    {}
  ];

  constructor(private vechileService: VechileService, public authService: AuthService) { }

  ngOnInit() {
    this.vechileService.getMakes()
      .subscribe(makes => this.makes = makes);
    
    this.populateVechiles();
  }

  onFilterChange() {
    // var vechiles = this.allVechiles;
    // if(this.filter.makeId)
    //   vechiles = vechiles.filter(v => v.make.id == this.filter.makeId);

    // this.vechiles = vechiles;
    this.query.page = 1;
    this.populateVechiles();
  }

  populateVechiles() {
    this.vechileService.getVechiles(this.query)
      .subscribe(result => this.queryResult = result);
  }

  resetFilter() {
    this.query = {
      page: 1,
      pageSize: 3
    };
    this.populateVechiles();
  }

  sortBy(columnName) {
      if(this.query.sortBy === columnName) {
        this.query.isSortAscending = !this.query.isSortAscending;
      }
      else {
        this.query.sortBy = columnName;
        this.query.isSortAscending = true;
      }

      this.populateVechiles();
  }

  onPageChange(page) {
    this.query.page = page;
    this.populateVechiles();
  }

}
