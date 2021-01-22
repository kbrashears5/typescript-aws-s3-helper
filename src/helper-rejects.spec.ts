import { S3Helper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';

const error = new Error(`AWS Error`);

const completeMultipartUpload = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const copyObject = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const createBucket = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const createMultipartUpload = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteBucket = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteObject = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteObjects = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const deleteObjectTagging = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const getObject = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const getObjectTagging = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const headBucket = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const headObject = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const putObject = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const putObjectTagging = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
});
const uploadPart = jest.fn().mockImplementation(() => {
    return Promise.reject(error);
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
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.CopyObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the CreateBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.CreateBucketAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.CreateBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteBucketAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.DeleteBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectTagsAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.DeleteObjectTagsAsync(TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.DeleteObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the DeleteObjectsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.DeleteObjectsAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.DeleteObjectsAsync(TestValues.Name, [TestValues.Key]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetBucketMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetBucketMetadataAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.GetBucketMetadataAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetObjectAsJsonAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectAsJsonAsync.name}`, () => {
    // TODO
});

/**
 * Test the GetObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.GetObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetObjectContentsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectContentsAsync.name}`, () => {
    // TODO
});

/**
 * Test the GetObjectMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectMetadataAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.GetObjectMetadataAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the GetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.GetObjectTagsAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.GetObjectTagsAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

// /**
//  * Test the GetSignedUrlDownload method
//  */
// describe(`${S3Helper.name}.${s3HelperMock.GetSignedUrlDownload.name}`, () => {
//     // TODO
// });

// /**
//  * Test the GetSignedUrlUpload method
//  */
// describe(`${S3Helper.name}.${s3HelperMock.GetSignedUrlUpload.name}`, () => {
//     // TODO
// });

/**
 * Test the MoveObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MoveObjectAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.MoveObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the MultipartUploadCompleteAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadCompleteAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.MultipartUploadCompleteAsync(TestValues.Name, TestValues.Key, TestValues.UploadId);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the MultipartUploadStartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadStartAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.MultipartUploadStartAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the MultipartUploadUploadPartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.MultipartUploadUploadPartAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.UploadPart5Mb);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the PutObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.PutObjectAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.PutObjectAsync(TestValues.Name, TestValues.Key, TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the SetObjectTagAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.SetObjectTagAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.SetObjectTagAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});

/**
 * Test the SetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMock.SetObjectTagsAsync.name}`, () => {
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMock.SetObjectTagsAsync(TestValues.Name, TestValues.Key, TestValues.FileTags);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
});
