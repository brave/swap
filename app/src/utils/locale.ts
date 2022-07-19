// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import { locale } from '../constants/locale'

// ToDo: We need to implement locale in the project.
// Created this method to match what is in brave-core
// so it can easily used in components accross repos.
export const getLocale = (key: string): string => {
  return locale[key] || key
}
