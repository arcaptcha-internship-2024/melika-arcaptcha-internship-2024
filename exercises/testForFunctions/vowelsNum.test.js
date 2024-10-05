import { describe, test, expect, it } from "vitest";
import { countVowels } from './vowelsNumber.js';
describe('countVowels', () => {
    it('first test', () => {
        expect(countVowels('hello world melika')).toBe(6)
    })
    it('returns 0 for a string with no vowels', () => {
        expect(countVowels('bcdfghjklmnpqrstvwxzy')).toBe(0);
    });
    it('counts vowels in an empty string', () => {
        expect(countVowels('')).toBe(0);
    });
    it('counts vowels in a string with only vowels', () => {
        expect(countVowels('aeiou')).toBe(5);
    });
    it('counts vowels in a longer sentence', () => {
        expect(countVowels('the quick brown fox jumps over the lazy dog')).toBe(11);
    });
    it('counts vowels in a string with special characters', () => {
        expect(countVowels('h3ll0 world!')).toBe(1); // Only 'o' counts
    });
    it('counts vowels in a string with numbers', () => {
        expect(countVowels('12345')).toBe(0); // No vowels
    });
})