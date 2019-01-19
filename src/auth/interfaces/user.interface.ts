import { Document } from 'mongoose';

export interface User extends Document {
  readonly email: string;
  readonly password: string;
  readonly hccode: string;
  readonly dateOfBirth: string;
}
