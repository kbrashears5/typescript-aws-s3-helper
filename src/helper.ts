/* eslint-disable no-undefined */
import * as S3 from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ILogger } from 'typescript-ilogger';
import { BaseClass } from 'typescript-helper-functions';
import { IS3Helper } from './interface';
import { Readable } from 'stream';
import { Metadata } from './any';

/**
 * S3 Helper
 */
export class S3Helper extends BaseClass implements IS3Helper {
  /**
   * AWS Repository for S3
   */
  private Repository: S3.S3;

  /**
   * S3 Client Config
   */
  private Options: S3.S3ClientConfig;

  /**
   * Create new instance of S3Helper
   * @param logger {ILogger} Logger
   * @param repository {S3.S3} A new repository will be created if not supplied
   * @param options {S3.S3ClientConfig} Only needed if a repository is supplied
   */
  constructor(
    logger: ILogger,
    repository?: S3.S3,
    options?: S3.S3ClientConfig,
  ) {
    super(logger);
    this.Options = this.ObjectOperations.IsNullOrEmpty(options)
      ? ({ region: 'us-east-1' } as S3.S3ClientConfig)
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        options!;
    this.Repository = repository || new S3.S3(this.Options);
  }

  public async CopyObjectAsync(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string,
  ): Promise<S3.CopyObjectOutput> {
    const action = `${S3Helper.name}.${this.CopyObjectAsync.name}`;
    this.LogHelper.LogInputs(action, {
      sourceBucket,
      sourceKey,
      destinationBucket,
      destinationKey,
    });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(sourceBucket)) {
      throw new Error(`[${action}]-Must supply sourceBucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(sourceKey)) {
      throw new Error(`[${action}]-Must supply sourceKey`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(destinationBucket)) {
      throw new Error(`[${action}]-Must supply destinationBucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(destinationKey)) {
      throw new Error(`[${action}]-Must supply destinationKey`);
    }

    // create params object
    const params: S3.CopyObjectRequest = {
      Bucket: destinationBucket,
      CopySource: `${sourceBucket}/${sourceKey}`,
      Key: destinationKey,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.copyObject(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async CreateBucketAsync(name: string): Promise<S3.CreateBucketOutput> {
    const action = `${S3Helper.name}.${this.CreateBucketAsync.name}`;
    this.LogHelper.LogInputs(action, { name });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(name)) {
      throw new Error(`[${action}]-Must supply name`);
    }

    // create params object
    const params: S3.CreateBucketRequest = {
      Bucket: name,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.createBucket(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async DeleteBucketAsync(name: string): Promise<any> {
    const action = `${S3Helper.name}.${this.DeleteBucketAsync.name}`;
    this.LogHelper.LogInputs(action, { name });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(name)) {
      throw new Error(`[${action}]-Must supply name`);
    }

    // create params object
    const params: S3.DeleteBucketRequest = {
      Bucket: name,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.deleteBucket(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async DeleteObjectAsync(
    bucket: string,
    key: string,
  ): Promise<S3.DeleteObjectOutput> {
    const action = `${S3Helper.name}.${this.DeleteObjectAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    // create params object
    const params: S3.DeleteObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.deleteObject(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async DeleteObjectsAsync(
    bucket: string,
    keys: string[],
  ): Promise<S3.DeleteObjectsOutput> {
    const action = `${S3Helper.name}.${this.DeleteObjectsAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, keys });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (!keys || keys.length === 0) {
      throw new Error(`[${action}]-Must supply at least one key`);
    }

    // create array of ObjectIdentifiers
    const keysArray: S3.ObjectIdentifier[] = [];
    for (const key of keys) {
      keysArray.push({ Key: key });
    }

    // create params object
    const params: S3.DeleteObjectsRequest = {
      Bucket: bucket,
      Delete: { Objects: keysArray },
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.deleteObjects(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async DeleteObjectTagsAsync(
    bucket: string,
    key: string,
  ): Promise<any> {
    const action = `${S3Helper.name}.${this.DeleteObjectTagsAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key });

    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params: S3.DeleteObjectTaggingRequest = {
      Bucket: bucket,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    const response = await this.Repository.deleteObjectTagging(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async GetBucketMetadataAsync(bucket: string): Promise<any> {
    const action = `${S3Helper.name}.${this.GetBucketMetadataAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }

    const params: S3.HeadBucketRequest = {
      Bucket: bucket,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.headBucket(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async GetObjectAsJsonAsync<T>(
    bucket: string,
    key: string,
  ): Promise<T> {
    const data = await this.GetObjectContentsAsync(bucket, key);

    const json = data ? data.toString() : '';

    return JSON.parse(json) as T;
  }

  public async GetObjectAsync(
    bucket: string,
    key: string,
  ): Promise<S3.GetObjectOutput> {
    const action = `${S3Helper.name}.${this.GetObjectAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    // create params object
    const params: S3.GetObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.getObject(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async GetObjectContentsAsync(
    bucket: string,
    key: string,
  ): Promise<Readable | undefined> {
    const data = (await this.GetObjectAsync(bucket, key)).Body;

    return data ? (data as Readable) : undefined;
  }

  public async GetObjectMetadataAsync(
    bucket: string,
    key: string,
  ): Promise<Metadata | undefined> {
    const action = `${S3Helper.name}.${this.GetObjectMetadataAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params: S3.HeadObjectRequest = {
      Bucket: bucket,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.headObject(params);
    this.LogHelper.LogResponse(action, response);

    return response.Metadata;
  }

  public async GetObjectTagsAsync(
    bucket: string,
    key: string,
  ): Promise<S3.Tag[]> {
    const action = `${S3Helper.name}.${this.GetObjectTagsAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params: S3.GetObjectTaggingRequest = {
      Bucket: bucket,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    const response = await this.Repository.getObjectTagging(params);
    this.LogHelper.LogResponse(action, response);

    return response.TagSet ?? ([] as S3.Tag[]);
  }

  public async GetSignedUrlDownload(
    bucket: string,
    key: string,
    timeoutInMinutes = 5,
  ): Promise<string> {
    const action = `${S3Helper.name}.${this.GetSignedUrlDownload.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, timeoutInMinutes });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params = {
      Bucket: bucket,
      Key: key,
    } as S3.GetObjectRequest;
    this.LogHelper.LogRequest(action, params);

    const client = new S3.S3Client(this.Options);

    const operation = new S3.GetObjectCommand(params);

    const response = await getSignedUrl(client, operation, {
      expiresIn: timeoutInMinutes * 60,
    });
    this.LogHelper.LogResponse(action, { response });

    return response;
  }

  public async GetSignedUrlUpload(
    bucket: string,
    key: string,
    timeoutInMinutes = 5,
    acl?: S3.ObjectCannedACL,
  ): Promise<string> {
    const action = `${S3Helper.name}.${this.GetSignedUrlUpload.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, acl, timeoutInMinutes });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params = {
      Bucket: bucket,
      Key: key,
      ACL: acl,
    } as S3.PutObjectRequest;
    this.LogHelper.LogRequest(action, params);

    const client = new S3.S3Client(this.Options);

    const operation = new S3.PutObjectCommand(params);

    const response = await getSignedUrl(client, operation, {
      expiresIn: timeoutInMinutes * 60,
    });
    this.LogHelper.LogResponse(action, { response });

    return response;
  }

  public async MoveObjectAsync(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string,
  ): Promise<void> {
    const copyResult = await this.CopyObjectAsync(
      sourceBucket,
      sourceKey,
      destinationBucket,
      destinationKey,
    );

    if (!this.ObjectOperations.IsNullOrEmpty(copyResult)) {
      await this.DeleteObjectAsync(sourceBucket, sourceKey);
    }
  }

  public async MultipartUploadCompleteAsync(
    bucket: string,
    key: string,
    uploadId: string,
  ): Promise<S3.CompleteMultipartUploadOutput> {
    const action = `${S3Helper.name}.${this.MultipartUploadCompleteAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, uploadId });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(uploadId)) {
      throw new Error(`[${action}]-Must supply uploadId`);
    }

    const params: S3.CompleteMultipartUploadRequest = {
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
    };
    this.LogHelper.LogRequest(action, params);

    const response = await this.Repository.completeMultipartUpload(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async MultipartUploadStartAsync(
    bucket: string,
    key: string,
    acl?: S3.ObjectCannedACL,
  ): Promise<S3.CreateMultipartUploadOutput> {
    const action = `${S3Helper.name}.${this.MultipartUploadStartAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, acl });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    const params: S3.CreateMultipartUploadRequest = {
      Bucket: bucket,
      Key: key,
      ACL: acl,
    };
    this.LogHelper.LogRequest(action, params);

    const response = await this.Repository.createMultipartUpload(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async MultipartUploadUploadPartAsync(
    bucket: string,
    key: string,
    uploadId: string,
    uploadPart: number,
    contents: string,
  ): Promise<S3.UploadPartOutput> {
    const action = `${S3Helper.name}.${this.MultipartUploadUploadPartAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, uploadId, uploadPart });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(uploadId)) {
      throw new Error(`[${action}]-Must supply uploadId`);
    }
    if (uploadPart === 0) {
      throw new Error(`[${action}]-Cannot be zero - uploadId`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(contents)) {
      throw new Error(`[${action}]-Must supply contents`);
    }

    const bytes = new TextEncoder().encode(contents);

    const tooSmall = bytes.length < 5000000;
    const tooLarge = bytes.length > 10000000000;

    if (tooSmall || tooLarge) {
      throw new Error(`[${action}]-Part size must be between 5 MB and 10 GB`);
    }

    const readable = new Readable();
    readable.push(contents);
    readable.push(null);

    const params: S3.UploadPartRequest = {
      Body: readable,
      Bucket: bucket,
      Key: key,
      PartNumber: uploadPart,
      UploadId: uploadId,
    };
    this.LogHelper.LogRequest(action, params);

    const response = await this.Repository.uploadPart(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async PutObjectAsync(
    bucket: string,
    key: string,
    contents: string | Readable,
    acl?: S3.ObjectCannedACL,
    encoding?: string,
  ): Promise<S3.PutObjectOutput> {
    const action = `${S3Helper.name}.${this.PutObjectAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, acl });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }

    // set defaults
    if (this.ObjectOperations.IsNullOrWhitespace(acl)) {
      // eslint-disable-next-line no-param-reassign
      acl = 'bucket-owner-full-control';
    }
    if (this.ObjectOperations.IsNullOrWhitespace(encoding)) {
      // eslint-disable-next-line no-param-reassign
      encoding = 'utf-8';
    }

    let body = new Readable();

    switch (typeof contents) {
      case 'undefined':
        throw new Error(`[${action}]-Must supply contents`);

      case 'string':
        body.push(contents);
        body.push(null);
        break;

      default:
        body = contents;
        break;
    }

    // create params object
    const params: S3.PutObjectRequest = {
      ACL: acl,
      Body: body,
      Bucket: bucket,
      ContentEncoding: encoding,
      Key: key,
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.putObject(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }

  public async SetObjectTagAsync(
    bucket: string,
    key: string,
    tagName: string,
    tagValue: string,
  ): Promise<S3.PutObjectTaggingOutput> {
    const action = `${S3Helper.name}.${this.SetObjectTagAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, tagName, tagValue });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(tagName)) {
      throw new Error(`[${action}]-Must supply tagName`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(tagValue)) {
      throw new Error(`[${action}]-Must supply tagValue`);
    }

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

  public async SetObjectTagsAsync(
    bucket: string,
    key: string,
    tags: S3.Tag[],
  ): Promise<S3.PutObjectTaggingOutput> {
    const action = `${S3Helper.name}.${this.SetObjectTagsAsync.name}`;
    this.LogHelper.LogInputs(action, { bucket, key, tags });

    // guard clauses
    if (this.ObjectOperations.IsNullOrWhitespace(bucket)) {
      throw new Error(`[${action}]-Must supply bucket`);
    }
    if (this.ObjectOperations.IsNullOrWhitespace(key)) {
      throw new Error(`[${action}]-Must supply key`);
    }
    if (this.ObjectOperations.IsNullOrEmpty(tags)) {
      throw new Error(`[${action}]-Must supply tags`);
    }

    const params: S3.PutObjectTaggingRequest = {
      Bucket: bucket,
      Key: key,
      Tagging: { TagSet: tags },
    };
    this.LogHelper.LogRequest(action, params);

    // make AWS call
    const response = await this.Repository.putObjectTagging(params);
    this.LogHelper.LogResponse(action, response);

    return response;
  }
}
