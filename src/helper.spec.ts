import { S3Helper } from './helper';
import { Logger, LogLevel } from 'typescript-ilogger';
import { TestingValues } from './test-values';
import { S3Mock } from './mock';

const logger = new Logger(LogLevel.Off);
const mockerResolves = new S3Mock(false);
const s3HelperMockResolves = new S3Helper(logger, mockerResolves.Mock);
const mockerRejects = new S3Mock(true);
const s3HelperMockRejects = new S3Helper(logger, mockerRejects.Mock);
const TestValues = new TestingValues();

/**
 * Test the CopyObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} sourceBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.EmptyString, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} sourceKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name, TestValues.EmptyString, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceKey`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationBucket`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name, TestValues.Key, TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationKey`, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationKey`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.CopyObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.CopyObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.CopyObjectOutput);
    });
});

/**
 * Test the CreateBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.CreateBucketAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CreateBucketAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.CreateBucketAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.CreateBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.CreateBucketAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteBucketAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteBucketAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteBucketAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteBucketAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} name`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteBucketAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteBucketAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteObjectTagsAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteObjectTagsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteObjectTagsAsync(TestValues.EmptyString, TestValues.Name);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.DeleteObjectTagsAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteObjectTagsAsync(TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteObjectTagsAsync(TestValues.Name, TestValues.Name);
        return expect(actual).resolves.toEqual({});
    });
});

/**
 * Test the DeleteObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the DeleteObjectsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.DeleteObjectsAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.DeleteObjectsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.EmptyString, [TestValues.Key]);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key array`, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.Name, TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} at least one key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.DeleteObjectsAsync(TestValues.Name, [TestValues.Key]);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.DeleteObjectsAsync(TestValues.Name, [TestValues.Key]);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the GetBucketMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetBucketMetadataAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetBucketMetadataAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetBucketMetadataAsync(TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.GetBucketMetadataAsync(TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetBucketMetadataAsync(TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.CreateBucketOutput);
    });
});

/**
 * Test the GetObjectAsJsonAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectAsJsonAsync.name}`, () => {
    // TODO
});

/**
 * Test the GetObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.GetObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetObjectAsync(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.GetObjectOutput);
    });
});

/**
 * Test the GetObjectContentsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectContentsAsync.name}`, () => {
    // TODO
});

/**
 * Test the GetObjectMetadataAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectMetadataAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetObjectMetadataAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetObjectMetadataAsync(TestValues.EmptyString, TestValues.Name);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetObjectMetadataAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.GetObjectMetadataAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetObjectMetadataAsync(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(TestValues.Metadata);
    });
});

/**
 * Test the GetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetObjectTagsAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetObjectTagsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetObjectTagsAsync(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetObjectTagsAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.GetObjectTagsAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetObjectTagsAsync(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(TestValues.FileTags);
    });
});

/**
 * Test the GetSignedUrlDownload method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetSignedUrlDownload.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetSignedUrlDownload.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetSignedUrlDownload(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetSignedUrlDownload(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetSignedUrlDownload(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(TestValues.SignedUrl);
    });
});

/**
 * Test the GetSignedUrlUpload method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.GetSignedUrlUpload.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.GetSignedUrlUpload.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.GetSignedUrlUpload(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.GetSignedUrlUpload(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.GetSignedUrlUpload(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(TestValues.SignedUrl);
    });
});

/**
 * Test the MoveObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.MoveObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.CopyObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} sourceBucket`, () => {
        const actual = s3HelperMockResolves.MoveObjectAsync(TestValues.EmptyString, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} sourceKey`, () => {
        const actual = s3HelperMockResolves.MoveObjectAsync(TestValues.Name, TestValues.EmptyString, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} sourceKey`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationBucket`, () => {
        const actual = s3HelperMockResolves.MoveObjectAsync(TestValues.Name, TestValues.Key, TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationBucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} destinationKey`, () => {
        const actual = s3HelperMockResolves.MoveObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} destinationKey`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.MoveObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.MoveObjectAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(undefined);
    });
});

/**
 * Test the MultipartUploadCompleteAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.MultipartUploadCompleteAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.MultipartUploadCompleteAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.MultipartUploadCompleteAsync(TestValues.EmptyString, TestValues.Key, TestValues.UploadId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.MultipartUploadCompleteAsync(TestValues.Name, TestValues.EmptyString, TestValues.UploadId);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(`${TestValues.ThrowsOnEmpty} uploadId`, () => {
        const actual = s3HelperMockResolves.MultipartUploadCompleteAsync(TestValues.Name, TestValues.Key, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uploadId`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.MultipartUploadCompleteAsync(TestValues.Name, TestValues.Key, TestValues.UploadId);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.MultipartUploadCompleteAsync(TestValues.Name, TestValues.Key, TestValues.UploadId);
        return expect(actual).resolves.toEqual(mockerResolves.CompleteMultipartUploadOutput);
    });
});

/**
 * Test the MultipartUploadStartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.MultipartUploadStartAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.MultipartUploadStartAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.MultipartUploadStartAsync(TestValues.EmptyString, TestValues.Key);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.MultipartUploadStartAsync(TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.MultipartUploadStartAsync(TestValues.Name, TestValues.Key);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.MultipartUploadStartAsync(TestValues.Name, TestValues.Key);
        return expect(actual).resolves.toEqual(mockerResolves.CreateMultipartUploadOutput);
    });
});

/**
 * Test the MultipartUploadUploadPartAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.MultipartUploadUploadPartAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.MultipartUploadUploadPartAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.EmptyString, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.EmptyString, TestValues.UploadId, TestValues.UploadPart, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(`${TestValues.ThrowsOnEmpty} uploadId`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.EmptyString, TestValues.UploadPart, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} uploadId`);
    });
    test(`${TestValues.CannotBeZero} uploadId`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, 0, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.CannotBeZero} - uploadId`);
    });
    test(`${TestValues.ThrowsOnEmpty} contents`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} contents`);
    });
    test(`contents too small`, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-Part size must be between 5 MB and 10 GB`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.UploadPart5Mb);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.MultipartUploadUploadPartAsync(TestValues.Name, TestValues.Key, TestValues.UploadId, TestValues.UploadPart, TestValues.UploadPart5Mb);
        return expect(actual).resolves.toEqual(mockerResolves.UploadPartOutput);
    });
});

/**
 * Test the PutObjectAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.PutObjectAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.EmptyString, TestValues.Key, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.Name, TestValues.EmptyString, TestValues.Body);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.PutObjectAsync(TestValues.Name, TestValues.Key, TestValues.Body);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.PutObjectAsync(TestValues.Name, TestValues.Key, TestValues.Body);
        return expect(actual).resolves.toEqual(mockerResolves.PutObjectOutput);
    });
});

/**
 * Test the SetObjectTagAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.SetObjectTagAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.SetObjectTagAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.SetObjectTagAsync(TestValues.EmptyString, TestValues.Key, TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.SetObjectTagAsync(TestValues.Name, TestValues.EmptyString, TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(`${TestValues.ThrowsOnEmpty} tagName`, () => {
        const actual = s3HelperMockResolves.SetObjectTagAsync(TestValues.Name, TestValues.Key, TestValues.EmptyString, TestValues.Name);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tagName`);
    });
    test(`${TestValues.ThrowsOnEmpty} tagValue`, () => {
        const actual = s3HelperMockResolves.SetObjectTagAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.EmptyString);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tagValue`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.SetObjectTagAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Name);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.SetObjectTagAsync(TestValues.Name, TestValues.Key, TestValues.Name, TestValues.Name);
        return expect(actual).resolves.toEqual(mockerResolves.PutObjectOutput);
    });
});

/**
 * Test the SetObjectTagsAsync method
 */
