const bot = require('./bot');
const assert = require('assert');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const cool = require('./src/commands/cool');
const help = require('./src/commands/help');
const infidels = require('./src/commands/deus-vult');

function messagePrintable(message) {
    return JSON.stringify(message, null, 4);
}

let sandbox;

describe('bot test suite', () => {
    before(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('/molander bot', () => {
        let expectedId;

        beforeEach(() => {
            expectedId = 'BOT_ID';
            process.env.BOT_ID = expectedId;
        });

        context('base command', () => {
            beforeEach(() => {
                expectedMessage = 'some face';
                sandbox.stub(cool, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the base command', () => {
                bot.respondTo("/molander", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('help command', () => {
            beforeEach(() => {
                expectedMessage = 'help message';
                sandbox.stub(help, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the help command', () => {
                bot.respondTo("/molander help", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('infidels command', () => {
            beforeEach(() => {
                expectedMessage = 'infidel message';
                sandbox.stub(infidels, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the infidels command', () => {
                bot.respondTo("/molander infidels!", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('an unrecognized command', () => {
            beforeEach(() => {
                sandbox.stub(console, 'log');
            });

            it('should not respond to the command', () => {
                bot.respondTo("/molander qwerty", function (id, message) {
                    assert.fail();
                });
                expect(console.log).to.be.calledWith(`Unrecognized command issued: qwerty`);
            });
        });
    });

    context('/test bot', () => {
        beforeEach(() => {
            expectedId = 'TEST_BOT_ID';
            process.env.TEST_BOT_ID = expectedId;
        });

        context('base command', () => {
            beforeEach(() => {
                expectedMessage = 'some face';
                sandbox.stub(cool, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the base command', () => {
                bot.respondTo("/test", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('help command', () => {
            beforeEach(() => {
                expectedMessage = 'help message';
                sandbox.stub(help, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the help command', () => {
                bot.respondTo("/test help", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('infidels command', () => {
            beforeEach(() => {
                expectedMessage = 'infidel message';
                sandbox.stub(infidels, 'processCommand').returns(expectedMessage);
            });

            it('should respond to the infidels command', () => {
                bot.respondTo("/test infidels!", function (id, message) {
                    assert.equal(id, expectedId);
                    assert.equal(message, expectedMessage);
                });
            });
        });

        context('an unrecognized command', () => {
            beforeEach(() => {
                sandbox.stub(console, 'log');
            });

            it('should not respond to the command', () => {
                bot.respondTo("/test qwerty", function (id, message) {
                    assert.fail();
                });
                expect(console.log).to.be.calledWith(`Unrecognized command issued: qwerty`);
            });
        });
    });
});