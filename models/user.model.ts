import Adapters from 'next-auth/adapters';
import { EntitySchemaColumnOptions } from 'typeorm';

// Extend the built-in models using class inheritance
export default class User extends (<any>Adapters.TypeORM.Models.User.model) {
  constructor(name, email, image, emailVerified) {
    super(name, email, image, emailVerified);
  }
}

type UserSchema = {
  name: string
  target: typeof User
  columns: {
    roles?: {
      type: 'varchar'
      nullable: boolean
    }
    name?: EntitySchemaColumnOptions
    email?: EntitySchemaColumnOptions
    image?: EntitySchemaColumnOptions
    emailVerified?: EntitySchemaColumnOptions
  }
}

export const UserSchema = {
  name: "User",
  target: User,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns,
    roles: {
      type: "varchar",
      nullable: false
    },
  },
}