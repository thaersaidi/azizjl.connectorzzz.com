import { HttpClient } from '@angular/common/http'
import { Component, OnInit } from '@angular/core'
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public references: any

  dataFromParent: any;
  private subscription: Subscription;

  constructor(private dataService: DataService, private readonly http: HttpClient) { }


  ngOnInit() {
    this.subscription = this.dataService.fetchData().subscribe(data => {
      this.dataFromParent = data;
      this.references = data.references;
    });
    const innerContent = document.getElementById('inner-content')
    if (innerContent) {
      innerContent.scrollIntoView()
    }
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();

  }
}
