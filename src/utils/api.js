const BASE_URL = 'https://sozluk.gov.tr'

const getHomeData = async () => {
  const response = await fetch(`${BASE_URL}/icerik`)
  const pure = await response.json()
  return await pure
}

const getDetailData = async k => {
  const response = await fetch(`${BASE_URL}/gts?ara=${k}`)
  const data = await response.json()
  return await data
}

const getSoundCode = async k => {
  const response = await fetch(`${BASE_URL}/yazim?ara=${k}`)
  const data = await response.json()
  return await data
}

export { getDetailData, getHomeData, getSoundCode }
