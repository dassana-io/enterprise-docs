import BrowserOnly from '@docusaurus/BrowserOnly'
import React from 'react'
import styles from './index.module.css'

export default function Jummie() {
    return (
        <BrowserOnly fallback={<></>}>
            {() => {
                const Plausible =
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    require('@dassana-io/web-components').Plausible

                return (
                    <div className={styles.jummie}>
                        <Plausible />
                    </div>
                )
            }}
        </BrowserOnly>
    )
}
