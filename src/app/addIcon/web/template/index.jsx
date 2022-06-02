import React, { FC } from 'react'
require('./iconfont')

const IconFont = (props) => {
  const { type, className, style, size, color, title, ...rest } = props

  const styleMerged = {
    color,
    fontSize: size,
    ...style,
  }

  return (
    <i className={className} style={styleMerged} title={title} {...rest}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 1024 1024"
        focusable="false"
        style={{ fill: 'currentColor' }}
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: `<use xlink:href="#${type}"></use>` }}
      />
    </i>
  )
}

const Icon = (props) => {
  const { size, ...rest } = props
  return <IconFont {...rest} size={typeof size === 'number' ? size : undefined} />
}

export default Icon
