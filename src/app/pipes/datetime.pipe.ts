import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datetime'
})
export class DatetimePipe implements PipeTransform {

  transform(dateTime: any, format?: any): any {
      if (format === 'h:n,m:n,w:s,m:n,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'short',
              month: 'numeric',
              day: 'numeric'
          });
      } else if (format === 'w:s,m:s,d:n,h:n,m:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric'
          });

      } else if (format === 'm:l,d:n,y:n') {
          return new Date(dateTime).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
          });
      } else if (format === 'w:l,m:s,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric'
          });
      } else if (format === 'h:n,m:n,w:s') {
          return new Date(dateTime).toLocaleString( 'en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'short'
          });
      } else if (format === 'w:l,m:l,y:n,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              weekday: 'long',
              month: 'long',
              year: 'numeric',
              day: 'numeric'
          });
      } else if (format === 'w:l,m:s,y:n,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              weekday: 'long',
              month: 'short',
              year: 'numeric',
              day: 'numeric'
          });
      } else if (format === 'm:s,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
          });
      } else if (format === 'm:l,y:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              month: 'long',
              year: 'numeric'
          });
      } else if (format === 'm:s,d:n,y:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
          });
      } else if (format === 'm:n,d:n,y:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              month: 'numeric',
              day: 'numeric',
              year: 'numeric'
          });
      } else if (format === 'm:s,d:n') {
          return new Date(dateTime).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
          });
      } else {
          return new Date(dateTime).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              weekday: 'short',
              month: 'numeric',
              day: 'numeric'
          });
      }
  }

}
