import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from '../interfaces/user.interface';

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

export const  UserSchema = new Schema(
    {
        login: {type: String, max: 30},
        nickname: {type: String, max: 30, unique : true, required : true,
          validate: {
            validator: function(v, cb) {
              User.find({nickname: v}, function(err,docs){
                cb(docs.length == 0);
              });
            },
            message: 'User already exists!'
          }},
        email: {type: String, max: 100, unique : true, required : true},
        password: {type: String, max: 100},
        contactLink: {type: String},
        itsPIN: {type: String, max: 5},
        achievements: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Achievement"
            }
        ],
        faction: {type: mongoose.Schema.Types.ObjectId, ref: "Faction"},
        rank: {type: mongoose.Schema.Types.ObjectId, ref: "Rank", required: false}
    }
);
UserSchema.pre('save', function(next) {
    let user = this;
//todo: find user by email and nickname/ if exist - return error

      // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User' , UserSchema);
