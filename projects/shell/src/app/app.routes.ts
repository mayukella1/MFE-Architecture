import { loadRemoteModule } from '@angular-architects/native-federation';
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'product',
        loadChildren: () =>
            loadRemoteModule('product', './routes').then(
                (m) => m.routes
            )
    },
     {
        path: 'account',
        loadChildren: () =>
            loadRemoteModule('account', './routes').then(
                (m) => m.routes
            )
    }
];
