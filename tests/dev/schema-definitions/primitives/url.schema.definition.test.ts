import { JsonSchemaValidator, UrlSchemaDefinition } from '../../../../src';

it('Schema for a URI should have a proper name', () => {
  expect(UrlSchemaDefinition.SchemaName('test')).toBe('/core.url.schema');
});

describe('The URI validator', () => {
  describe('should return false for', () => {
    it('an empty Website Address', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('bob://abc', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('bob://abc', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://.', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://.', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://..', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://..', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://../', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://../', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://?', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://?', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://??', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://??', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://??/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://??/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://#', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://#', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://##', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://##', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://##/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://##/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://foo.bar?q=Spaces should be encoded', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.bar?q=Spaces should be encoded', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('//', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('//', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('//a', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('//a', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('///a', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('///a', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('///', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('///', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http:///a', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http:///a', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('foo.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('foo.com', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('rdar://1234', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('rdar://1234', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('h://test', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('h://test', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http:// shouldfail.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http:// shouldfail.com', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it(':// should fail', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate(':// should fail', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://foo.bar/foo(bar)baz quux', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.bar/foo(bar)baz quux', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('ftps://foo.bar/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('ftps://foo.bar/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://-error-.invalid/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://-error-.invalid/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://a.b--c.de/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://a.b--c.de/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://-a.b.co', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://-a.b.co', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://a.b-.co', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://a.b-.co', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://10.1.1.0', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://10.1.1.0', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://10.1.1.255', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://10.1.1.255', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://224.1.1.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://224.1.1.1', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://1.1.1.1.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://1.1.1.1.1', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://123.123.123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://123.123.123', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://3628126748', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://3628126748', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://.www.foo.bar/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://.www.foo.bar/', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://www.foo.bar./', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://www.foo.bar./', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://.www.foo.bar./', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://.www.foo.bar./', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://10.1.1.1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://10.1.1.1', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('http://10.1.1.254', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://10.1.1.254', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });

    it('xxx', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('xxx', UrlSchemaDefinition)).toBe(false);
      expect(payloadValidator.validationErrors).toBeDefined();
    });
  });

  describe('should return true for', () => {
    it('http://foo.com/blah_blah', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_blah', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/blah_blah/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_blah/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/blah_blah_(wikipedia)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_blah_(wikipedia)', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/blah_blah_(wikipedia)_(again)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_blah_(wikipedia)_(again)', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://www.example.com/wpstyle/?p=364', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://www.example.com/wpstyle/?p=364', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://www.example.com/foo/?bar=baz&inga=42&quux', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://www.example.com/foo/?bar=baz&inga=42&quux', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://✪df.ws/123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://✪df.ws/123', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid:password@example.com:8080', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid:password@example.com:8080', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid:password@example.com:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid:password@example.com:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid@example.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid@example.com', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid@example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid@example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid@example.com:8080', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid@example.com:8080', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid@example.com:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid@example.com:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid:password@example.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid:password@example.com', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://userid:password@example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://userid:password@example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://142.42.1.1/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://142.42.1.1/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://142.42.1.1:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://142.42.1.1:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://➡.ws/䨹', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://➡.ws/䨹', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://⌘.ws', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://⌘.ws', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://⌘.ws/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://⌘.ws/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/blah_(wikipedia)#cite-1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_(wikipedia)#cite-1', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/blah_(wikipedia)_blah#cite-1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/blah_(wikipedia)_blah#cite-1', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/unicode_(✪)_in_parens', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/unicode_(✪)_in_parens', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.com/(something)?after=parens', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.com/(something)?after=parens', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://☺.damowmow.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://☺.damowmow.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://code.google.com/events/#&product=browser', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://code.google.com/events/#&product=browser', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://j.mp', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://j.mp', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('ftp://foo.bar/baz', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('ftp://foo.bar/baz', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo.bar/?q=Test%20URL-encoded%20stuff', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo.bar/?q=Test%20URL-encoded%20stuff', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://مثال.إختبار', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://مثال.إختبار', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://例子.测试', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://例子.测试', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://उदाहरण.परीक्षा', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://उदाहरण.परीक्षा', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it("http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate("http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com", UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://1337.net', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://1337.net', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://a.b-c.de', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://a.b-c.de', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://223.255.255.254', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://223.255.255.254', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo_bar.example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo_bar.example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('http://foo_bar.example.com/test_file', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('http://foo_bar.example.com/test_file', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_blah', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_blah', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_blah/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_blah/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_blah_(wikipedia)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_blah_(wikipedia)', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_blah_(wikipedia)_(again)', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_blah_(wikipedia)_(again)', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://www.example.com/wpstyle/?p=364', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://www.example.com/wpstyle/?p=364', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://www.example.com/foo/?bar=baz&inga=42&quux', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://www.example.com/foo/?bar=baz&inga=42&quux', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://✪df.ws/123', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://✪df.ws/123', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid:password@example.com:8080', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid:password@example.com:8080', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid:password@example.com:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid:password@example.com:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid@example.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid@example.com', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid@example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid@example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid@example.com:8080', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid@example.com:8080', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid@example.com:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid@example.com:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid:password@example.com', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid:password@example.com', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://userid:password@example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://userid:password@example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://142.42.1.1/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://142.42.1.1/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://142.42.1.1:8080/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://142.42.1.1:8080/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://➡.ws/䨹', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://➡.ws/䨹', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://⌘.ws', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://⌘.ws', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://⌘.ws/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://⌘.ws/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_(wikipedia)#cite-1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_(wikipedia)#cite-1', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/blah_(wikipedia)_blah#cite-1', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/blah_(wikipedia)_blah#cite-1', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/unicode_(✪)_in_parens', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/unicode_(✪)_in_parens', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.com/(something)?after=parens', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.com/(something)?after=parens', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://☺.damowmow.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://☺.damowmow.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://code.google.com/events/#&product=browser', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://code.google.com/events/#&product=browser', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://j.mp', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://j.mp', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('ftp://foo.bar/baz', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('ftp://foo.bar/baz', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo.bar/?q=Test%20URL-encoded%20stuff', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo.bar/?q=Test%20URL-encoded%20stuff', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://مثال.إختبار', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://مثال.إختبار', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://例子.测试', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://例子.测试', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://उदाहरण.परीक्षा', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://उदाहरण.परीक्षा', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it("https://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com", () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate("https://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com", UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://1337.net', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://1337.net', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://a.b-c.de', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://a.b-c.de', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://223.255.255.254', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://223.255.255.254', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo_bar.example.com/', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo_bar.example.com/', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });

    it('https://foo_bar.example.com/test_file', () => {
      const payloadValidator = new JsonSchemaValidator();
      expect(payloadValidator.Validate('https://foo_bar.example.com/test_file', UrlSchemaDefinition)).toBe(true);
      expect(payloadValidator.validationErrors).toBeUndefined();
    });
  });
});
