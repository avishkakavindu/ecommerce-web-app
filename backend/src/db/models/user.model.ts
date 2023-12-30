import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '@db/interfaces/user.interface';
import { SALT_WORK_FACTOR } from 'configs/envValidator';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // this means user
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  return next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password).catch(_e => false);
};

const UserModel = model<IUser & Document>('User', userSchema);

export default UserModel;
