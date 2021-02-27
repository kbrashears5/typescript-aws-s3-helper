import * as fs from 'fs';
import * as path from 'path';
import * as S3 from '@aws-sdk/client-s3';
import { Metadata } from './any';

/**
 * Test values
 */
export class TestingValues {
  // descriptions
  public AWSError: string = 'AWS Error';
  public CannotBeZero: string = 'Cannot be zero';
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
  public SignedUrl =
    'https://bucket.s3.amazonaws.com/file.ext?AWSAccessKeyId=AccessKeyId&Content-Type=ContentType&Expires=123456789&Signature=Signature';
  public UploadId: string = 'upload-id';
  public UploadPart5Mb: string = fs.readFileSync(
    path.resolve(__dirname, 'multipart-upload-file.txt'),
    'utf8',
  );

  // numbers
  public UploadPart: number = 7;

  // objects
  public Metadata: Metadata = {
    key1: 'value1',
  };
  public FileTag: S3.Tag = {
    Key: 'Tag1',
    Value: 'Tag1Value',
  };
  public FileTags: S3.Tag[] = [this.FileTag];
}
