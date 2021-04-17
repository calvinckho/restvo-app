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
                        loadChildren: '../groupchat/groupchat.module#GroupchatPageModule'
                    }
                ]
            },
            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../../connect/showrecipientinfo/showrecipientinfo.module#ShowrecipientinfoModule'
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
