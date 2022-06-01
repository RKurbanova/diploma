import React from 'react'
import { Tooltip } from 'antd'
import { InfoCircleFilled } from '@ant-design/icons'

import './styles.css'

function LabelWithTip({ label, tip, className, dataQa }) {
  return (
    <>
      <span
        className="label-kek"
        data-qa={dataQa}
      >
        {label}
      </span>
      <Tooltip
        title={tip}
        placement='topRight'
      >
        <InfoCircleFilled className="iconInfo-kek" />
      </Tooltip>
    </>
  )
}

export default LabelWithTip
