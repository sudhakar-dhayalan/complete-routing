import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolverService } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  {
    path: 'servers', 
    canActivate: [AuthGuardService], 
    component: ServersComponent, 
    children: [
      { path: ':id', component: ServerComponent, resolve: { server: ServerResolverService} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  { path: 'error', component: ErrorComponent, data: {message: 'page not found'}},
  { path: '**', redirectTo: 'error' }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(appRoutes)
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModul {

}