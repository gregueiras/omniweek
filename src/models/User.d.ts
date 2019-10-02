import { Document, Model } from 'mongoose'

interface User extends Document {
    email: string;
}

let blog: Model<User>;

export = blog;