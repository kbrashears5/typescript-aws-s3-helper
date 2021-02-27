<h1 align="center">typescript-aws-s3-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS S3 service</b>
    
[![Build Status](https://dev.azure.com/kbrashears5/github/_apis/build/status/kbrashears5.typescript-aws-s3-helper?branchName=master)](https://dev.azure.com/kbrashears5/github/_build/latest?definitionId=10&branchName=master)
[![Tests](https://img.shields.io/azure-devops/tests/kbrashears5/github/10)](https://img.shields.io/azure-devops/tests/kbrashears5/github/10)
[![Code Coverage](https://img.shields.io/azure-devops/coverage/kbrashears5/github/10)](https://img.shields.io/azure-devops/coverage/kbrashears5/github/10)

[![NPM Version](https://img.shields.io/npm/v/typescript-aws-s3-helper)](https://img.shields.io/npm/v/typescript-aws-s3-helper)
[![Downloads](https://img.shields.io/npm/dt/typescript-aws-s3-helper)](https://img.shields.io/npm/dt/typescript-aws-s3-helper)

</div>

## Install

```
npm install typescript-aws-s3-helper@latest
```

## Usage

### Default - running in Lambda in your own account

```typescript
const logger = new Logger(LogLevel.Trace);

const helper = new S3Helper(logger);

const response = await helper.CreateBucketAsync('name');
```

### Running in separate account or not in Lambda

```typescript
const logger = new Logger(LogLevel.Trace);

const options: AWS.S3.ClientConfiguration = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new AWS.S3(options);

const helper = new S3Helper(logger, repository);

const response = await helper.CreateBucketAsync('name');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region
