import { default as mongoose, Schema } from 'mongoose';

let UserSchema = new Schema({
	_id: String,
	created: Date,
	email: String,
	password: String,
	admin: Boolean,
	api_key: String
},{
	collection: 'users',
	versionKey: false
});

UserSchema.index({
	email: 1
},{
	unique: true
});

export default mongoose.model('user', UserSchema);