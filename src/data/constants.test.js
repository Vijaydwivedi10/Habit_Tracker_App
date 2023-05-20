import { DATE_FORMAT, COMPLETED, FAILED, EMPTY, CHECKMARK_VALUES } from './constants';

describe('constants', () => {
  describe('DATE_FORMAT', () => {
    it('should match the expected format', () => {
      expect(DATE_FORMAT).toBe('YYYY-MM-DD');
    });
  });

  describe('COMPLETED', () => {
    it('should match the expected value', () => {
      expect(COMPLETED).toBe('completed');
    });
  });

  describe('FAILED', () => {
    it('should match the expected value', () => {
      expect(FAILED).toBe('failed');
    });
  });

  describe('EMPTY', () => {
    it('should match the expected value', () => {
      expect(EMPTY).toBe('empty');
    });
  });

  describe('CHECKMARK_VALUES', () => {
    it('should include the expected values', () => {
      expect(CHECKMARK_VALUES).toContain(EMPTY);
      expect(CHECKMARK_VALUES).toContain(COMPLETED);
      expect(CHECKMARK_VALUES).toContain(FAILED);
    });
  });
});
