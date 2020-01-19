const fs = require('fs')
const path = require('path')

/**
 * @description エントリポイントとするディレクトリ一覧
 */
const entryDirections = ['src/ts/pages', 'src/scss/pages']

/**
 * @description エントリポイントと出力先ディレクトリの置換マップ
 */
const replacementDirectionsBase = [['js/pages'], ['css/pages']]
const replacementDirections = replacementDirectionsBase.map(
  ([replacementDirection], index) => [
    entryDirections[index],
    replacementDirection,
  ],
)

/**
 * @description エントリポイントから出力ファイル名に置換した文字列を返す
 * @param {string} dir
 * @returns {string}
 */
const replaceDirection = (dir) => {
  for (const [
    beforeReplacementDirection,
    afterReplacementDirection,
  ] of replacementDirections) {
    if (dir.includes(beforeReplacementDirection)) {
      return `${dir.replace(
        beforeReplacementDirection,
        afterReplacementDirection,
      )}/index`
    }
  }
}

/**
 * @description エントリポイントを含むか判定
 * @param {string} dir
 * @returns {boolean}
 */
const includesEntryDirection = (dir) =>
  entryDirections.some((entryDirection) => dir.startsWith(entryDirection))

/**
 * index.hoge か否か
 * @param {string} fullPath
 * @returns {boolean}
 */
const isIndex = (fullPath) => fullPath.includes('/index.')

/**
 * entry 登録用ファイルリストを取得し、オブジェクトで返す
 * @param {string} dir
 * @param {object} fileList - 初期実行時は不要
 * @returns {object} entry 登録用 object
 */
const getFileList = (dir, fileList = {}) => {
  const filenames = fs.readdirSync(dir)
  filenames.forEach((filename) => {
    const fullPath = path.join(dir, filename)
    const stats = fs.statSync(fullPath)
    if (stats.isFile() && includesEntryDirection(dir) && isIndex(fullPath)) {
      fileList[replaceDirection(dir)] = `./${fullPath}`
    } else if (stats.isDirectory()) {
      getFileList(fullPath, fileList)
    }
  })

  return fileList
}

module.exports = getFileList
