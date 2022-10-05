# Brave Swap

[![npm version](https://badge.fury.io/js/@brave%2Fswap.svg)](https://badge.fury.io/js/@brave%2Fswap)
![build](https://github.com/brave/swap/actions/workflows/build.yml/badge.svg)

An open-source swap interface by Brave, focussed on usability and multi-chain
support.

## Project structure

```
├── interface
│
├── sites
│   ├── mock
│   ├── bravedotcom
```

The project consists of three top-level directories:
1. `interface` ⮕ library implementing the UI, and swap hooks.
2. `sites` ⮕ full-blown applications that use the `interface` library.

# Development

Since `interface` is a library, it cannot be run as a standalone application.
We have therefore created a `sites/mock` application that can be used for local
development. Please follow these instructions to setup a development environment
with hot reloading. 

```shell
$ cd swap/interface
$ npm install
$ npm run dev
```

In another tab:
```shell
$ cd swap/sites/mock
$ npm install
$ npm start
```
