import { render, screen } from '@testing-library/react';

jest.mock('../fetch.js');
const lib2 = require('../fetch.js');

describe('test fetch', () => {
  test('check show all leaders', async () => {
    /*lib2.showTopScores1.mockResolvedValue([{name:'Tom', maxpoints:10}]);
    const container = document.createElement('div');
    container.setAttribute('id', 'leadScore');
    document.body.appendChild(container);*/

    const record = await lib2.register('1999999', '999999');
    //expect(record).toBeNull();
    const login = await lib2.login('1999999', '999999');

    const addComment = await lib2.addComment(1,2);
  });
});