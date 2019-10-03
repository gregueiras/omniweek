import { Document, Model } from 'mongoose'

interface Spot extends Document {
  company: String,
  techs: String,
  price: Number,
}

let blog: Model<Spot>;

export = blog;