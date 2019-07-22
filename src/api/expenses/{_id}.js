import passport from 'passport';

import wrapAsync from '../../util/wrapAsync.js';
import Expense from '../../models/expense.js';

export default {
	get: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		let query = {
			_id: req.params._id,
			deleted: {$ne: true}
		};
		if (req.user.admin !== true) {
			query.user_id = req.user._id;
		}
		let expense = await Expense.findOne(query).lean();
		if (!expense) {
			res.status(404).end();
			return;
		}
		expense.amount = expense.amount / 100;
		res.json(expense);
	})],
	post: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		let amountInteger = Math.round(req.body.amount * 100);
		let query = {
			_id: req.params._id,
			deleted: {$ne: true}
		};
		if (req.user.admin !== true) {
			query.user_id = req.user._id;
		}
		await Expense.updateOne(query, {
			$set: {
				modified: new Date(),
				description: req.body.description,
				currency: req.body.currency,
				amount: amountInteger
			}
		});
		res.status(200).end();
	})],
	delete: [passport.authenticate('headerapikey'), wrapAsync(async (req, res) => {
		let query = {
			_id: req.params._id,
			deleted: {$ne: true}
		};
		if (req.user.admin !== true) {
			query.user_id = req.user._id;
		}
		await Expense.updateOne(query, {
			$set: {deleted: true}
		});
		res.status(200).end();
	})]
};