import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyconversationsPage} from './myconversations.page';

const routes: Routes = [
    {
        path: '',
        component: MyconversationsPage,
        children: [
            {
                path: 'chat',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../groupchat/groupchat.module').then(m => m.GroupchatPageModule)
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
                    }
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../../connect/showrecipientinfo/showrecipientinfo.module').then(m => m.ShowrecipientinfoModule)
                    }
                ]
            },
            {
                path: '',
                redirectTo:  '/app/myconversations/chat',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/manage/insight',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyconversationsRoutingModule { }
