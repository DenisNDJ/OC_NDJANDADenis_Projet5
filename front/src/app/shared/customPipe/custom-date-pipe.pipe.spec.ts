import { CustomDatePipePipe } from './custom-date-pipe.pipe';
import { expect } from 'vitest';

describe('CustomDatePipePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipePipe();
    expect(pipe).toBeTruthy();
  });
});
