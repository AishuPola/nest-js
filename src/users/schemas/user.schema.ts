import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
export type UserDocument = User & Document
@Schema()
export class User {
  _id: string
  @Prop({ required: true })
  name: string
  @Prop({ unique: [true, 'duplicate email entered'] })
  email: string

  @Prop({
    required: true,
    enum: ['INTERN', 'ENGINEER', 'ADMIN'],
    type: String,
  })
  role: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
// Add versionKey: false to the schema options
UserSchema.set('versionKey', false)
