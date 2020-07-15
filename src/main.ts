import 'zone.js/dist/task-tracking';
import * as _ from 'lodash';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgZone } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs'; // HAMMER TIME


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule).then((moduleInstance) => {
  if ('serviceWorker' in navigator && environment.production) {
    navigator.serviceWorker.register('./ngsw-worker.js');
  }

  // the follow code is used to diagnose ngZone blocking issues with Protractor
  const ngZone = moduleInstance.injector.get(NgZone);
  setInterval(() => {
    const taskTrackingZone = (<any>ngZone)._inner.getZoneWith("TaskTrackingZone");
    if (!taskTrackingZone) {
      throw new Error("'TaskTrackingZone' zone not found! Have you loaded 'node_modules/zone.js/dist/task-tracking.js'?");
    }
    let tasks: any[] = taskTrackingZone._properties.TaskTrackingZone.getTasksFor("macroTask");
    tasks = _.clone(tasks);
    if (_.size(tasks) > 0) {
      console.log("ZONE pending tasks=", tasks);
    }
  }, 1000);
})

  .catch(err => console.log(err));
