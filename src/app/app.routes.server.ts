import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
// import { Routes } from '@angular/router';

// export const serverRoutes: Routes = [
//     // Aquí puedes añadir rutas específicas para el servidor si las necesitas
// ];