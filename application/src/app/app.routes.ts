import { Routes } from '@angular/router';
import { Sign } from './components/pages/sign/sign';
import { Dashboard } from './components/pages/dashboard/dashboard';
import { Upl } from './components/pages/upl/upl';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Relatorios } from './components/pages/relatorios/relatorios';
import { Painel } from './components/pages/painel/painel';
import {Perfil} from './components/pages/perfil/perfil';


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
        }, 
        {
                path: 'upl',
                component: Upl
            },
        {
                path: 'relatorios',
                component: Relatorios
            },
        {
                path: 'painel',
                component: Painel
            },
        {
                path: 'perfil',
                component: Perfil
            }]
    }
];
