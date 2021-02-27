import * as S3 from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { Metadata } from './any';

/**
 * S3 Helper interface
 */
export interface IS3Helper {
  /**
   * Copy an object from source to target
   * @param sourceBucket {string} Source bucket name
   * @param sourceKey {string} Source key
   * @param destinationBucket {string} Destination bucket name
   * @param destinationKey {string} Destination key
   */
  CopyObjectAsync(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string,
  ): Promise<S3.CopyObjectOutput>;

  /**
   * Create a S3 bucket
   * @param name {string} Bucket name
   */
  CreateBucketAsync(name: string): Promise<S3.CreateBucketOutput>;

  /**
   * Delete a S3 bucket
   * @param name {string} Bucket name
   */
  DeleteBucketAsync(name: string): Promise<object>;

  /**
   * Delete an object
   * @param bucket {string} Bucket name
   * @param key {string} Object key to delete
   */
  DeleteObjectAsync(
    bucket: string,
    key: string,
  ): Promise<S3.DeleteObjectOutput>;

  /**
   * Delete multiple objects
   * @param bucket {string} Bucket name
   * @param keys {string[]} Array of object keys to delete
   */
  DeleteObjectsAsync(
    bucket: string,
    keys: string[],
  ): Promise<S3.DeleteObjectsOutput>;

  /**
   * Delete all the object tags off of an object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   */
  DeleteObjectTagsAsync(bucket: string, key: string): Promise<object>;

  /**
   * Get metadata about a bucket
   * @param bucket {string} Bucket
   */
  GetBucketMetadataAsync(bucket: string): Promise<object>;

  /**
   * Get a JSON typed object from S3
   * @param bucket {string} Bucket to retrieve from
   * @param key {string} File prefix and name
   */
  GetObjectAsJsonAsync<T>(bucket: string, key: string): Promise<T>;

  /**
   * Get an object from S3
   * @param bucket {string} Bucket to retrieve from
   * @param key {string} File prefix and name
   */
  GetObjectAsync(bucket: string, key: string): Promise<S3.GetObjectOutput>;

  /**
   * Get the contents of an S3 object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   */
  GetObjectContentsAsync(
    bucket: string,
    key: string,
  ): Promise<Readable | undefined>;

  /**
   * Get metadata about an object
   * @param bucket {string} Bucket
   * @param key  {string} Object key
   */
  GetObjectMetadataAsync(
    bucket: string,
    key: string,
  ): Promise<Metadata | undefined>;

  /**
   * Gets the tags for an object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   */
  GetObjectTagsAsync(bucket: string, key: string): Promise<S3.Tag[]>;

  /**
   * Get a signed url to download from
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param timeoutInMinutes {number} Timeout for the signed url
   */
  GetSignedUrlDownload(
    bucket: string,
    key: string,
    timeoutInMinutes: number,
  ): Promise<string>;

  /**
   * Get a signed url to upload to
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param acl {S3.ObjectCannedACL} ACL of file
   * @param timeoutInMinutes {number} Timeout for the signed url
   */
  GetSignedUrlUpload(
    bucket: string,
    key: string,
    timeoutInMinutes: number,
    acl?: S3.ObjectCannedACL,
  ): Promise<string>;

  /**
   * Move an object within a bucket or to a different bucket
   * @param sourceBucket {string} Source bucket name
   * @param sourceKey {string} Source object key
   * @param destinationBucket {string} Destination bucket name
   * @param destinationKey {string} Destination object key
   */
  MoveObjectAsync(
    sourceBucket: string,
    sourceKey: string,
    destinationBucket: string,
    destinationKey: string,
  ): Promise<void>;

  /**
   * Mark the multipart upload as complete
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param uploadId {string} The UploadId of the multipart object
   */
  MultipartUploadCompleteAsync(
    bucket: string,
    key: string,
    uploadId: string,
  ): Promise<S3.CompleteMultipartUploadOutput>;

  /**
   * Start the multipart upload
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param acl {S3.ObjectCannedACL} ACL Permissions
   */
  MultipartUploadStartAsync(
    bucket: string,
    key: string,
    acl?: S3.ObjectCannedACL,
  ): Promise<S3.CreateMultipartUploadOutput>;

  /**
   * Upload a part to a S3 multipart object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param uploadId {string} The UploadId for the multipart object to add to
   * @param uploadPart {number} Part number of the part being uploaded
   * @param contents {string} Contents to upload
   */
  MultipartUploadUploadPartAsync(
    bucket: string,
    key: string,
    uploadId: string,
    uploadPart: number,
    contents: string,
  ): Promise<S3.UploadPartOutput>;

  /**
   * Upload an object to S3
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param contents {string} Object contents
   * @param acl {S3CannedACL} ACL permissions. Default is 'bucket-owner-full-control'
   * @param encoding {string} Text encoding. Default is 'utf-8'
   */
  PutObjectAsync(
    bucket: string,
    key: string,
    contents: string | Readable,
    acl?: S3.ObjectCannedACL,
    encoding?: string,
  ): Promise<S3.PutObjectOutput>;

  /**
   * Inserts or updates a tag on an object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param tagName {string} Tag name
   * @param tagValue {string} Tag value
   */
  SetObjectTagAsync(
    bucket: string,
    key: string,
    tagName: string,
    tagValue: string,
  ): Promise<S3.PutObjectTaggingOutput>;

  /**
   * Sets the tags on an object
   * @param bucket {string} Bucket name
   * @param key {string} Object key
   * @param tags {S3.TagSet} Tags
   */
  SetObjectTagsAsync(
    bucket: string,
    key: string,
    tags: S3.Tag[],
  ): Promise<S3.PutObjectTaggingOutput>;
}
