import * as fs from 'fs';
import * as path from 'path';
import * as S3 from '@aws-sdk/client-s3';
import { Metadata } from './any';

/**
 * Test values
 */
export class TestingValues {
  // descriptions
  public AWSError = 'AWS Error';
  public CannotBeZero = 'Cannot be zero';
  public InvalidTest = 'returns error from AWS';
  public MustSupply = 'Must supply';
  public ThrowsOnEmpty = 'throws on empty';
  public ValidTest = 'returns valid response from AWS';

  // empty values
  public EmptyArray = [];
  public EmptyString = '';

  // strings
  public Body = 'body';
  public Key = 'key';
  public Name = 'name';
  public SignedUrl =
    'https://bucket.s3.amazonaws.com/file.ext?AWSAccessKeyId=AccessKeyId&Content-Type=ContentType&Expires=123456789&Signature=Signature';
  public UploadId = 'upload-id';
  public UploadPart5Mb: string = fs.readFileSync(
    path.resolve(__dirname, 'multipart-upload-file.txt'),
    'utf8',
  );

  // numbers
  public UploadPart = 7;

  // objects
  public Metadata: Metadata = {
    key1: 'value1',
  };
  public FileTag: S3.Tag = {
    Key: 'Tag1',
    Value: 'Tag1Value',
  };
  // eslint-disable-next-line no-invalid-this
  public FileTags: S3.Tag[] = [this.FileTag];
}
