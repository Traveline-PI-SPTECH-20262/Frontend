import { Routes } from '@angular/router';
import { Sign } from './components/pages/sign/sign';
import { Dashboard } from './components/pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'sign',
        component: Sign
    },
    {
        path: '',
        component: Dashboard
    }
];
