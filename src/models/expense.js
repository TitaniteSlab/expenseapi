import { default as mongoose, Schema } from 'mongoose';

let ExpenseSchema = new Schema({
	_id: String,
	user_id: String,
	created: Date,
	modified: Date,
    description: String,
    currency: String,
	amount: Number,
	deleted: Boolean
},{
	collection: 'expenses',
	versionKey: false
});

export default mongoose.model('expense', ExpenseSchema);