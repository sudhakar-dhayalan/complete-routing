import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit: boolean;
  statusUpdated = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.allowEdit = +params["allowEdit"] === 1 ? true : false
    })
    this.route.params.subscribe(
      (params) => {
        this.server = this.serversService.getServer(+params.id);
      }
    )

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.statusUpdated = true;
    this.router.navigate(['../../'], { relativeTo: this.route });
  }

  canDeactivate() {
    if (!this.allowEdit) {
      return true;
    } else if (!this.statusUpdated && (this.serverName !== this.server.name || this.serverStatus !== this.server.status)) {
      return confirm("Do you want to discard the changes you've made?");
    } else {
      return true;
    }
  }
}
