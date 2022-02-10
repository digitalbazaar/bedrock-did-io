# bedrock-did-io ChangeLog

## 6.0.1 - 2022-02-xx

### Fixed
- Create `didIo` early before bedrock initializes, but update its internal
  cache during bedrock init. This approach allows the `didIo` symbol to be
  accessed (and even potentially used with a temporary cache) prior to
  bedrock initialization -- as a number of modules are presently doing. A
  future version should remove this and modules should update.

## 6.0.0 - 2022-02-10

### Changed
- **BREAKING**: Do not initialize internal `didIo` cache until bedrock is
  initializing.
- **BREAKING**: Configure `didIo` cache using bedrock config system. Set
  a higher default timeout of 5 min (old timeout was 5 seconds) on DID docs.
  Set a higher default cache size of 1k DID docs.

## 5.0.0 - 2022-01-11

### Changed
- **BREAKING**: Use did-veres-one `v14.0.0-beta.4`.

## 4.0.2 - 2021-08-23

### Changed
- Use did-veres-one `v14.0.0-beta.3`, with additional `fromNym` error logging.

## 4.0.1 - 2021-08-19

### Fixed
- Use fixed did-veres-one driver.

## 4.0.0 - 2021-07-10

### Changed
- **BREAKING**: Use did key driver 2.x.

## 3.0.0 - 2021-05-2

### Changed
- **BREAKING**: Use [did-veres-one@^14.0.0-beta.1](https://github.com/veres-one/did-veres-one/blob/v14.x/CHANGELOG.md).

## 2.0.0 - 2021-05-20

### Changed
- **BREAKING**: Use [did-veres-one@^14.0.0-beta.0](https://github.com/veres-one/did-veres-one/blob/v14.x/CHANGELOG.md).

## 1.0.0 - 2021-04-09

- See git history for changes.
