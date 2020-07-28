/**
 * Test values
 */
export class TestingValues {
    // descriptions
    public AWSError: string = 'AWS Error';
    public InvalidTest: string = 'returns error from AWS';
    public MustSupply: string = 'Must supply';
    public ThrowsOnEmpty: string = 'throws on empty';
    public ValidTest: string = 'returns valid response from AWS';

    // empty values
    public EmptyArray = [];
    public EmptyString: string = '';

    // strings
    public Body: string = 'body';
    public Key: string = 'key';
    public Name: string = 'name';
    public SignedUrl = 'https://bucket.s3.amazonaws.com/file.ext?AWSAccessKeyId=AccessKeyId&Content-Type=ContentType&Expires=123456789&Signature=Signature';

    // objects
    public Metadata: AWS.S3.Metadata = {
        key1: 'value1',
    };
    public FileTag: AWS.S3.Tag = {
        Key: 'Tag1',
        Value: 'Tag1Value',
    };
    public FileTags: AWS.S3.Tag[] = [
        this.FileTag,
    ];
    public TagSet: AWS.S3.TagSet = [
        this.FileTag,
    ]
}
