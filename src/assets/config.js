import request from '@untils/request'

export function getClientUnitList (data) {
  return request({
    url: `/i/clientUnit/query.page`,
    method: 'post',
    data
  })
}
