import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'tabs', pathMatch: 'full' },
	// { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
	// {
	// 	path: 'detail/:id',
	// 	loadChildren: () => import('./detail/detail.module').then(m => m.DetailPageModule),
	// },
	{
		path: 'tabs',
		loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
	},
	{
		path: 'tab2',
		loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
	exports: [RouterModule],
})
export class AppRoutingModule {}
