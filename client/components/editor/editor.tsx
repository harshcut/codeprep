import * as React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'
import { xcodeDark } from '@uiw/codemirror-theme-xcode'

export const Editor = () => {
  return (
    <CodeMirror extensions={[cpp()]} theme={xcodeDark} height="100%" style={{ height: '100%' }} />
  )
}
