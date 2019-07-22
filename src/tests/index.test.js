import httpStatus from 'http-status';
import supertest from 'supertest';
import { expect } from 'chai';

import app from '../app';

describe('index.test.js', function() {
	describe('GET /', function() {
		it('gets JSON at /', function(done) {
			supertest(app)
				.get('/')
				.send()
				.expect(httpStatus.OK)
				.then((result) => {
					expect(result.text).to.be.a('string');
					expect(JSON.parse(result.text)).to.deep.equal({message: '200 OK'});
					done();
				})
				.catch(done);
		});
	});
});