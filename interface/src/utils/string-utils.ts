// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

export const isValidIconExtension = (url?: string) =>
  url?.endsWith('.jpg') || url?.endsWith('.jpeg') || url?.endsWith('.png') || url?.endsWith('.svg') || url?.endsWith('.gif')
