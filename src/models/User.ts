'use strict';

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    salutaion: string;
    isActive: boolean;
    createdAt: Date;
}

export class User implements IUser {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public salutaion: string,
        public isActive: boolean,
        public createdAt: Date    
    ) {}
}