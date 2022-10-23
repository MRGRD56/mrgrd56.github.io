import { isFunction, isNil, isObject, mapKeys } from 'lodash';
import moment from 'moment';

export const localizeParams = (params: object) => {
    const timestamp = moment().format('HHmmss') + '_';

    return mapKeys(params, (value, key) => {
        return timestamp + key;
    });
};

class YandexMetrika {
    private readonly ym: (
        id: number,
        event: string,
        target: unknown,
        params?: unknown,
        callback?: unknown,
        ctx?: unknown
    ) => void;

    constructor(private readonly id: number) {
        const windowYm = (window as any).ym;
        this.ym =
            typeof windowYm === 'undefined'
                ? (id, event, target, params, callback, ctx) => {
                      console.warn('Yandex Metrika is not defined', { id, event, target, params, ctx });
                      if (isFunction(callback)) {
                          callback?.();
                      } else if (isFunction(params)) {
                          params?.();
                      }
                  }
                : windowYm;
    }

    handle(event: string, target?: string, params?: unknown, ctx?: unknown, isLocalParams?: boolean): Promise<unknown> {
        if (isLocalParams && isObject(params)) {
            params = localizeParams(params);
        }

        return new Promise((resolve) => {
            if (isNil(target)) {
                this.ym(this.id, event, params, resolve, ctx);
            } else {
                this.ym(this.id, event, target, params, resolve, ctx);
            }
        });
    }

    reachGoal(target: string, params?: Record<string, unknown>, isLocalParams?: boolean): Promise<unknown> {
        return this.handle('reachGoal', target, params, undefined, isLocalParams);
    }

    userParams(params: Record<string, unknown>, isLocalParams?: boolean): Promise<unknown> {
        return this.handle('userParams', undefined, params, undefined, isLocalParams);
    }
}

const yam = new YandexMetrika(90882727);

export default yam;
