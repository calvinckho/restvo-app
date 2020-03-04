import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'background',
  pure: false
})
export class BackgroundPipe implements PipeTransform {

  transform(background: any, data?: any, type?: any): string {
      if (!type) {
          if (background && background.length) {
              return background;
          } else {
              let sum_of_id = 0;
              data = data || "default";
              for(let i = 0; i < data.length; i++){
                  sum_of_id += data.charAt(i).charCodeAt(0); //sum up all the characters in the _id string
              }
              const last_digit = sum_of_id.toString().charAt(sum_of_id.toString().length-1); //grab the last digit of the sum total
              return 'assets/img/onboarding-' + Math.floor(parseInt(last_digit, 10) / 2).toString() + '.jpg'; //file index number has to be between 0 - 4
          }
      } else if (type === 'color') { // data = { section: String, scheduleIds: [], goal: [] }
          let color;
          const color_arrays = [
              { name: 'Purple', color: 'purple' },
              { name: 'Green', color: '#28e070' },
              { name: 'Orange', color: '#f6c653' },
              { name: 'Red', color: '#f25454' },
              { name: 'Pink', color: 'pink' },
              { name: 'Light Red', color: 'lightred' },
              { name: 'Yellow', color: 'darkyellow' },
              { name: 'Light Blue', color: 'lightblue' },
              { name: 'Dark Grey', color: 'darkgrey' },
              { name: 'Dark Green', color: 'darkgreen' },
          ]; // 10 default colors
          color = color_arrays[1].color;

          if (data.goal && data.goal[4] && data.goal[4].length) { // if it has set a master goal attribute
              const masterGoal = data.listOfDisplayGoals.find((c) => c[1] === 'master goal' && c[0] === data.goal[4]);
              if (masterGoal) {
                  color = masterGoal[3];
              }
          } else if (data.goal[3] && data.goal[3].length) {
              color = data.goal[3];
          } else if (background && background.length) {
              color = background;
          } else if (data.goal[0] && data.goal[0].length) {
              let sum_of_id = 0;
              let id = data.goal[0];
              for (let i = 0; i < id.length; i++){
                  sum_of_id += parseInt(id.charAt(i), 10); //.charAt(i).charCodeAt(0) sum up all the characters in the _id string
              }
              const last_digit = id.toString().charAt(id.toString().length - 1); //grab the last digit of the sum total
              color = color_arrays[last_digit].color; //file index number has to be between 0 - 4
          }
          return color;
      }
  }
}
