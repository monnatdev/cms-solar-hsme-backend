import { formatSlug } from './slugify';

describe('formatSlug', () => {
  it('should convert text to lowercase', () => {
    expect(formatSlug('Hello World')).toBe('hello-world');
  });

  it('should replace spaces with hyphens', () => {
    expect(formatSlug('This is a test')).toBe('this-is-a-test');
  });

  it('should handle Thai characters', () => {
    expect(formatSlug('บทความ เกี่ยวกับ โซล่าเซลล์')).toBe('บทความ-เกี่ยวกับ-โซล่าเซลล์');
  });

  it('should remove special characters', () => {
    expect(formatSlug('Hello@World!#$%')).toBe('helloworld');
  });

  it('should handle multiple spaces', () => {
    expect(formatSlug('Hello    World')).toBe('hello-world');
  });

  it('should remove leading and trailing hyphens', () => {
    expect(formatSlug('-Hello World-')).toBe('hello-world');
  });

  it('should handle mixed Thai and English', () => {
    expect(formatSlug('Solar Cell โซล่าเซลล์ 2024')).toBe('solar-cell-โซล่าเซลล์-2024');
  });

  it('should handle empty string', () => {
    expect(formatSlug('')).toBe('');
  });
});
