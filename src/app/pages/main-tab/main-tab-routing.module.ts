import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainTabPage } from './main-tab.page';

const routes: Routes = [
    {
        path: '',
        component: MainTabPage,
        children: [
            {
                path: 'home',
                children: [
                    {
                        path: 'preferences',
                        children: [
                            {
                                path: '',
                                loadChildren: '../user/about/preferences/preferences.module#PreferencesPageModule'
                            }
                        ]
                    },
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: '../user/home/home.module#HomePageModule'
                            }
                        ]
                    },
                ]
            },
            {
                path: 'discover',
                children: [
                    {
                        path: 'preferences',
                        children: [
                            {
                                path: '',
                                loadChildren: '../user/about/preferences/preferences.module#PreferencesPageModule'
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
                                loadChildren: () => import('../user/discover/discover.module').then( m => m.DiscoverPageModule)
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
                        path: 'choose',
                        loadChildren: () => import('../feature/pickfeature-popover/pickfeature-popover.module').then( m => m.PickfeaturePopoverPageModule)
                    },
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
                                loadChildren: '../feature/createcommunity/createcommunity.module#CreatecommunityPageModule'
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
                                loadChildren: '../feature/createcommunity/createcommunity.module#CreatecommunityPageModule'
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
                path: 'completeprofile',
                loadChildren: '../user/completeprofile/completeprofile.module#CompleteprofilePageModule'
            },
            {
                path: 'invite',
                loadChildren: () => import('../feature/pickfeature-popover/pickfeature-popover.module').then( m => m.PickfeaturePopoverPageModule)
            },
            {
                path: 'video/:id',
                loadChildren: () => import('../connect/videoconference/videoconference.module').then( m => m.VideoconferencePageModule)
            },
            {
                path: 'success',
                loadChildren: () => import('../feature/success-popover/success-popover.module').then( m => m.SuccessPopoverPageModule)
            },
            {
                path: 'designsystem',
                loadChildren: () => import('../manage/designsystem/designsystem.module').then( m => m.DesignsystemPageModule)
            },
            {
                path: '',
                redirectTo: '/app/me',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/app/me',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainTabPageRoutingModule { }
