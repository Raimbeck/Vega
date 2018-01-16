import { Vechile } from './../../models/vechile';
import { SaveVechile } from '../../models/savevechile';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'rxjs/operator/timeout';
import { Observable } from 'rxjs/Rx';
import { VechileService } from './../../services/vechile.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-vechile-form',
  templateUrl: './vechile-form.component.html',
  styleUrls: ['./vechile-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VechileFormComponent implements OnInit {
  makes: any[];
  models: any[];
  features: any[];
  vechile: SaveVechile = new SaveVechile();

  constructor(
    private vechileService: VechileService, 
    private toastyService: ToastyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.params.subscribe(p => {
      this.vechile.id = +p['id'] || 0;
    });
   }

  ngOnInit() {
    var sources = [
      this.vechileService.getMakes(),
      this.vechileService.getFeatures()
    ];

    if(this.vechile.id)
      sources.push(this.vechileService.getVechile(this.vechile.id));
    
    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.features = data[1];

      if(this.vechile.id) {
        this.setVechile(data[2]);
        this.populateModels();
      }
    }, err => {
      if(err.status == 404)
        this.router.navigate(['/home']);
    });
  }

  onMakeChange() {
    delete this.vechile.modelId;
    this.populateModels();
  }

  onFeatureToggle(featureId, $event) { 
    if($event.target.checked)
      this.vechile.features.push(featureId);
    else {
      var index = this.vechile.features.indexOf(featureId);
      this.vechile.features.splice(index, 1);
    }
  }

  submit() {
    if(this.vechile.id) {
      console.log("sdf");
      this.vechileService.update(this.vechile)
        .subscribe(response => {
          this.toastyService.success({
            title: 'Success',
            msg: 'Data was successfully updated.',
            theme: 'bootstrap',
            showClose: true,
            timeout: 5000
          });
        
        this.router.navigate(['/vechiles', response.id]);
        })
    }
    else{
      this.vechileService.create(this.vechile)
        .subscribe(x => this.router.navigate(['/vechiles']));
      }
  }

  setVechile(vechile: Vechile) {
    this.vechile.id = vechile.id;
    this.vechile.makeId = vechile.make.id;
    this.vechile.modelId = vechile.model.id;
    this.vechile.isRegistered = vechile.isRegistered;
    this.vechile.contact = vechile.contact;
    this.vechile.features =  vechile.features.map(f => f.id);
  }

  private populateModels() {
    var selectedMake = this.makes.find(m => m.id == this.vechile.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

  
}
