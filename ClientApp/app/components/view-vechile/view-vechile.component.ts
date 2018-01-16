import { AuthService } from './../../services/auth.service';
import { BrowserXhr } from '@angular/http';
import { ToastyService } from 'ng2-toasty';
import { ProgressService, BrowserXhrWithProgress } from './../../services/progress.service';
import { PhotoService } from './../../services/photo.service';
import { VechileService } from '../../services/vechile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, NgZone } from '@angular/core';

@Component({
  selector: 'view-vechile',
  templateUrl: './view-vechile.component.html',
  styleUrls: ['./view-vechile.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    ProgressService,
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress}
  ]
})
export class ViewVechileComponent implements OnInit {
  vechile: any;
  vechileId: any;
  progress: any;
  photos: any[];
  @ViewChild('fileInput') fileInput: ElementRef;
  subscription: any;
  constructor(
    private route: ActivatedRoute, 
    private vechileService: VechileService, 
    private router: Router, 
    private photoService: PhotoService,
    private progressService: ProgressService,
    private zone: NgZone,
    private toastyService: ToastyService,
    public authService: AuthService
  ) { 

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.vechileId = +params['id']
      if(isNaN(this.vechileId) || this.vechileId<=0) {
        this.router.navigate(['/vechiles']);
        return;
      }
    });

    this.photoService.getPhotos(this.vechileId)
      .subscribe(photos => this.photos = photos);

    this.vechileService.getVechile(this.vechileId)
      .subscribe(vechile => this.vechile = vechile, err => {
        if(err.status == 404)
          this.router.navigate(['vechiles']);
        return;
      });
  }

  delete() {
    if(confirm("Are you sure?")) {
      this.vechileService.delete(this.vechile.id)
        .subscribe(x => {
          this.router.navigate(['/vechiles']);
        });
    }
  }

  uploadPhoto() {
    this.subscription = this.progressService.uploadProgress
      .subscribe(progress => {
        this.zone.run(() => {
          this.progress = progress;
        });
      },
    undefined,
    () => this.progress = null);

    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;
    var file = nativeElement.files![0];
    nativeElement.value = '';

    this.photoService.upload(this.vechileId, file)
      .subscribe(photo => { 
        this.subscription.unsubscribe();
        this.photos.push(photo);
      },
    err => {
      this.toastyService.error({
          title: 'Error',
          msg: err.text(),
          theme: 'bootstrap',
          showClose: true,
          timeout: 5000
        });
    });
  }

}
