interface LangDataType {
  [key: string]: {
    name: string
    versionIndex: `${number}`
  }
}

const langData: LangDataType = {
  java: { name: 'Java', versionIndex: '4' },
  python2: { name: 'Python 2', versionIndex: '3' },
  python3: { name: 'Python 3', versionIndex: '4' },
  c: { name: 'C', versionIndex: '5' },
  cpp: { name: 'C++', versionIndex: '5' },
  cpp14: { name: 'C++ 14', versionIndex: '4' },
  cpp17: { name: 'C++ 17', versionIndex: '1' },
  go: { name: 'Go', versionIndex: '4' },
  rust: { name: 'Rust', versionIndex: '4' },
}

export default langData
