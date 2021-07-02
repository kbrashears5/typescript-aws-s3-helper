<h1 align="center">typescript-aws-s3-helper</h1>

<div align="center">
    
<b>Typescript helper functions for AWS S3 service</b>
    
[![CI/CD](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/kbrashears5/typescript-aws-s3-helper/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/kbrashears5/typescript-aws-s3-helper/branch/master/graph/badge.svg?token=6VXT4QLN5U)](https://codecov.io/gh/kbrashears5/typescript-aws-s3-helper)
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
import * as S3 from '@aws-sdk/client-s3';

const logger = new Logger(LogLevel.Trace);

const options: S3.S3ClientConfig = {
  accessKeyId: '{access_key}',
  secretAccessKey: '{secret_key}',
  region: 'us-east-1',
};

const repository = new S3.S3(options);

const helper = new S3Helper(logger, repository);

const response = await helper.CreateBucketAsync('name');
```

## Notes

If no options are supplied, will default to `us-east-1` as the region

## Development

Clone the latest and run

```npm
npm run prep
```

to install packages and prep the git hooks
