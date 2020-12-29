import { BaseMock } from 'typescript-helper-functions';
import * as S3 from '@aws-sdk/client-s3';
import { Readable } from 'stream';

/**
 * S3 Mock class
 */
export class S3Mock extends BaseMock {

    /**
     * Mock an S3.CompleteMultipartUploadOutput response
     */
    public CompleteMultipartUploadOutput: S3.CompleteMultipartUploadOutput = {};

    /**
     * Mock an S3.CopyObjectOutput response
     */
    public CopyObjectOutput: S3.CopyObjectOutput = {};

    /**
     * Mock an S3.CreateBucketOutput response
     */
    public CreateBucketOutput: S3.CreateBucketOutput = {};

    /**
     * Mock an S3.CreateMultipartUploadOutput response
     */
    public CreateMultipartUploadOutput: S3.CreateMultipartUploadOutput = {};

    /**
     * Mock an S3.DeleteBucketOutput response
     * Technically does not exist
     */
    public DeleteBucketOutput: object = {};

    /**
     * Mock an S3.DeleteObjectOutput response
     */
    public DeleteObjectOutput: S3.DeleteObjectOutput = {};

    /**
     * Mock an S3.DeleteObjectsOutput response
     */
    public DeleteObjectsOutput: S3.DeleteObjectsOutput = {};

    /**
     * Mock an S3.DeleteObjectTaggingOutput response
     */
    public DeleteObjectTaggingOutput: S3.DeleteObjectTaggingOutput = {};

    /**
     * Mock an S3.GetObjectOutput response
     * Technically does not exist
     */
    public GetBucketOutput: object = {};

    /**
     * Readable
     */
    private Readable: Readable = new Readable();

    /**
     * Readable body
     */
    private ReadableBody: string = 'mock-body';

    /**
     * Mock an S3.GetObjectOutput response
     */
    public GetObjectOutput: S3.GetObjectOutput = { Body: this.Readable };

    /**
     * Mock an S3.GetObjectTaggingOutput response
     */
    public GetObjectTaggingOutput: S3.GetObjectTaggingOutput = {
        TagSet: [{
            Key: 'Tag1',
            Value: 'Tag1Value',
        } as S3.Tag]
    };

    /**
     * Mock an S3.HeadBucketOutput response
     * Technically does not exist
     */
    public HeadBucketOutput: object = {};

    /**
     * Mock an S3.Metadata response
     */
    public HeadObjectOutput: S3.HeadObjectOutput = { Metadata: { key1: 'value1' } };

    /**
     * Mocks an S3.PutObjectOutput response
     */
    public PutObjectOutput: S3.PutObjectOutput = {};

    /**
     * Mocks an S3.PutObjectTaggingOutput response
     */
    public PutObjectTaggingOutput: S3.PutObjectTaggingOutput = {};

    /**
     * Mocks an S3.UploadPartOutput response
     */
    public UploadPartOutput: S3.UploadPartOutput = {};

    /**
     * Create the S3 mock
     */
    protected CreateMock(returnError: boolean) {
        const rejectResponse = new Error(`AWS Error`);

        this.Readable.push(this.ReadableBody);
        this.Readable.push(null);

        // implement the AWS responses
        const awsResponses = {
            // complete multipart upload response
            completeMultipartUpload: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.CompleteMultipartUploadOutput>(this.CompleteMultipartUploadOutput);
                }),
            },
            // copy object response
            copyObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.CopyObjectOutput>(this.CopyObjectOutput);
                }),
            },
            // create bucket response
            createBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.CreateBucketOutput>(this.CreateBucketOutput);
                }),
            },
            // create multipart upload response
            createMultipartUpload: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.CreateMultipartUploadOutput>(this.CreateMultipartUploadOutput);
                }),
            },
            // delete bucket response
            deleteBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.DeleteBucketOutput);
                }),
            },
            // delete object response
            deleteObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.DeleteObjectOutput>(this.DeleteObjectOutput);
                }),
            },
            // delete objects response
            deleteObjects: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.DeleteObjectsOutput>(this.DeleteObjectsOutput);
                }),
            },
            // delete object tagging response
            deleteObjectTagging: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.DeleteObjectTaggingOutput>(this.DeleteObjectTaggingOutput);
                }),
            },
            // get object response
            getObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.GetObjectOutput>(this.GetObjectOutput);
                }),
            },
            // get object tagging response
            getObjectTagging: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.GetObjectTaggingOutput>(this.GetObjectTaggingOutput);
                }),
            },
            // head bucket response
            headBucket: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<{}>(this.HeadBucketOutput);
                }),
            },
            // head object response
            headObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.HeadObjectOutput>(this.HeadObjectOutput);
                }),
            },
            // put object response
            putObject: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.PutObjectOutput>(this.PutObjectOutput);
                }),
            },
            // put object tagging response
            putObjectTagging: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.PutObjectTaggingOutput>(this.PutObjectTaggingOutput);
                }),
            },
            // upload part response
            uploadPart: {
                promise: jest.fn().mockImplementation(() => {
                    return returnError ?
                        Promise.reject(rejectResponse) :
                        Promise.resolve<S3.UploadPartOutput>(this.UploadPartOutput);
                }),
            },
        };

        const options = {} as S3.S3ClientConfig;

        // create the functions
        let functions = new S3.S3(options);
        functions = {
            completeMultipartUpload: () => awsResponses.completeMultipartUpload,
            copyObject: () => awsResponses.copyObject,
            createBucket: () => awsResponses.createBucket,
            createMultipartUpload: () => awsResponses.createMultipartUpload,
            deleteBucket: () => awsResponses.deleteBucket,
            deleteObject: () => awsResponses.deleteObject,
            deleteObjects: () => awsResponses.deleteObjects,
            deleteObjectTagging: () => awsResponses.deleteObjectTagging,
            getObject: () => awsResponses.getObject,
            getObjectTagging: () => awsResponses.getObjectTagging,
            getSignedUrl: () => (SignedUrl),
            headBucket: () => awsResponses.headBucket,
            headObject: () => awsResponses.headObject,
            putObject: () => awsResponses.putObject,
            putObjectTagging: () => awsResponses.putObjectTagging,
            uploadPart: () => awsResponses.uploadPart,
        };

        return functions;
    }
}

const SignedUrl = 'https://bucket.s3.amazonaws.com/file.ext?AWSAccessKeyId=AccessKeyId&Content-Type=ContentType&Expires=123456789&Signature=Signature';
