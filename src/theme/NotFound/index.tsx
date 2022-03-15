/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import BrowserOnly from '@docusaurus/BrowserOnly'
import Layout from '@theme/Layout'
import React from 'react'
import styles from './NotFound.module.css'
import { useHistory } from 'react-router'

const NotFound = () => {
	const history = useHistory()

	return (
		<Layout title='Page Not Found'>
			<BrowserOnly fallback={<></>}>
				{() => {
					const Error404 =
						// eslint-disable-next-line @typescript-eslint/no-var-requires
						require('@dassana-io/web-components').Error404

					return (
						<div className={styles.wrapper}>
							<Error404 onBtnClick={() => history.push('/')} />
						</div>
					)
				}}
			</BrowserOnly>
		</Layout>
	)
}

export default NotFound
