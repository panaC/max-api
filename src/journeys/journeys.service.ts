import { Component, Header } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import request = require('request');
import { TGVMAX_URL } from '../constants';
import * as moment from 'moment';

@Component()
export class JourneysService {
    private train: Ijourney[] = [];

    constructor() {
        this.train = [];
    }

    private myRequest(url: string, head: any, bod: any): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            request.get(url, {
                headers: head,
                body: bod,
            }, (err, rep, body) => {
                if (err === null && rep && rep.statusCode === 200) {
                    const data = JSON.parse(body);
                    resolve(data);
                }
                reject(JSON.stringify(err) + ' ' + JSON.stringify(rep.statusCode));
            });
        });
    }

    // doesn't work until I turn it into promise
    async findAll(origin: string, destination: string, date: string): Promise<Ijourney[]> {
        let dateBegin: string = moment(date).hour(0).minute(0).second(0).toISOString(true);
        const dateEnd: string = moment(date).hour(23).minute(59).second(59).toISOString(true);
        const token = ''; // set the same fct
        let loop: boolean = true;
        let count: number = 0;
        let data: Ijourney[] = null;
        while (loop && count < 10) {
            data = await this.myRequest(TGVMAX_URL + origin + '/' + destination + '/' + dateBegin + '/' + dateEnd,
                {
                    'Content-Type': 'application/json',
                    'ValidityToken': token,
                }, null);
            if (data.length) {
                data.forEach((element, idx) => {
                    this.train.push(element);
                    if (idx === data.length - 1) {
                        const dateTmp = moment(element.departureDateTime);
                        dateBegin = dateTmp.hour(dateTmp.hour())
                            .minute(dateTmp.minute())
                            .second(dateTmp.second())
                            .add(1, 'second')
                            .toISOString();
                        ++count;
                    }
                });
            } else { loop = false; }
        }
        return this.train;
    }
}
