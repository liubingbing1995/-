/* eslint-disable */
require('script-loader!file-saver');
import JSZip from 'jszip'
import {parseTime} from '@/utils/index'

export function exportFiles2Zip(files, zipName) {
  const zip = new JSZip()
  const zip_name = zipName || parseTime(new Date(),'{y}{m}{d}{h}{i}{s}{M}')
  let fileIndex = 1
  for (const file of files) {
    zip.file(fileIndex + '-' + file.name, file.data)
    fileIndex += 1
  }
  zip.generateAsync({type: "blob"}).then((blob) => {
    saveAs(blob, `${zip_name}.zip`)
  }, (err) => {
    alert('导出失败:' + err)
  })
}
