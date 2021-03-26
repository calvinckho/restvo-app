import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendar',
  pure: false
})
export class CalendarPipe implements PipeTransform {

  transform(calendarItems: any, type?: any, data?: any): any {
    if (type === 'calendarItemIfTodayLessonExists') {
      let filteredCalendarItems;
      if (data) {
        filteredCalendarItems = calendarItems.filter((c) => data.scheduleIds.includes(c.schedule) && c.goals && c.goals.includes(data.goal[0]));
      } else {
        filteredCalendarItems = calendarItems;
      }
      let todayLessonExists;
      let indexOfTodayLesson;
      for (let i = filteredCalendarItems.length - 1; i >= 0; i--) {
        if (new Date(filteredCalendarItems[i].startDate).getDate() === new Date().getDate()) {
          todayLessonExists = true;
          indexOfTodayLesson = i;
        }
        if (!todayLessonExists && !filteredCalendarItems[i].completed) {
          indexOfTodayLesson = i;
        }
      }
      if (indexOfTodayLesson !== null) {
        if (!data) {
          return filteredCalendarItems[indexOfTodayLesson];
        } else if (data && data.output === 'index') {
          return indexOfTodayLesson;
        } else if (data && data.output === 'filteredCalendarItems') {
          return filteredCalendarItems;
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
    } else if (type === 'checkfavoritegoaltag') { // if the tag is a valid master goal, return true
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