describe(`${S3Helper.name}.${s3HelperMockResolves.SetObjectTagsAsync.name}`, () => {
    // set action for this method
    const action = `${S3Helper.name}.${s3HelperMockResolves.SetObjectTagsAsync.name}`;

    test(`${TestValues.ThrowsOnEmpty} bucket`, () => {
        const actual = s3HelperMockResolves.SetObjectTagsAsync(TestValues.EmptyString, TestValues.Key, TestValues.FileTags);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} bucket`);
    });
    test(`${TestValues.ThrowsOnEmpty} key`, () => {
        const actual = s3HelperMockResolves.SetObjectTagsAsync(TestValues.Name, TestValues.EmptyString, TestValues.FileTags);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} key`);
    });
    test(`${TestValues.ThrowsOnEmpty} tags`, () => {
        const actual = s3HelperMockResolves.SetObjectTagsAsync(TestValues.Name, TestValues.Key, TestValues.EmptyArray);
        return expect(actual).rejects.toThrow(`[${action}]-${TestValues.MustSupply} tags`);
    });
    test(TestValues.InvalidTest, () => {
        const actual = s3HelperMockRejects.SetObjectTagsAsync(TestValues.Name, TestValues.Key, TestValues.FileTags);
        return expect(actual).rejects.toThrow(TestValues.AWSError);
    });
    test(TestValues.ValidTest, () => {
        const actual = s3HelperMockResolves.SetObjectTagsAsync(TestValues.Name, TestValues.Key, TestValues.FileTags);
        return expect(actual).resolves.toEqual(mockerResolves.PutObjectOutput);
    });
});
