import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTabPage } from './main-tab.page';

const routes: Routes = [
    {
        path: '',
        component: MainTabPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: 'list',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                    {
                        path: 'preferences',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/preferences/preferences.module#PreferencesPageModule'
                            }
                        ]
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                ]
            },
            {
                path: 'dashboard',
                children: [
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: '../discover/discover/discover.module#DiscoverPageModule'
                            }
                        ]
                    },
                ]
            },
            {
                path: 'news',
                children: [
                    {
                        path: '',
                        loadChildren: '../board/communityboard/communityboard.module#CommunityboardPageModule'
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                            }
                        ]
                    }
                ]
            },
            {
                path: 'myconversations',
                children: [
                    {
                        path: '',
                        loadChildren: '../connect/myconversations/myconversations.module#MyconversationsPageModule'

                    }
                ]
            },
            {
                path: 'me',
                children: [
                    {
                        path: '',
                        loadChildren: '../user/dashboard/dashboard.module#DashboardPageModule'
                    },
                ]
            },

            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../feature/showfeature/showfeature.module#ShowfeaturePageModule'
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: '../user/user.module#UserPageModule'
                    }
                ]
            },
            {
                path: 'manage',
                children: [
                    {
                        path: 'activity',
                        children: [
                            {
                                path: '',
                                loadChildren: '../feature/manage/managefeature.module#ManagefeaturePageModule'
                            },
                        ]
                    },
                    {
                        path: '',
                        loadChildren: '../manage/managecommunities/managecommunities.module#ManagecommunitiesPageModule'
                    }
                ]
            },
            {
                path: 'onboard',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../feature/onboardfeature/onboardfeature.module#OnboardfeaturePageModule'
                    }
                ]
            },
            {
                path: 'create',
                children: [
                    {
                        path: 'community',
                        children: [
                            {
                                path: '',
                                loadChildren: '../feature/createfeature/createfeature.module#CreatefeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: '',
                        loadChildren: '../feature/editfeature/editfeature.module#EditfeaturePageModule'
                    },
                ]
            },
            {
                path: 'edit',
                children: [
                    {
                        path: 'community',
                        children: [
                            {
                                path: ':id',
                                loadChildren: '../feature/createfeature/createfeature.module#CreatefeaturePageModule'
                            }
                        ]
                    },
                    {
                        path: ':id',
                        loadChildren: '../feature/editfeature/editfeature.module#EditfeaturePageModule'
                    },
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: '../connect/showrecipientinfo/showrecipientinfo.module#ShowrecipientinfoModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/app/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/discover',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainTabPageRoutingModule { }
