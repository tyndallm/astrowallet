# Astrowallet API client

> This right here is astronomical...

## Overview

Astrowallet is a Slack based Ethereum wallet. Users within a Slack organization can create and interact with their wallet through the use of Slack commands.

Astrowallet is currently configured to use Ropsten testnet.

## Commands

```
/astrowallet create
```
Create a wallet tied to the slackId of the current user

```
/astrowallet send [@username] [amount] [tokenSymbol]
```
ex:
```
/astrowallet send @user 0.01 ETH
```

Send a transaction from the current user's wallet to @username's wallet. If @username does not currently have a wallet, the API will create one on their behalf. (Currently only supports sending ETH)

```
/astrowallet balance
```
Get current user's wallet balance (currently only supports ETH)

## Security Concerns

### Note: astrowallet private keys are currently stored in plain-text in MongoDB

Astrowallet accounts are not intended to be high-value wallets and should not be used to hodl any amount you are not afraid to lose! 

The astrowallet API only responds to Slack originated messages and verifies all incoming request signatures to prevent any outsider from making requests posing as different users. That being said this is mostly a proof-of-concept so user beware.

# Requirements
- NodeJS
- MongoDB for storing user/wallet info
- Infura API key
- Slack App with Slash Command pointing to API url, App secret for verifying slack messages, and OAuth access token 

## Future Roadmap

- Support ERC20 tokens
- Support ERC721 tokens (NFTs)
- Automatic funding of new wallets (so users can send tx's)
- Create Slackbot to notify users of incoming tx's
