// Copyright (c) 2022 The Brave Authors. All rights reserved.
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this file,
// you can obtain one at http://mozilla.org/MPL/2.0/.

import React from 'react'
import styled from 'styled-components'

// Constants
import { BRAVE_SWAP_DATA_THEME_KEY } from '~/constants/magics'

// Styled Components
import { StyledDiv, StyledInput, StyledLabel } from '~/components/shared.styles'


export const ThemeSwitch = () => {
  // State
  const [isLightTheme, setIsLightTheme] = React.useState<boolean>(false)

  // Methods
  const toggleTheme = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLightTheme(event.target.checked)
    // Users local theme
    const userTheme = window.localStorage.getItem(BRAVE_SWAP_DATA_THEME_KEY)

    // The opposite of the browsers default theme
    const themeToChangeTo = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'light'
      : 'dark'

    // If the userTheme is null then the site will default the browsers pref,
    // so if user clicks the theme toggle, we set the userTheme for the first time.
    if (userTheme === null) {
      document.documentElement.setAttribute('data-theme', themeToChangeTo)
      window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, themeToChangeTo)
      return
    }

    // If userTheme is light, change to dark
    if (userTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark')
      window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, 'dark')
      return
    }

    // Default to light
    document.documentElement.setAttribute('data-theme', 'light')
    window.localStorage.setItem(BRAVE_SWAP_DATA_THEME_KEY, 'light')
  }, [])

  // Effect
  React.useEffect(() => {
    // The opposite of the browsers default theme
    const themeToChangeTo = window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'light'
      : 'dark'

    // Users local theme
    const userTheme = window.localStorage.getItem(BRAVE_SWAP_DATA_THEME_KEY)

    if (userTheme === null) {
      if (themeToChangeTo === 'light') {
        setIsLightTheme(true)
        return
      }
      if (themeToChangeTo === 'dark') {
        setIsLightTheme(false)
        return
      }
    }
    // If userTheme is light, change to dark
    if (userTheme === 'light') {
      setIsLightTheme(true)
      return
    }
    setIsLightTheme(false)
  }, [])

  return (
    <Label>
      <Input checked={isLightTheme} type='checkbox' onChange={toggleTheme} />
      <Switch>
        <SwitchIcon />
      </Switch>
    </Label>
  )
}

const Label = styled(StyledLabel)`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  bottom: 24px;
  right: 24px;
`

const Switch = styled(StyledDiv)`
  position: relative;
  box-sizing: border-box;
  width: 56px;
  height: 32px;
  background: var(--standard-switch-unchecked-background);
  border-radius: 32px;
  padding: 2px;
  transition: 300ms all;
  --icon-position: 10px;

  &:before {
    transition: 300ms all;
    content: '';
    position: absolute;
    box-sizing: border-box;
    width: 28px;
    height: 28px;
    border-radius: 35px;
    top: 50%;
    left: 3px;
    background: ${(p) => p.theme.color.legacy.background01};
    transform: translate(0, -50%);
  }
`

const Input = styled(StyledInput)`
  display: none;

  &:checked + ${Switch} {
    background: var(--standard-switch-button-checked-background);
    --icon-position: 32px;
    &:before {
      transform: translate(22px, -50%);
      background: ${(p) => p.theme.color.legacy.background01};
    }
  }
`

const SwitchIcon = styled(StyledDiv)`
  position: absolute;
  width: 14px;
  height: 14px;
  background-image: var(--theme-button-icon);
  background-size: cover;
  left: var(--icon-position);
  transition: 300ms all;
`
