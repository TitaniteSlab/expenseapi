import { ObjectID } from 'mongodb';

import config from '../config.js';
import { encryptPassword } from './encryption.js';
import User from '../models/user.js';

export default async function() {
    if (config.ADMIN_USER && config.ADMIN_PASSWORD) {
        let encryptedPassword = await encryptPassword(config.ADMIN_PASSWORD);
        try {
            await User.create({
                _id: new ObjectID().toHexString(),
                created: new Date(),
                admin: true,
                email: config.ADMIN_USER,
                password: encryptedPassword
            });
        } catch(e) {
            // Unique index prevents duplicate insertions for the same email
            if (e.code !== 11000) {
                throw e;
            }
        }
    }
}