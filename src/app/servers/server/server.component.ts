import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { Server } from './server-resolver.service';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (data: Server) => {
        this.server = data['server'];
      }
    )
    // const id = +this.activatedRoute.snapshot.paramMap.get('id');
    // this.server = this.serversService.getServer(id);
    // this.activatedRoute.params.subscribe(
    //   (params) => {
    //     this.server = this.serversService.getServer(+params.id);
    //   }
    // )
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'});
  }

}
