import { S3Helper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import * as S3 from '@aws-sdk/client-s3';
import { Readable } from 'stream';

const readable: Readable = new Readable();
const completeMultipartUploadOutputResponse: S3.CompleteMultipartUploadOutput =
  {};
const copyObjectOutputResponse: S3.CopyObjectOutput = {};
const createBucketOutputResponse: S3.CreateBucketOutput = {};
const createMultipartUploadOutputResponse: S3.CreateMultipartUploadOutput = {};
const deleteBucketOutputResponse: object = {};
const deleteObjectOutputResponse: S3.DeleteObjectOutput = {};
const deleteObjectsOutputResponse: S3.DeleteObjectsOutput = {};
const deleteObjectTaggingOutputResponse: S3.DeleteObjectTaggingOutput = {};
const getObjectOutputResponse: S3.GetObjectOutput = { Body: readable };
const getObjectTaggingOutputResponse: S3.GetObjectTaggingOutput = {
  TagSet: [{ Key: 'Tag1', Value: 'Tag1Value' } as S3.Tag],
};
const headBucketOutputResponse: object = {};
const headObjectOutputResponse: S3.HeadObjectOutput = {
  Metadata: { key1: 'value1' },
};
const putObjectOutputResponse: S3.DeleteObjectTaggingOutput = {};
const putObjectTaggingOutputResponse: S3.PutObjectTaggingOutput = {};
const uploadPartOutputResponse: S3.UploadPartOutput = {};

const completeMultipartUpload = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.CompleteMultipartUploadOutput>(
    completeMultipartUploadOutputResponse,
  );
});
const copyObject = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.CopyObjectOutput>(copyObjectOutputResponse);
});
const createBucket = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.CreateBucketOutput>(createBucketOutputResponse);
});
const createMultipartUpload = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.CreateMultipartUploadOutput>(
    createMultipartUploadOutputResponse,
  );
});
const deleteBucket = jest.fn().mockImplementation(() => {
  return Promise.resolve<{}>(deleteBucketOutputResponse);
});
const deleteObject = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.DeleteObjectOutput>(deleteObjectOutputResponse);
});
const deleteObjects = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.DeleteObjectsOutput>(deleteObjectsOutputResponse);
});
const deleteObjectTagging = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.DeleteObjectTaggingOutput>(
    deleteObjectTaggingOutputResponse,
  );
});
const getObject = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.GetObjectOutput>(getObjectOutputResponse);
});
const getObjectTagging = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.GetObjectTaggingOutput>(
    getObjectTaggingOutputResponse,
  );
});
const headBucket = jest.fn().mockImplementation(() => {
  return Promise.resolve<{}>(headBucketOutputResponse);
});
const headObject = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.HeadObjectOutput>(headObjectOutputResponse);
});
const putObject = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.PutObjectOutput>(putObjectOutputResponse);
});
const putObjectTagging = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.PutObjectTaggingOutput>(
    putObjectTaggingOutputResponse,
  );
});
const uploadPart = jest.fn().mockImplementation(() => {
  return Promise.resolve<S3.UploadPartOutput>(uploadPartOutputResponse);
});

// mock the functions
jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3: jest.fn().mockImplementation(() => {
      return {
        completeMultipartUpload,
        copyObject,
        createBucket,
        createMultipartUpload,
        deleteBucket,
        deleteObject,
        deleteObjects,
        deleteObjectTagging,
        getObject,
        getObjectTagging,
        headBucket,
        headObject,
        putObject,
        putObjectTagging,
        uploadPart,
      };
    }),
  };
});

const logger = new Logger(LogLevel.Off);
const s3HelperMock = new S3Helper(logger);
const TestValues = new TestingValues();

