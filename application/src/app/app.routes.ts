import { Routes } from '@angular/router';
import { Sign } from './components/pages/sign/sign';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { MainLayout } from './layouts/main-layout/main-layout';

export const routes: Routes = [
    {
        path: 'sign',
        component: Sign
    },
    {
        path: '',
        component: MainLayout,
        children: [{
            path: 'dashboard',
            component: Dashboard
        }]
    }
];
