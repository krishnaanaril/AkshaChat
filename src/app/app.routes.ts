import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChatlistComponent } from './views/chatlist/chatlist.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { SearchComponent } from './views/search/search.component';

const appRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuardService],
        component: DashboardComponent
    },
    {
        path: 'chatlist',
        canActivate: [AuthGuardService],
        component: ChatlistComponent
    },
    {
        path: 'contacts',
        canActivate: [AuthGuardService],
        component: ContactsComponent
    },
    {
        path: 'search',
        canActivate: [AuthGuardService],
        component: SearchComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const AppRoutes = RouterModule.forRoot(appRoutes);