// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

// Imported images can either be strings or objects based on image loader
// being used internally. For example, in case of NextJS, it is an object
// with the URL in the "src" field.
export function getImageURL (stringOrObject: string | { src: string }) {
  return typeof stringOrObject === 'string' ? stringOrObject : stringOrObject.src
}
