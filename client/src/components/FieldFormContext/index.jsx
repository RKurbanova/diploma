import React, { useCallback } from 'react'
import classNames from 'classnames'
import { Form } from 'antd'
import { useFormikContext } from 'formik'

import LabelWithTip from './label'

const FormItem = Form.Item

function FieldFormikContext({
  id,
  tip,
  name,
  label,
  colon,
  extra,
  noValue,
  showHelp,
  tooltip,
  children,
  errorDataQa,
  renderComponent,
  wrapperClassName,
  wrapperDataQa,
  nonVerboseEvent,
  valuePropName,
  replaceEmptyString,
  onChange,
  emptyStringReplacement,
  htmlFor = id,
  required,
  ...props
}) {
  const {
    values,
    touched,
    errors,
    setFieldValue,
    setFieldTouched,
    isSubmitting,
  } = useFormikContext()

  const hasError = (touched?.[name]) && (errors?.[name])
  const valueProp = valuePropName ? valuePropName : 'value'
  const error = errors?.[name]
  const Component = renderComponent
  const handleBlur = useCallback(() => setFieldTouched(`['${name}']`), [setFieldTouched, name])

  const handleChange = useCallback(
    async (event = null) => {
      const value = nonVerboseEvent ? event : event?.target?.[valueProp]
      const processedValue = replaceEmptyString && !value ? emptyStringReplacement : value

      await setFieldValue(`['${name}']`, processedValue)
      setFieldTouched(`['${name}']`)
    },
    [
      setFieldValue,
      setFieldTouched,
      name,
      nonVerboseEvent,
      valueProp,
      replaceEmptyString,
      emptyStringReplacement,
    ]
  )

  const preparedProps = {
    disabled: isSubmitting,
    onBlur: handleBlur,
    onChange: onChange || handleChange,
    [valueProp]: values?.[name],
    id,
  }

  const displayLabel = tip ? (
    <LabelWithTip
      tip={tip}
      label={label}
    />
  ) : label

  if (noValue) {
    delete preparedProps.value
  }

  return (
    <FormItem
      help={
        showHelp && hasError ? (
          <div
            data-qa={errorDataQa}
          >
            {error}
          </div>
        ) : undefined
      }
      tooltip={tooltip}
      validateStatus={hasError ? 'error' : undefined}
      label={displayLabel}
      colon={colon}
      className={classNames(wrapperClassName)}
      htmlFor={htmlFor}
      data-qa={wrapperDataQa}
      extra={extra}
      valuePropName={valuePropName}
      required={required}
    >
      {children
        ? React.cloneElement(children, {
          ...children.props,
          ...preparedProps,
        })
        : (
          <Component
            {...preparedProps}
            {...props}
          />
        )}
    </FormItem>
  )
}

FieldFormikContext.defaultProps = {
  renderComponent: 'input',
  showHelp: true,
  colon: true,
}

export default FieldFormikContext
