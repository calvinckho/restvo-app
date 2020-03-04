import {NgModule} from '@angular/core';
import {Nl2brPipe} from './nl2br.pipe';
import {BackgroundPipe} from './background.pipe';
import {DatetimePipe} from "./datetime.pipe";
import {CalendarPipe} from "./calendar.pipe";


@NgModule({
    imports: [
        // dep modules
    ],
    declarations: [
        Nl2brPipe,
        BackgroundPipe,
        DatetimePipe,
        CalendarPipe
    ],
    exports: [
        Nl2brPipe,
        BackgroundPipe,
        DatetimePipe,
        CalendarPipe
    ]
})
export class ApplicationPipesModule {}