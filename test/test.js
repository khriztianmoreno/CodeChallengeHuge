var expect = require('chai').expect;
var should = require('chai').should();
var sinon = require('sinon');
var request = require('request');
var httpAsync = require('./../public/scripts/httpAsync');

describe("Main Menu Module", function () {

    describe('Should list ALL data GET', function () {

        var url = "http://localhost:3000/api/nav.json";
        var xhr, requestss;

        it("returns status 200", function (done) {
            request(url, function (error, response, body) {
                //console.log('REsponse', body);
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });


    describe('get-json-data test the request', function () {
        beforeEach(function () {
            this.xhr = sinon.useFakeXMLHttpRequest();
            var requests = this.requests = [];

            this.xhr.onCreate = function (xhr) {
                requests.push(xhr);
            };
        });
        afterEach(function () {
            this.xhr.restore();
        });

        it('get json data', function () {
            var callback = sinon.spy();
            httpAsync.get('/api/nav.json', callback);
            expect(this.requests.length).to.equal(1);
            this.requests[0].respond(200,
                {"Content-Type": "application/json"},
                '{"id": 1, "name": "foo"}');
            sinon.assert.calledWith(callback, {"label": "Work"});
        });
    });

});