/**
 * Test the CopyObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.CopyObjectAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.CopyObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} sourceBucket`, () => {
    const actual = s3HelperMock.CopyObjectAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} sourceBucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} sourceKey`, () => {
    const actual = s3HelperMock.CopyObjectAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} sourceKey`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} destinationBucket`, () => {
    const actual = s3HelperMock.CopyObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} destinationBucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} destinationKey`, () => {
    const actual = s3HelperMock.CopyObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} destinationKey`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.CopyObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(copyObjectOutputResponse);
  });
});

/**
 * Test the CreateBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.CreateBucketAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.CreateBucketAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.CreateBucketAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} name`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.CreateBucketAsync(TestValues.Name);
    return expect(actual).resolves.toEqual(createBucketOutputResponse);
  });
});

/**
 * Test the DeleteBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteBucketAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.DeleteBucketAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.DeleteBucketAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} name`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.DeleteBucketAsync(TestValues.Name);
    return expect(actual).resolves.toEqual(createBucketOutputResponse);
  });
});

/**
 * Test the DeleteObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectTagsAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.DeleteObjectTagsAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.DeleteObjectTagsAsync(
      TestValues.EmptyString,
      TestValues.Name,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.DeleteObjectTagsAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.DeleteObjectTagsAsync(
      TestValues.Name,
      TestValues.Name,
    );
    return expect(actual).resolves.toEqual({});
  });
});

/**
 * Test the DeleteObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.DeleteObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.DeleteObjectAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.DeleteObjectAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.DeleteObjectAsync(
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(createBucketOutputResponse);
  });
});

/**
 * Test the DeleteObjectsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectsAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.DeleteObjectsAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.DeleteObjectsAsync(TestValues.EmptyString, [
      TestValues.Key,
    ]);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key array`, () => {
    const actual = s3HelperMock.DeleteObjectsAsync(
      TestValues.Name,
      TestValues.EmptyArray,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} at least one key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.DeleteObjectsAsync(TestValues.Name, [
      TestValues.Key,
    ]);
    return expect(actual).resolves.toEqual(createBucketOutputResponse);
  });
});

/**
 * Test the GetBucketMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetBucketMetadataAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetBucketMetadataAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetBucketMetadataAsync(TestValues.EmptyString);
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.GetBucketMetadataAsync(TestValues.Name);
    return expect(actual).resolves.toEqual(createBucketOutputResponse);
  });
});

/**
 * Test the GetObjectAsJsonAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectAsJsonAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetObjectAsJsonAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.GetObjectAsJsonAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
});

/**
 * Test the GetObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetObjectAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.GetObjectAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.GetObjectAsync(TestValues.Name, TestValues.Key);
    return expect(actual).resolves.toEqual(getObjectOutputResponse);
  });
});

/**
 * Test the GetObjectContentsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectContentsAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetObjectContentsAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.GetObjectContentsAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.GetObjectContentsAsync(
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(getObjectOutputResponse.Body);
  });
});

/**
 * Test the GetObjectMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectMetadataAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetObjectMetadataAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetObjectMetadataAsync(
      TestValues.EmptyString,
      TestValues.Name,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.GetObjectMetadataAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.GetObjectMetadataAsync(
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(TestValues.Metadata);
  });
});

/**
 * Test the GetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectTagsAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.GetObjectTagsAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.GetObjectTagsAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.GetObjectTagsAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.GetObjectTagsAsync(
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(TestValues.FileTags);
  });
});

// /**
//  * Test the GetSignedUrlDownload method
//  */
// describe(`${S3Helper.name}.${s3HelperMock.GetSignedUrlDownload.name}`, () => {
//     // set action for this method
//     const action = `${S3Helper.name}.${s3HelperMock.GetSignedUrlDownload.name}`;

//     test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
//         const actual = s3HelperMock.GetSignedUrlDownload(TestValues.EmptyString, TestValues.Key);
//         return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
//     });
//     test(`${TestValues.ThrowsOnEmpty} key`, () => {
//         const actual = s3HelperMock.GetSignedUrlDownload(TestValues.Name, TestValues.EmptyString);
//         return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
//     });
//     test(TestValues.ValidTest, () => {
//         const actual = s3HelperMock.GetSignedUrlDownload(TestValues.Name, TestValues.Key);
//         return expect(actual).resolves.toEqual(TestValues.SignedUrl);
//     });
// });

// /**
//  * Test the GetSignedUrlUpload method
//  */
// describe(`${S3Helper.name}.${s3HelperMock.GetSignedUrlUpload.name}`, () => {
//     // set action for this method
//     const action = `${S3Helper.name}.${s3HelperMock.GetSignedUrlUpload.name}`;

//     test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
//         const actual = s3HelperMock.GetSignedUrlUpload(TestValues.EmptyString, TestValues.Key);
//         return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
//     });
//     test(`${TestValues.ThrowsOnEmpty} key`, () => {
//         const actual = s3HelperMock.GetSignedUrlUpload(TestValues.Name, TestValues.EmptyString);
//         return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
//     });
//     test(TestValues.ValidTest, () => {
//         const actual = s3HelperMock.GetSignedUrlUpload(TestValues.Name, TestValues.Key);
//         return expect(actual).resolves.toEqual(TestValues.SignedUrl);
//     });
// });

