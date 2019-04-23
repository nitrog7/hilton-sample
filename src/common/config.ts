import {get, merge} from 'lodash';

export class Config {
  static values = {
    default: {
      api: {
        url: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev'
      },
      date: {
        format: 'M/d/yyyy'
      }
    },
    development: {
    },
    production: {
    }
  };

  static get(path: string | string[]): any {
    const environment: string = 'development';
    const configValues: object = merge(Config.values.default, Config.values[environment]);
    return get(configValues, path);
  }
}
