import httpStatus from 'http-status';
import supertest from 'supertest';
import { expect } from 'chai';

import app from '../app';

describe('expenses.test.js', function() {
	this.timeout(5000);
	describe('GET /v1/expenses', function() {
		it('gets expense list', function(done) {
			supertest(app)
				.get('/v1/expenses')
				.send()
				.expect(httpStatus.FORBIDDEN)
				.then((res) => {
					done();
				})
				.catch((err) => {
					console.error(err);
					done(err);	
				});
		});
	});
});
