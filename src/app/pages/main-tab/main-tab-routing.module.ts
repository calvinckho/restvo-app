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
                                loadChildren: () => import('../user/about/preferences/preferences.module').then(m => m.PreferencesPageModule)
                            }
                        ]
                    },
                    {
                        path: '',
                        children: [
                            {
                                path: '',
                                loadChildren: () => import('../user/home/home.module').then(m => m.HomePageModule)
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
                                loadChildren: () => import('../user/about/preferences/preferences.module').then(m => m.PreferencesPageModule)
                            }
                        ]
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: () => import('../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
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
                        loadChildren: () => import('../board/communityboard/communityboard.module').then(m => m.CommunityboardPageModule)
                    },
                    {
                        path: 'activity',
                        children: [
                            {
                                path: ':id',
                                loadChildren: () => import('../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
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
                        loadChildren: () => import('../connect/myconversations/myconversations.module').then(m => m.MyconversationsPageModule)

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
                        loadChildren: () => import('../user/dashboard/dashboard.module').then(m => m.DashboardPageModule)
                    },
                ]
            },

            {
                path: 'activity',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../feature/showfeature/showfeature.module').then(m => m.ShowfeaturePageModule)
                    }
                ]
            },
            {
                path: 'user',
                children: [
                    {
                        path: '',
                        loadChildren: () => import('../user/user.module').then(m => m.UserPageModule)
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
                                loadChildren: () => import('../feature/manage/managefeature.module').then(m => m.ManagefeaturePageModule)
                            },
                        ]
                    },
                    {
                        path: '',
                        loadChildren: () => import('../manage/managecommunities/managecommunities.module').then(m => m.ManagecommunitiesPageModule)
                    }
                ]
            },
            {
                path: 'onboard',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../feature/onboardfeature/onboardfeature.module').then(m => m.OnboardfeaturePageModule)
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
                                loadChildren: () => import('../feature/createcommunity/createcommunity.module').then(m => m.CreatecommunityPageModule)
                            }
                        ]
                    },
                    {
                        path: '',
                        loadChildren: () => import('../feature/editfeature/editfeature.module').then(m => m.EditfeaturePageModule)
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
                                loadChildren: () => import('../feature/createcommunity/createcommunity.module').then(m => m.CreatecommunityPageModule)
                            }
                        ]
                    },
                    {
                        path: ':id',
                        loadChildren: () => import('../feature/editfeature/editfeature.module').then(m => m.EditfeaturePageModule)
                    },
                ]
            },
            {
                path: 'person',
                children: [
                    {
                        path: ':id',
                        loadChildren: () => import('../connect/showrecipientinfo/showrecipientinfo.module').then(m => m.ShowrecipientinfoModule)
                    }
                ]
            },
            {
                path: 'completeprofile',
                loadChildren: () => import('../user/completeprofile/completeprofile.module').then(m => m.CompleteprofilePageModule)
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
