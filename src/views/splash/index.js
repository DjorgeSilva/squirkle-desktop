// @flow

// ==================================================================================
// Window - Splash
// ==================================================================================

// ==================================================================================
// General Imports
// ==================================================================================
import React, { useEffect, memo } from 'react'
import { isEqual } from 'lodash-es'
import useIpc from '@atomos/atomizer-desktop/client/hooks/useIpc'
// ==================================================================================


// ==================================================================================
// Style Imports
// ==================================================================================
import styles from './styles.module.css'
// ==================================================================================


// ==================================================================================
// Type Imports
// ==================================================================================
import type { RootStoreType } from '../../stores/root'
// ==================================================================================


// ==================================================================================
// Asset Imports
// ==================================================================================
import splashLogo from '../../assets/images/splashLogo.png'
// ==================================================================================


// ==================================================================================
// Store Imports
// ==================================================================================
import useRootStore from '../../hooks/useRootStore'
// ==================================================================================


// ==================================================================================
// Window Default Values
// ==================================================================================
const DISPLAY_TIME = 3000
// ==================================================================================


// ==================================================================================
// Window Type Definitions
// ==================================================================================
type RequiredPropTypes = {}
type OptionalPropTypes = {}

export type PropTypes = RequiredPropTypes & OptionalPropTypes
// ==================================================================================

const SplashView = (props: PropTypes): React$Element<*> => {
  const [, openWindow] = useIpc('windowController', 'open-window', false)
  const [, hideWindow] = useIpc('windowController', 'hide-window', false)

  const rootStore: RootStoreType = useRootStore()
  const loadTasks = rootStore.loadAllTasks
  const version = rootStore.version

  useEffect(() => {
    setTimeout(() => {
      console.log('executing timeout')
      hideWindow({ message: 'splashWindow' })
      openWindow({ message: 'mainWindow' })
    }, DISPLAY_TIME)
  }, [openWindow, hideWindow])

  console.log('Faking loading tasks')
  loadTasks()

  return (
    <div className={styles.splashViewContainer}>
      <div className={ styles.splashLogoContainer }>
        <img src={ splashLogo } alt='' />
      </div>
      <div className={ styles.version }>
        { `Version ${version} by Firefly & Friends` }
      </div>
    </div>
  )
}

export default memo<PropTypes>(SplashView, isEqual)