/**
 * Test the MoveObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MoveObjectAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.CopyObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} sourceBucket`, () => {
    const actual = s3HelperMock.MoveObjectAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} sourceBucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} sourceKey`, () => {
    const actual = s3HelperMock.MoveObjectAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} sourceKey`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} destinationBucket`, () => {
    const actual = s3HelperMock.MoveObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} destinationBucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} destinationKey`, () => {
    const actual = s3HelperMock.MoveObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} destinationKey`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.MoveObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(undefined);
  });
});

/**
 * Test the MultipartUploadCompleteAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadCompleteAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.MultipartUploadCompleteAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.MultipartUploadCompleteAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.UploadId,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.MultipartUploadCompleteAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.UploadId,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} uploadId`, () => {
    const actual = s3HelperMock.MultipartUploadCompleteAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} uploadId`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.MultipartUploadCompleteAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.UploadId,
    );
    return expect(actual).resolves.toEqual(
      completeMultipartUploadOutputResponse,
    );
  });
});

/**
 * Test the MultipartUploadStartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadStartAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.MultipartUploadStartAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.MultipartUploadStartAsync(
      TestValues.EmptyString,
      TestValues.Key,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.MultipartUploadStartAsync(
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.MultipartUploadStartAsync(
      TestValues.Name,
      TestValues.Key,
    );
    return expect(actual).resolves.toEqual(createMultipartUploadOutputResponse);
  });
});

/**
 * Test the MultipartUploadUploadPartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadUploadPartAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.MultipartUploadUploadPartAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.UploadId,
      TestValues.UploadPart,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.UploadId,
      TestValues.UploadPart,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} uploadId`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyString,
      TestValues.UploadPart,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} uploadId`,
    );
  });
  test(`${TestValues.CannotBeZero} uploadId`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.UploadId,
      0,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.CannotBeZero} - uploadId`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} contents`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.UploadId,
      TestValues.UploadPart,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} contents`,
    );
  });
  test(`contents too small`, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.UploadId,
      TestValues.UploadPart,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-Part size must be between 5 MB and 10 GB`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.MultipartUploadUploadPartAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.UploadId,
      TestValues.UploadPart,
      TestValues.UploadPart5Mb,
    );
    return expect(actual).resolves.toEqual(uploadPartOutputResponse);
  });
});

/**
 * Test the PutObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.PutObjectAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.PutObjectAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.PutObjectAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.PutObjectAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.Body,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.PutObjectAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Body,
    );
    return expect(actual).resolves.toEqual(putObjectOutputResponse);
  });
});

/**
 * Test the SetObjectTagAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.SetObjectTagAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.SetObjectTagAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.SetObjectTagAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.Name,
      TestValues.Name,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.SetObjectTagAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.Name,
      TestValues.Name,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} tagName`, () => {
    const actual = s3HelperMock.SetObjectTagAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyString,
      TestValues.Name,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} tagName`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} tagValue`, () => {
    const actual = s3HelperMock.SetObjectTagAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.EmptyString,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} tagValue`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.SetObjectTagAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.Name,
      TestValues.Name,
    );
    return expect(actual).resolves.toEqual(putObjectOutputResponse);
  });
});

/**
 * Test the SetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.SetObjectTagsAsync.name}`, () => {
  // set action for this method
  const action = `${S3Helper.name}.${s3HelperMock.SetObjectTagsAsync.name}`;

  test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
    const actual = s3HelperMock.SetObjectTagsAsync(
      TestValues.EmptyString,
      TestValues.Key,
      TestValues.FileTags,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} bucket`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} key`, () => {
    const actual = s3HelperMock.SetObjectTagsAsync(
      TestValues.Name,
      TestValues.EmptyString,
      TestValues.FileTags,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} key`,
    );
  });
  test(`${TestValues.ThrowsOnEmpty} tags`, () => {
    const actual = s3HelperMock.SetObjectTagsAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.EmptyArray,
    );
    return expect(actual).rejects.toThrow(
      `[${action}]-${TestValues.MustSupply} tags`,
    );
  });
  test(TestValues.ValidTest, () => {
    const actual = s3HelperMock.SetObjectTagsAsync(
      TestValues.Name,
      TestValues.Key,
      TestValues.FileTags,
    );
    return expect(actual).resolves.toEqual(putObjectOutputResponse);
  });
});
