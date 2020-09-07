import * as AWS from 'aws-sdk';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { IS3Helper } from './interface';
import { SignedUrlType } from './signed-url-type';

/**
 * S3 Helper
 */
export class S3Helper extends BaseClass implements IS3Helper {
    /**
     * AWS Repository for S3
     */
    public Repository: AWS.S3;

    /**
     * Create new instance of S3Helper
     * @param logger {ILogger} Logger
     * @param repository {AWS.S3} A new repository will be created if not supplied
     * @param options {AWS.S3.ClientConfiguration} Only needed if a repository is supplied
     */
    constructor(logger: ILogger,
        repository?: AWS.S3,
        options?: AWS.S3.ClientConfiguration) {
        super(logger);

        this.Repository = repository || new AWS.S3(options);
    }

    public async CopyObjectAsync(sourceBucket: string,
        sourceKey: string,
        destinationBucket: string,
        destinationKey: string): Promise<AWS.S3.CopyObjectOutput> {

        const action = `${S3Helper.name}.${this.CopyObjectAsync.name}`;
        this.LogHelper.LogInputs(action, { sourceBucket, sourceKey, destinationBucket, destinationKey });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(sourceBucket)) { throw new Error(`[${action}]-Must supply sourceBucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(sourceKey)) { throw new Error(`[${action}]-Must supply sourceKey`); }
        if (this.ObjectOperations.IsNullOrWhitespace(destinationBucket)) { throw new Error(`[${action}]-Must supply destinationBucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(destinationKey)) { throw new Error(`[${action}]-Must supply destinationKey`); }

        // create params object
        const params: AWS.S3.CopyObjectRequest = {
            Bucket: destinationBucket,
            CopySource: `${sourceBucket}/${sourceKey}`,
            Key: destinationKey,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.copyObject(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async CreateBucketAsync(name: string): Promise<AWS.S3.CreateBucketOutput> {
        const action = `${S3Helper.name}.${this.CreateBucketAsync.name}`;
        this.LogHelper.LogInputs(action, { name });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.S3.CreateBucketRequest = {
            Bucket: name,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.createBucket(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteBucketAsync(name: string): Promise<object> {
        const action = `${S3Helper.name}.${this.DeleteBucketAsync.name}`;
        this.LogHelper.LogInputs(action, { name });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(name)) { throw new Error(`[${action}]-Must supply name`); }

        // create params object
        const params: AWS.S3.DeleteBucketRequest = {
            Bucket: name,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteBucket(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteObjectAsync(bucket: string,
        key: string): Promise<AWS.S3.DeleteObjectOutput> {

        const action = `${S3Helper.name}.${this.DeleteObjectAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        // create params object
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: bucket,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteObject(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteObjectsAsync(bucket: string,
        keys: string[]): Promise<AWS.S3.DeleteObjectsOutput> {

        const action = `${S3Helper.name}.${this.DeleteObjectsAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, keys });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (!keys || keys.length === 0) { throw new Error(`[${action}]-Must supply at least one key`); }

        // create array of ObjectIdentifiers
        const keysArray: AWS.S3.ObjectIdentifier[] = [];
        for (const key of keys) {
            keysArray.push({ Key: key });
        }

        // create params object
        const params: AWS.S3.DeleteObjectsRequest = {
            Bucket: bucket,
            Delete: { Objects: keysArray },
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.deleteObjects(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async DeleteObjectTagsAsync(bucket: string,
        key: string): Promise<object> {

        const action = `${S3Helper.name}.${this.DeleteObjectTagsAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key })

        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        const params: AWS.S3.DeleteObjectTaggingRequest = {
            Bucket: bucket,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.deleteObjectTagging(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async GetBucketMetadataAsync(bucket: string): Promise<object> {

        const action = `${S3Helper.name}.${this.GetBucketMetadataAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }

        const params: AWS.S3.HeadBucketRequest = {
            Bucket: bucket,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.headBucket(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async GetObjectAsJsonAsync<T>(bucket: string,
        key: string): Promise<T> {
        const data = await this.GetObjectContentsAsync(bucket, key);

        const json = data ? data.toString() : '';

        return JSON.parse(json) as T;
    }

    public async GetObjectAsync(bucket: string,
        key: string): Promise<AWS.S3.GetObjectOutput> {

        const action = `${S3Helper.name}.${this.GetObjectAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        // create params object
        const params: AWS.S3.GetObjectRequest = {
            Bucket: bucket,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.getObject(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async GetObjectContentsAsync(bucket: string,
        key: string): Promise<Buffer | undefined> {

        const data = (await this.GetObjectAsync(bucket, key)).Body;

        return data ? data as Buffer : undefined;
    }

    public async GetObjectMetadataAsync(bucket: string,
        key: string): Promise<AWS.S3.Metadata | undefined> {

        const action = `${S3Helper.name}.${this.GetObjectMetadataAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        const params: AWS.S3.HeadObjectRequest = {
            Bucket: bucket,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.headObject(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response.Metadata;
    }

    public async GetObjectTagsAsync(bucket: string,
        key: string): Promise<AWS.S3.TagSet> {

        const action = `${S3Helper.name}.${this.GetObjectTagsAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        const params: AWS.S3.GetObjectTaggingRequest = {
            Bucket: bucket,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.getObjectTagging(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response.TagSet;
    }

    public async GetSignedUrl(bucket: string,
        key: string,
        type: SignedUrlType,
        timeoutInMinutes: number = 5,
        acl?: AWS.S3.ObjectCannedACL): Promise<string> {

        const action = `${S3Helper.name}.${this.GetSignedUrl.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, type, acl, timeoutInMinutes });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        // determine upload or download url
        let operation = '';
        switch (type) {
            case SignedUrlType.Download:
                operation = 'getObject'
                break;
            case SignedUrlType.Upload:
                operation = 'putObject'
            default:
                break;
        }

        const params = {
            Bucket: bucket,
            Key: key,
            Expires: timeoutInMinutes * 60,
            ACL: acl,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.getSignedUrl(operation, params);
        this.LogHelper.LogResponse(action, { response });

        return response;
    }

    public async MoveObjectAsync(sourceBucket: string,
        sourceKey: string,
        destinationBucket: string,
        destinationKey: string): Promise<void> {

        const copyResult = await this.CopyObjectAsync(sourceBucket, sourceKey, destinationBucket, destinationKey);

        if (!this.ObjectOperations.IsNullOrEmpty(copyResult)) {
            await this.DeleteObjectAsync(sourceBucket, sourceKey);
        }
    }

    public async MultipartUploadCompleteAsync(bucket: string,
        key: string,
        uploadId: string): Promise<AWS.S3.CompleteMultipartUploadOutput> {

        const action = `${S3Helper.name}.${this.MultipartUploadCompleteAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, uploadId });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }
        if (this.ObjectOperations.IsNullOrWhitespace(uploadId)) { throw new Error(`[${action}]-Must supply uploadId`); }

        const params: AWS.S3.CompleteMultipartUploadRequest = {
            Bucket: bucket,
            Key: key,
            UploadId: uploadId,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.completeMultipartUpload(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async MultipartUploadStartAsync(bucket: string,
        key: string,
        acl?: AWS.S3.ObjectCannedACL): Promise<AWS.S3.CreateMultipartUploadOutput> {

        const action = `${S3Helper.name}.${this.MultipartUploadStartAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, acl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        const params: AWS.S3.CreateMultipartUploadRequest = {
            Bucket: bucket,
            Key: key,
            ACL: acl,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.createMultipartUpload(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async MultipartUploadUploadPartAsync(bucket: string,
        key: string,
        uploadId: string,
        uploadPart: number,
        contents: string): Promise<AWS.S3.UploadPartOutput> {

        const action = `${S3Helper.name}.${this.MultipartUploadUploadPartAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, uploadId, uploadPart });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }
        if (this.ObjectOperations.IsNullOrWhitespace(uploadId)) { throw new Error(`[${action}]-Must supply uploadId`); }
        if (uploadPart === 0) { throw new Error(`[${action}]-Cannot be zero - uploadId`); }
        if (this.ObjectOperations.IsNullOrWhitespace(contents)) { throw new Error(`[${action}]-Must supply contents`); }

        const bytes = (new TextEncoder()).encode(contents);

        const tooSmall = bytes.length < 5000000;
        const tooLarge = bytes.length > 10000000000;

        if (tooSmall || tooLarge) { throw new Error(`[${action}]-Part size must be between 5 MB and 10 GB`); }

        const params: AWS.S3.UploadPartRequest = {
            Body: contents,
            Bucket: bucket,
            Key: key,
            PartNumber: uploadPart,
            UploadId: uploadId,
        };
        this.LogHelper.LogRequest(action, params);

        const response = await this.Repository.uploadPart(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async PutObjectAsync(bucket: string,
        key: string,
        contents: string | Buffer,
        acl?: AWS.S3.ObjectCannedACL,
        encoding?: string): Promise<AWS.S3.PutObjectOutput> {

        const action = `${S3Helper.name}.${this.PutObjectAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, acl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        // set defaults
        if (this.ObjectOperations.IsNullOrWhitespace(acl)) { acl = 'bucket-owner-full-control'; }
        if (this.ObjectOperations.IsNullOrWhitespace(encoding)) { encoding = 'utf-8'; }

        // create params object
        const params: AWS.S3.PutObjectRequest = {
            ACL: acl,
            Body: contents,
            Bucket: bucket,
            ContentEncoding: encoding,
            Key: key,
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.putObject(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }

    public async SetObjectTagAsync(bucket: string,
        key: string,
        tagName: string,
        tagValue: string): Promise<AWS.S3.PutObjectTaggingOutput> {

        const action = `${S3Helper.name}.${this.SetObjectTagAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, tagName, tagValue });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }
        if (this.ObjectOperations.IsNullOrWhitespace(tagName)) { throw new Error(`[${action}]-Must supply tagName`); }
        if (this.ObjectOperations.IsNullOrWhitespace(tagValue)) { throw new Error(`[${action}]-Must supply tagValue`); }

        // get the original
        const tags = await this.GetObjectTagsAsync(bucket, key);

        // find if it exists
        const tag = tags.find((t) => t.Key === tagName);
        if (tag) {
            tag.Value = tagValue;
        } else {
            tags.push({ Key: tagName, Value: tagValue });
        }

        return this.SetObjectTagsAsync(bucket, key, tags);
    }

    public async SetObjectTagsAsync(bucket: string,
        key: string,
        tags: AWS.S3.TagSet): Promise<AWS.S3.PutObjectTaggingOutput> {

        const action = `${S3Helper.name}.${this.SetObjectTagsAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, tags });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }
        if (this.ObjectOperations.IsNullOrEmpty(tags)) { throw new Error(`[${action}]-Must supply tags`); }

        const params: AWS.S3.PutObjectTaggingRequest = {
            Bucket: bucket,
            Key: key,
            Tagging: { TagSet: tags },
        };
        this.LogHelper.LogRequest(action, params);

        // make AWS call
        const response = await this.Repository.putObjectTagging(params).promise();
        this.LogHelper.LogResponse(action, response);

        return response;
    }
}
