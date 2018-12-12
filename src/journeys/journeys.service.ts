import { Component } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import request = require('request');
import { TGVMAX_URL } from '../constants';
import moment from 'moment';

@Component()
export class JourneysService {
    private train: Ijourney[] = [];

    // doesn't work until I turn on promise
    async findAll(origin: string, destination: string, date: string): Promise<Ijourney[]> {
        return new Promise<Ijourney[]>((resolve, reject) => {
            let dateBegin: string = moment(date).hour(0).minute(0).second(0).toISOString(true);
            const dateEnd: string = moment(date).hour(23).minute(59).second(59).toISOString(true);
            const token = ''; // set the same fct
            let loop: boolean = true;
            while (loop) {
                request.get(TGVMAX_URL + origin + '/' + destination + '/' + dateBegin + '/' + dateEnd, {
                    headers: {
                        'Content-Type': 'application/json',
                        'ValidityToken': token,
                    },
                }, (err, rep, body) => {
                    if (err === null && rep && rep.statusCode === 200) {
                        const data: Ijourney[] = JSON.parse(body);
                        if (data.length) {
                            data.forEach((element, idx) => {
                                this.train.push(element);
                                if (idx === data.length - 1) {
                                    const dateTmp = moment(element.dpartureDateTime);
                                    dateBegin = dateTmp.hour(dateTmp.hour())
                                        .minute(dateTmp.minute())
                                        .second(dateTmp.second())
                                        .add(1, 'second')
                                        .toISOString();
                                }
                            });
                        }
                        loop = false;
                    }
                });
            }
        });
    }
}
