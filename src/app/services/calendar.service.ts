import {Injectable, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Auth } from './auth.service';
import { UserData } from './user.service';
import { NetworkService } from './network-service.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CalendarService {

    calendarItems: any = [];
    hasUpcomingItems = false;
    calendar = {
        mode: 'month',
        viewTitle: '',
        currentDate: new Date(),
        currentViewDate: new Date(),
        selectedDate: new Date(),
        daysInViewMonth: [],
        daysInViewWeek: [],
        eventTimes: [],
    };


    constructor(private http: HttpClient,
                private zone: NgZone,
                public storage: Storage,
                public authService: Auth,
                public userService: UserData,
                public networkService: NetworkService) {
        this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth(), this.calendar.currentViewDate.getFullYear());
        this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth(), this.calendar.currentViewDate.getFullYear());
        this.zone.runOutsideAngular(() => {
            setInterval(() => {
                this.zone.run(() => {
                    this.calendar.currentDate = new Date();
                    this.calendar.currentViewDate = new Date();
                });
            }, 3600000); // calculate the currentDate and currentViewDate every hour
        });
    }

    async loadRelationshipContentCalendars(relationshipId, authenticationStrategy) {
        let promise: any;
        if (authenticationStrategy && this.authService.token) {
            promise = await lastValueFrom(this.http.get(this.networkService.domain + '/api/moment/relationship/contentcalendars/' + relationshipId, this.authService.httpAuthOptions)
                );
        } else {
            promise = await lastValueFrom(this.http.get(this.networkService.domain + '/api/moment/relationship/publiccontentcalendars/' + relationshipId, this.authService.httpOptions)
                );
        }
        return promise;
    }

    getAllUserCalendarItemIds() {
        return lastValueFrom(this.http.get<[{_id: string}]>(this.networkService.domain + '/api/auth/calendaritemids', this.authService.httpAuthOptions)
            );
    }

    async getUserCalendar() {
        if (!this.authService.token) {
            return;
        }
        try {
            // load calendar items from storage
            const calendarItems = await this.storage.get('calendarItems');
            this.calendarItems = calendarItems || [];
        } catch (err) {
            this.calendarItems = [];
        }
        const lastUpdatedAt = this.findLatestTimeStamp(this.calendarItems);
        try {
            const latestCalendarItems = await this.fetchLatestCalendarItems(lastUpdatedAt);
            const calendarItemIdList = this.calendarItems.map((c) => c._id);
            latestCalendarItems.forEach((latestCalendarItem) => {
                const index = calendarItemIdList.indexOf(latestCalendarItem._id);
                if (index > -1) { // if the item was loaded and new update is available
                    this.calendarItems[index] = latestCalendarItem;
                } else { // if the item has not been loaded before
                    this.calendarItems.push(latestCalendarItem);
                    calendarItemIdList.push(latestCalendarItem._id);
                }
            });
            if (this.calendarItems.length) {
                const latestCalendarItemIdList = await this.getAllUserCalendarItemIds();
                for (let i = calendarItemIdList.length - 1; i >= 0; i--) {
                    if (latestCalendarItemIdList.indexOf(calendarItemIdList[i]) === -1) { // if an item is deleted on the server
                        this.calendarItems.splice(i, 1);
                    }
                }
            }
            if (this.calendarItems.length) {
                this.storage.set('calendarItems', this.calendarItems);
                this.updateViewCalendar();
            }
            // console.log('current calendarItems length', this.calendarItems.length);
            await this.calendarItems.sort(function (a, b) {
                const c: any = new Date(a.startDate);
                const d: any = new Date(b.startDate);
                return (c - d); // oldest to newest
            });
            return this.calendarItems;
        } catch (err) {
            console.log(err);
            return this.calendarItems = [];
        }
    }

    async fetchLatestCalendarItems(lastUpdatedAt) {
        const urlString = lastUpdatedAt ? '?lastUpdatedAt=' + new Date(lastUpdatedAt).getTime() : '';
        return lastValueFrom(this.http.get<[any]>(this.networkService.domain + '/api/auth/calendaritems' + urlString, this.authService.httpAuthOptions)
            );
    }

    findLatestTimeStamp(calendarItems) {
        let latestTimeStamp = 0;
        calendarItems.forEach((item) => {
            latestTimeStamp = (new Date(item.updatedAt).getTime() > new Date(latestTimeStamp).getTime()) ? item.updatedAt : latestTimeStamp;
        });
        return latestTimeStamp;
    }

    changeMode( inputMode ) {
        this.calendar.mode = inputMode;
        // calibrate the first day of the week to properly render the month title
        this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear() );
        this.updateViewCalendar();
    }

    changeDate( event, direction ) {
        if ( this.calendar.mode === 'month') {
            if ( event.direction === 4 || direction === 4 ) { // if right swipe
                this.calendar.currentViewDate.setMonth( this.calendar.currentViewDate.getMonth() - 1);
                this.calendar.selectedDate.setMonth(this.calendar.selectedDate.getMonth() - 1);
                this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear());
                this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear() );
            } else if ( event.direction === 2 || direction === 2 ) { // if left swipe
                this.calendar.currentViewDate.setMonth( this.calendar.currentViewDate.getMonth() + 1);
                this.calendar.selectedDate.setMonth(this.calendar.selectedDate.getMonth() + 1);
                this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear());
                this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear() );

            }
        } else if (this.calendar.mode === 'week') {
            if ( event.direction === 4  || direction === 4) {
                this.calendar.currentViewDate.setDate( this.calendar.currentViewDate.getDate() - 7 );
                this.calendar.selectedDate.setDate(this.calendar.selectedDate.getDate() - 7);
                this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear());
                this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear() );
            } else if ( event.direction === 2 || direction === 2) {
                this.calendar.currentViewDate.setDate( this.calendar.currentViewDate.getDate() + 7);
                this.calendar.selectedDate.setDate(this.calendar.selectedDate.getDate() + 7);
                this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear());
                this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth() , this.calendar.currentViewDate.getFullYear() );
            }
        }
        this.updateViewCalendar();
    }

    getDaysInMonth(month, year) {
        const date = new Date(year, month, 1);
        const daysOfMonth = [];
        const firstDay = date.getDay();
        for (let emptyDate = 0; emptyDate < firstDay; emptyDate++) {
            daysOfMonth.push({date: ' ', dayEvents: []});
        }
        while (date.getMonth() === month) {
            daysOfMonth.push({date: new Date(date), dayEvents: []});
            date.setDate(date.getDate() + 1);
        }
        return daysOfMonth;
    }

    getDaysInWeek( day , month , year ) {
        const firstDayOfWeek = new Date( year, month, day);
        const daysOfWeek = [];
        if (this.calendar.mode === 'month') {
            const adjustedDay = firstDayOfWeek.getDate() - firstDayOfWeek.getDay();
            firstDayOfWeek.setDate( adjustedDay > 0 ? adjustedDay : 1 );
        } else if (this.calendar.mode === 'week') {
            firstDayOfWeek.setDate( firstDayOfWeek.getDate() - firstDayOfWeek.getDay() );
        }
        this.calendar.currentViewDate.setDate(firstDayOfWeek.getDate()); // set the currentViewDate to the first day of the week to properly render the Month calendar title
        for ( let dayIndex = 0; dayIndex < 7; dayIndex++ ) {
            daysOfWeek.push({date: new Date(firstDayOfWeek), dayEvents: []});
            firstDayOfWeek.setDate( firstDayOfWeek.getDate() + 1 );
        }
        return daysOfWeek;
    }

    updateViewCalendar() {
        this.calendar.viewTitle = (this.calendar.mode === 'month' || this.calendar.mode === 'week') ? new Date(this.calendar.currentViewDate).toLocaleString('en-US', {
            month: 'long',
            year: 'numeric'
        }) : '';
        // reset the calendar views based on current view date
        this.calendar.daysInViewMonth = this.getDaysInMonth( this.calendar.currentViewDate.getMonth(), this.calendar.currentViewDate.getFullYear());
        this.calendar.daysInViewWeek = this.getDaysInWeek( this.calendar.currentViewDate.getDate() , this.calendar.currentViewDate.getMonth(), this.calendar.currentViewDate.getFullYear());
        for (const calendarItem of this.calendarItems) {
            // check to see if there are upcoming events
            if (calendarItem.startDate && calendarItem.endDate && calendarItem.moment && calendarItem.moment.resource && calendarItem.moment.resource.field) {
                calendarItem.validUpcomingItem = (new Date(calendarItem.endDate).getTime() >= new Date().getTime() - 24 * 60 * 60 * 1000);
                if (new Date(calendarItem.startDate).getTime() < new Date().getTime() - 2 * 24 * 60 * 60 * 1000) {
                    calendarItem.status = 'Past';
                } else if (new Date(calendarItem.startDate).getTime() > new Date().getTime() + 2 * 24 * 60 * 60 * 1000) {
                    calendarItem.status = 'Upcoming';
                } else {
                    calendarItem.status = 'Current';
                }
                calendarItem.completed = false;
                this.hasUpcomingItems = true;
            }
            // populate the current calendar month view daysEvents
            for (const dayOfMonth of this.calendar.daysInViewMonth) {
                if ( this.eventOnDay( dayOfMonth.date , calendarItem ) ) {
                    calendarItem.pastEvent = this.pastEvent(calendarItem.endDate);
                    dayOfMonth.dayEvents.push(calendarItem);
                }
            }
            // populate the current calendar week view daysEvents
            for (const dayOfWeek of this.calendar.daysInViewWeek) {
                if ( this.eventOnDay( dayOfWeek.date , calendarItem ) ) {
                    calendarItem.pastEvent = this.pastEvent(calendarItem.endDate);
                    dayOfWeek.dayEvents.push(calendarItem);
                }
            }
            if (calendarItem.users && calendarItem.users.length) {
                calendarItem.users = calendarItem.users.filter((c) => c._id.toString() !== this.userService.user._id.toString());
            }
        }
    }

    // returns true if there is an event on this day or event is valid, false otherwise
    eventOnDay(dayOfMonth, calendarItem) {
        // first check if event is valid
        if (calendarItem.startDate && calendarItem.endDate && calendarItem.moment && calendarItem.moment.resource && calendarItem.moment.resource.field) {
            // get all dates as JavaScript Date objects and set the date time to 0 so not comparing hours, mintues, etc.
            const startDateWithTime = new Date(calendarItem.startDate);
            const startDate = new Date(startDateWithTime.getFullYear(), startDateWithTime.getMonth(), startDateWithTime.getDate());
            const endDateWithTime = new Date(calendarItem.endDate);
            const endDate = new Date(endDateWithTime.getFullYear(), endDateWithTime.getMonth(), endDateWithTime.getDate());

            if ((calendarItem.moment.resource.field === 'User Defined Activity') && (startDate <= dayOfMonth && dayOfMonth <= endDate)) {
                return true;
            }
        } else {
            return false;
        }
    }

    getDaysEvents( day ) {
        const daysEvents = [];
        for ( let i = 0; i < this.calendarItems.length; i++ ) {
            if ( this.eventOnDay( day , this.calendarItems[i] ) ) {
                daysEvents.push( this.calendarItems[i] );
            }
        }
        return daysEvents;
    }

    pastEvent(dateTime) {
        return new Date(dateTime).getTime() < (new Date().getTime() - (2 * 24 * 60 * 60 * 1000));
    }
}
