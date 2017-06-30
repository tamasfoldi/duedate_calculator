const BEFORE_WORK_DATE = new Date(2017, 5, 30, 8);
const AFTER_WORK_DATE = new Date(2017, 5, 30, 18);
const WEEKEND = new Date(2017, 6, 1, 11);

describe('calculateDueDate', () => {
  it('should throw error if it is not work time', () => {
    expect(function () { calculateDueDate(BEFORE_WORK_DATE, 1) }).toThrow(new Error('You should get a life'));
    expect(function () { calculateDueDate(AFTER_WORK_DATE, 1) }).toThrow(new Error('You should get a life'));
    expect(function () { calculateDueDate(WEEKEND, 1) }).toThrow(new Error('You should get a life'));
  });

  it('should add the work hour to the day if there is no overflow', () => {
    expect(calculateDueDate(new Date(2017, 5, 30, 9), 7)).toEqual(new Date(2017, 5, 30, 16));
  });

  it('should add the overflew workhour to the next workday', () => {
    expect(calculateDueDate(new Date(2017, 5, 29, 9), 9)).toEqual(new Date(2017, 5, 30, 10));
    expect(calculateDueDate(new Date(2017, 5, 30, 11), 7)).toEqual(new Date(2017, 6, 3, 10));
  });

  it('should add the overflew workhour to the next workday monday if it was friday', () => {
    expect(calculateDueDate(new Date(2017, 5, 30, 9), 9)).toEqual(new Date(2017, 6, 3, 10));
  });

  it('should handle 2 weekends', () => {
    expect(calculateDueDate(new Date(2017, 5, 30, 9), 49)).toEqual(new Date(2017, 6, 10, 10));
  });

})
