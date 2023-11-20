import { NgModule } from '@angular/core';
import { DataResolverService } from './services/data-resolver.service';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { GeoResolverService } from './services/georesolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    resolve: {
      resolvedData: DataResolverService,
      geoData: GeoResolverService,
    },
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrarse',
    loadChildren: () => import('./pages/registrarse/registrarse.module').then( m => m.RegistrarsePageModule)
  },
  {
    path: 'inicio-sesion',
    loadChildren: () => import('./pages/inicio-sesion/inicio-sesion.module').then( m => m.InicioSesionPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'sobre-nosotros',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/sobre-nosotros/sobre-nosotros.module').then( m => m.SobreNosotrosPageModule)
  },
  {
    path: 'recovery-two',
    loadChildren: () => import('./recovery-two/recovery-two.module').then( m => m.RecoveryTwoPageModule)
  },

  // {
  //   path: 'clase',
  //   loadChildren: () => import('./pages/clase/clase.module').then( m => m.ClasePageModule)
  // },
  // {
  //   path: 'pasajero-clase',
  //   loadChildren: () => import('./pages/pasajero-clase/pasajero-clase.module').then( m => m.PasajeroClasePageModule)
  // },
  // {
  //   path: 'conductor-clase',
  //   loadChildren: () => import('./pages/conductor-clase/conductor-clase.module').then( m => m.ConductorClasePageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
