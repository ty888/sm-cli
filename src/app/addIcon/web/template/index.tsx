import React, { FC } from 'react'
require('./iconfont')

export interface IconFontProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: string
  color?: string
  size?: number
  title?: string
}

export interface AppIconProps extends React.HTMLAttributes<HTMLDivElement>, IconFontProps {
  id?: string
}

const IconFont: FC<IconFontProps> = (props) => {
  const { type, className, style, size, color, title, ...rest } = props

  const styleMerged: React.CSSProperties = {
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

const Icon: FC<AppIconProps> = (props) => {
  const { size, ...rest } = props
  return <IconFont {...rest} size={typeof size === 'number' ? size : undefined} />
}

export default Icon
