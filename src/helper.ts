import * as AWS from 'aws-sdk';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { IS3Helper } from './interface';

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.copyObject(params).promise();
        this.LogHelper.LogResponse(action,
            response);

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.createBucket(params).promise();
        this.LogHelper.LogResponse(action,
            response);

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.deleteBucket(params).promise();
        this.LogHelper.LogResponse(action,
            response);

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.deleteObject(params).promise();
        this.LogHelper.LogResponse(action,
            response);

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.deleteObjects(params).promise();
        this.LogHelper.LogResponse(action,
            response);

        return response;
    }

    /**
     * Get a JSON typed object from S3
     * @param bucket {string} Bucket to retrieve from
     * @param key {string} File prefix and name
     */
    public async GetObjectAsJsonAsync<T>(bucket: string,
        key: string): Promise<T> {
        const data = (await this.GetObjectAsync(bucket,
            key)).Body;

        const buffer = data ? data as Buffer : undefined;

        const json = buffer ? buffer.toString() : '';

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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.getObject(params).promise();
        this.LogHelper.LogResponse(action,
            response);

        return response;
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
        this.LogHelper.LogRequest(action,
            params);

        // make AWS call
        const response = await this.Repository.putObject(params).promise();
        this.LogHelper.LogResponse(action,
            response);

        return response;
    }
}
