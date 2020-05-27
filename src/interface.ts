/**
 * S3 Helper interface
 */
export interface IS3Helper {
    /**
     * AWS Repository for S3
     */
    Repository: AWS.S3;

    /**
     * Copy an object from a source to a target
     * @param sourceBucket {string} Source bucket name
     * @param sourceKey {string} Source key
     * @param destinationBucket {string} Destination bucket name
     * @param destinationKey {string} Destination key
     */
    CopyObjectAsync(sourceBucket: string,
        sourceKey: string,
        destinationBucket: string,
        destinationKey: string): Promise<AWS.S3.CopyObjectOutput>;

    /**
     * Create a S3 bucket
     * @param name {string} Bucket name
     */
    CreateBucketAsync(name: string): Promise<AWS.S3.CreateBucketOutput>;

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
    DeleteObjectAsync(bucket: string,
        key: string): Promise<AWS.S3.DeleteObjectOutput>;

    /**
     * Delete multiple objects
     * @param bucket {string} Bucket name
     * @param keys {string[]} Array of object keys to delete
     */
    DeleteObjectsAsync(bucket: string,
        keys: string[]): Promise<AWS.S3.DeleteObjectsOutput>;

    /**
     * Get a JSON typed object from S3
     * @param bucket {string} Bucket to retrieve from
     * @param key {string} File prefix and name
     */
    GetObjectAsJsonAsync<T>(bucket: string,
        key: string): Promise<T>;

    /**
     * Get an object from S3
     * @param bucket {string} Bucket to retrieve from
     * @param key {string} File prefix and name
     */
    GetObjectAsync(bucket: string,
        key: string): Promise<AWS.S3.GetObjectOutput>;

    /**
     * Upload a file to S3 Bucket
     * @param bucket {string} Bucket to upload to
     * @param key {string} File prefix and name
     * @param body {string} File contents
     * @param acl {S3CannedACL} S3Canned ACL. Default is 'bucket-owner-full-control'
     * @param encoding {string} File encoding. Default is 'utf-8'
     * @returns Promise<string> - URL of uploaded file
     */
    PutObjectAsync(bucket: string,
        key: string,
        body: string | Buffer,
        acl?: AWS.S3.ObjectCannedACL,
        encoding?: string): Promise<AWS.S3.PutObjectOutput>;
}