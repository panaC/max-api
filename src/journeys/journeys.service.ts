import { Component } from '@nestjs/common';
import { Ijourney } from './interfaces/journey.interface';
import request = require('request');
import { TGVMAX_URL } from '../constants';

@Component()
export class JourneysService {
    private train: Ijourney[] = [];

    async findAll(origin: string, destination: string): Promise<Ijourney[]> {
        return new Promise<Ijourney[]>((resolve, reject) => {
            const token = ''; // set the same fct
            request.get(TGVMAX_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'ValidityToken': token,
                },
            }, (err, rep, body) => {
                if (err === null && rep && rep.statusCode === 200) {
                    const data: Ijourney[] = JSON.parse(body);
                    data.forEach((element, idx) => {
                        this.train.push(element);
                        if (idx === data.length - 1) {
                            element.departureDateTime
                            // find here how handle only the date format and not the timecode
                        }
                    });
                }
            });
        });
    }
}
