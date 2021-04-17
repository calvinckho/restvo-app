import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendar',
  pure: false
})
export class CalendarPipe implements PipeTransform {

  transform(calendarItems: any, type?: any, data?: any): any {
    if (type === 'chattimestamp') {
      if (data.messages && data.messages.length) {
        if (data.index === 0) {
          return new Date(data.messages[data.index].createdAt).toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            weekday: 'short',
            month: 'numeric',
            day: 'numeric'
          });
        } else if (data.index > 0) {
          if (new Date(data.messages[data.index - 1].createdAt).toDateString() !== new Date(data.messages[data.index].createdAt).toDateString()) {
            // if it is the start of a new day
            return new Date(data.messages[data.index].createdAt).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'short',
              month: 'numeric',
              day: 'numeric'
            });
          } else if (new Date(data.messages[data.index].createdAt).getTime() - (new Date(data.messages[data.index - 1].createdAt).getTime()) > 3 * 60 * 60 * 1000) {
            // if longer than 3 hours
            return new Date(data.messages[data.index].createdAt).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'short',
              month: 'numeric',
              day: 'numeric'
            });
          }
        }
      }
    } else if (type === 'extracttodayorincompletelesson') {
      let cachedCalendarItems;
      if (data && data.scheduleIds && data.goal) {
        cachedCalendarItems = calendarItems.filter((c) => data.scheduleIds.includes(c.schedule) && c.goals && c.goals.includes(data.goal[0]));
      } else if (data && data.scheduleIds) {
        cachedCalendarItems = calendarItems.filter((c) => data.scheduleIds.includes(c.schedule));
      } else {
        cachedCalendarItems = calendarItems;
      }
      let todayLessonExists;
      let indexOfTodayLesson = 0;
      for (let i = cachedCalendarItems.length - 1; i >= 0; i--) {
        if (new Date(cachedCalendarItems[i].startDate).getFullYear() === new Date().getFullYear() && new Date(cachedCalendarItems[i].startDate).getMonth() === new Date().getMonth() && new Date(cachedCalendarItems[i].startDate).getDate() === new Date().getDate()) {
          todayLessonExists = true;
          indexOfTodayLesson = i;
        }
        if (!todayLessonExists && !cachedCalendarItems[i].completed) {
          indexOfTodayLesson = i;
        }
      }
      if (data && data.output === 'filteredcalendaritems') {
        return cachedCalendarItems;
      } else if (data && data.output === 'todaycalendaritems') {
        if (todayLessonExists) {
          return cachedCalendarItems.filter((c) => new Date(c.startDate).getFullYear() === new Date().getFullYear() && new Date(c.startDate).getMonth() === new Date().getMonth() && new Date(c.startDate).getDate() === new Date().getDate());
        } else {
          return [cachedCalendarItems[indexOfTodayLesson]];
        }
      }
      if (indexOfTodayLesson !== null) {
        if (data && data.output === 'calendaritem') {
          return cachedCalendarItems[indexOfTodayLesson];
        } else if (data && data.output === 'index') {
          return indexOfTodayLesson;
        }
      } else {
        return null;
      }
    } else if (type === 'overallcompleted') { // data = { scheduleIds: [] }
      let total_count = 0;
      let completed_count = 0;
      for (let calendarItem of calendarItems) {
        if (data.scheduleIds.includes(calendarItem.schedule)) {
          total_count++;
          if (calendarItem.completed) {
            completed_count++;
          }
        }
      }
      return (completed_count / total_count) ? Math.floor((completed_count / total_count) * 100) : 0;
    } else if (type === 'overalldue') { // data = { scheduleIds: []}
      let total_count = 0;
      let due_count = 0;
      for (let calendarItem of calendarItems) {
        if (data.scheduleIds.includes(calendarItem.schedule)) {
          total_count++;
          if (new Date(calendarItem.startDate).getTime() < new Date().getTime()) {
            due_count++;
          }
        }
      }
      return due_count / total_count;
    } else if (type === 'goalcompleted') { // data = { scheduleIds: [], goal: [] }
      let total_count = 0;
      let completed_count = 0;
      for (let calendarItem of calendarItems) {
        if (data.scheduleIds.includes(calendarItem.schedule) && (calendarItem.goals && calendarItem.goals.includes(data.goal[0]))) {
          total_count++;
          if (calendarItem.completed) {
            completed_count++;
          }
        }
      }
      return completed_count / total_count;
    } else if (type === 'goaldue') { // data = { scheduleIds: [], goal: [] }
      let total_count = 0;
      let due_count = 0;
      for (let calendarItem of calendarItems) {
        if (data.scheduleIds.includes(calendarItem.schedule) && (calendarItem.goals && calendarItem.goals.includes(data.goal[0]))) {
          total_count++;
          if (new Date(calendarItem.startDate).getTime() < new Date().getTime()) {
              due_count++;
          }
        }
      }
      return due_count / total_count;
    } else if (type === 'favoritegoalcompleted') { // data = { scheduleIds: [], goal: [] }
      let total_count = 0;
      let completed_count = 0;
      for (let displayGoal of data.listOfDisplayGoals) {
        if (displayGoal[1] === 'goal' && displayGoal[4] === data.goal[0]) { // if a regular goal has set to be assigned to this master goal
          for (let calendarItem of calendarItems) {
            if (data.scheduleIds.includes(calendarItem.schedule) && (calendarItem.goals && calendarItem.goals.includes(displayGoal[0]))) {
              total_count++;
              if (calendarItem.completed) {
                completed_count++;
              }
            }
          }
        }
      }
      return completed_count / total_count;
    } else if (type === 'favoritegoaldue') { // data = { scheduleIds: [], goal: [] }
      let total_count = 0;
      let due_count = 0;
      for (let displayGoal of data.listOfDisplayGoals) {
        if (displayGoal[1] === 'goal' && displayGoal[4] === data.goal[0]) { // if a regular goal has set to be assigned to this master goal
          for (let calendarItem of calendarItems) {
            if (data.scheduleIds.includes(calendarItem.schedule) && (calendarItem.goals && calendarItem.goals.includes(displayGoal[0]))) {
              total_count++;
              if (new Date(calendarItem.startDate).getTime() < new Date().getTime()) {
                due_count++;
              }
            }
          }
        }
      }
      return due_count / total_count;
    } else if (type === 'checkgoalwithfavoritetag') { // if the tag is a valid master goal and , return true
      return data.listOfDisplayGoals.find((favoriteGoal) => (favoriteGoal[1] === 'master goal' && favoriteGoal[0] === data.goal[4]));
    } else if (type === 'goalsectionstats') { // data = { section: String, scheduleIds: [], goal: [] }
      let task_count = 0;
      for (let calendarItem of calendarItems) {
        if (((calendarItem.status === data.section && !calendarItem.completed) || (!data.showUpcoming && data.section === 'Current' && calendarItem.status === 'Upcoming' && !calendarItem.completed) || (data.section === 'Current' && calendarItem.status === 'Past' && !calendarItem.completed) || (data.section === 'Completed' && calendarItem.completed)) && data.scheduleIds.includes(calendarItem.schedule) && (!data.goal.length || calendarItem.goals && (calendarItem.goals.includes(data.goal[0])))) {
          task_count++;
        }
      }
      return task_count;
    } else if (type === 'calendaritemuncategorized') {
      return calendarItems.filter((c) => !c.goals.length).length;
    }
  }
}
