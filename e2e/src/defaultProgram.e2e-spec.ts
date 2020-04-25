import {
    AppPage,
    MaintabPage,
    RegisterPage,
    NewsPage,
    ChatPage,
    DiscoverPage,
    DashboardPage,
    ShowfeaturePage,
    PickfeaturePopoverPage,
    PickpeoplePopoverPage,
    CreateFeaturePage,
    AboutPage,
    PreferencesPage
} from './app.po';
import { browser, element, by } from 'protractor';

describe('Restvo App', function() {


    it('should have redirect homepage to have activity in the URL', function() {
      browser.get('https://app.restvo.com/');
        
    });
  });