import { Time } from "@angular/common";

export interface Event {
    id?: number;
    title: string;
    date: Date;
    starttime: Time;
    endtime: Time;
    location: string;
    description: string;
    link: string | null;
}
