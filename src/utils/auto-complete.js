import * as autocomplete from '../assets/autocomplete.json'

const data = autocomplete.data.map((item, index) => ({ ...item, id: index }))

const getSuggestions = keyword => {
  return data.filter(item =>
    item.madde.startsWith(keyword.toLocaleLowerCase('tr')),
  )
}

export { getSuggestions }
