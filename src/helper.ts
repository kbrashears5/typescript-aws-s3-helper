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

    /**
     * Copy an object from a source to a target
     * @param sourceBucket {string} Source bucket name
     * @param sourceKey {string} Source key
     * @param destinationBucket {string} Destination bucket name
     * @param destinationKey {string} Destination key
     */
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

    /**
     * Create a S3 bucket
     * @param name {string} Bucket name
     */
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

    /**
     * Delete a S3 bucket
     * @param name {string} Bucket name
     */
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

    /**
     * Delete an object
     * @param bucket {string} Bucket name
     * @param key {string} Object key to delete
     */
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

    /**
     * Delete multiple objects
     * @param bucket {string} Bucket name
     * @param keys {string[]} Array of object keys to delete
     */
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

    /**
     * Delete all the object tags off of an object
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     */
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

    /**
     * Get metadata about a bucket
     * @param bucket {string} Bucket
     */
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


    /**
     * Get a JSON typed object from S3
     * @param bucket {string} Bucket to retrieve from
     * @param key {string} File prefix and name
     */
    public async GetObjectAsJsonAsync<T>(bucket: string,
        key: string): Promise<T> {
        const data = await this.GetObjectContentsAsync(bucket, key);

        const json = data ? data.toString() : '';

        return JSON.parse(json) as T;
    }

    /**
     * Get an object from S3
     * @param bucket {string} Bucket to retrieve from
     * @param key {string} File prefix and name
     */
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

    /**
     * Get the contents of an S3 object
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     */
    public async GetObjectContentsAsync(bucket: string,
        key: string): Promise<Buffer | undefined> {

        const data = (await this.GetObjectAsync(bucket, key)).Body;

        return data ? data as Buffer : undefined;
    }

    /**
     * Get metadata about an object
     * @param bucket {string} Bucket
     * @param key  {string} Object key
     */
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

    /**
     * Gets the tags for an object
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     */
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

    /**
     * Get a signed url to upload to or download from
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     * @param type {SignedUrlType} Type of signed url to get
     * @param acl {AWS.S3.ObjectCannedACL} ACL of file if uploading
     * @param timeoutInMinutes {number} Timeout for the signed url
     */
    public async GetSignedUrl(bucket: string,
        key: string,
        type: SignedUrlType,
        timeoutInMinutes: number = 5,
        acl?: AWS.S3.ObjectCannedACL): Promise<string> {

        const action = `${S3Helper.name}.${this.GetSignedUrl.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, type, acl, timeoutMinutes: timeoutInMinutes });

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

    /**
     * Move a file within a bucket or to a different bucket
     * @param sourceBucket {string} Source bucket name
     * @param sourceKey {string} Source object key
     * @param destinationBucket {string} Destination bucket name
     * @param destinationKey {string} Destination object key
     */
    public async MoveObjectAsync(sourceBucket: string,
        sourceKey: string,
        destinationBucket: string,
        destinationKey: string): Promise<void> {

        const copyResult = await this.CopyObjectAsync(sourceBucket, sourceKey, destinationBucket, destinationKey);

        if (!this.ObjectOperations.IsNullOrEmpty(copyResult)) {
            await this.DeleteObjectAsync(sourceBucket, sourceKey);
        }
    }

    /**
     * Upload a file to S3 Bucket
     * @param bucket {string} Bucket to upload to
     * @param key {string} File prefix and name
     * @param body {string} File contents
     * @param acl {S3CannedACL} S3Canned ACL. Default is 'bucket-owner-full-control'
     * @param encoding {string} File encoding. Default is 'utf-8'
     * @returns Promise<string> - URL of uploaded file
     */
    public async PutObjectAsync(bucket: string,
        key: string,
        body: string | Buffer,
        acl?: AWS.S3.ObjectCannedACL,
        encoding?: string): Promise<AWS.S3.PutObjectOutput> {

        const action = `${S3Helper.name}.${this.PutObjectAsync.name}`;
        this.LogHelper.LogInputs(action, { bucket, key, body, acl });

        // guard clauses
        if (this.ObjectOperations.IsNullOrWhitespace(bucket)) { throw new Error(`[${action}]-Must supply bucket`); }
        if (this.ObjectOperations.IsNullOrWhitespace(key)) { throw new Error(`[${action}]-Must supply key`); }

        // set defaults
        if (this.ObjectOperations.IsNullOrWhitespace(acl)) { acl = 'bucket-owner-full-control'; }
        if (this.ObjectOperations.IsNullOrWhitespace(encoding)) { encoding = 'utf-8'; }

        // create params object
        const params: AWS.S3.PutObjectRequest = {
            ACL: acl,
            Body: body,
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

    /**
     * Inserts or updates a tag on an object
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     * @param tagName {string} Tag name
     * @param tagValue {string} Tag value
     */
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

    /**
     * Sets the tags on an object
     * @param bucket {string} Bucket name
     * @param key {string} Object key
     * @param tags {AWS.S3.TagSet} Tags
     */
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
