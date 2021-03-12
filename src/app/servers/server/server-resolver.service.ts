import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

export interface Server {
    id: number,
    name: string,
    status: string
}

@Injectable()
export class ServerResolverService implements Resolve<Server>{
    constructor(private serverService: ServersService) {}
    
    resolve(state: ActivatedRouteSnapshot, route: RouterStateSnapshot): Observable<Server> |
        Promise<Server> | Server {
            return this.serverService.getServer(+state.paramMap.get('id'));
    }
}