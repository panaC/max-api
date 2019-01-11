import { Component, Header, Injectable } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import request = require('request');
import { TGVMAX_URL, TOKEN_URL } from '../constants';
import * as moment from 'moment';

@Injectable()
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

    // no needed now because moment has a UTC fct that doesn't handle Date
    // use this fct for passthrought the local timezone on a string Date
    private dateConvert(date: string): string {
        const d = new Date(date);
        return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDay(), d.getHours(), d.getMinutes(), d.getSeconds())).toISOString();
    }

    private getToken(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request(TOKEN_URL, (err, rep, body) => {
                if (err === null && rep && rep.statusCode === 200) {
                    if (/input.*id="hiddenToken".*value=\"(.*)\"/g.exec(body)) {
                        resolve(/input.*id="hiddenToken".*value=\"(.*)\"/g.exec(body)[1]);
                    }
                }
                if (err) { reject('getToken error ' + JSON.stringify(err)); } else {
                    reject('getToken error ' + rep.statusCode);
                }
            });
        });
    }

    async findAll(origin: string, destination: string, date: string): Promise<Ijourney[]> {
        let dateBegin: string = moment.utc(date).hour(0).minute(0).second(0).toISOString();
        const dateEnd: string = moment.utc(date).hour(23).minute(59).second(59).toISOString();
        const token = await this.getToken();
        let loop: boolean = true;
        let count: number = 0;
        let data: Ijourney[] = null;
        this.train = []; // Reset the history of day search , but in the future cache this in db
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
                        const dateTmp = moment.utc(element.departureDateTime);
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
