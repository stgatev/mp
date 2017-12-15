// https://stackoverflow.com/questions/37926481/mongoose-typescript-exporting-model-interface#37927028
// https://stackoverflow.com/questions/21341603/mongoose-schema-model-using-typescript
// https://gist.github.com/masahirompp/6cfdfd1e007187e61310

'use strict';

import * as Mongoose from 'mongoose';

export class Identity {
    public constructor(
        public provider: string,
        public id: string
    ) {}
}

export interface IUser {
    readonly id: string, // assigned by MongoDB
    identity: Identity,
    name: string
}

export type IUserDocument = IUser & Mongoose.Document;
// interface IUserDocument extends IUser, Mongoose.Document {}

const userSchema = new Mongoose.Schema({
    identity: {
        provider: String,
        id: String
    },
    name: String
});

userSchema.static('findByIdentity', (identity: Identity, callback?: (err: any, result: IUserDocument) => void) => {
    return UserModel.findOne({ identity: identity }, callback);
});

export interface IUserModel extends Mongoose.Model<IUserDocument> {
    findByIdentity(identity: Identity, callback?: (err: any, result: IUserDocument) => void): Mongoose.DocumentQuery<IUserDocument, IUserDocument>;
}

export const UserModel = <IUserModel>Mongoose.model<IUserDocument>('user', userSchema);
