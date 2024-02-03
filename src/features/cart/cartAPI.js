import axios from 'axios'
export function fetchItems() {
  return axios.get('http://localhost:8080/cart')
}
export function addItem(item) {
  console.log(item)
  return axios.post('http://localhost:8080/cart',item)
}
export function updateItem(obj) {
  console.log(obj)
  return axios.patch(`http://localhost:8080/cart/${obj.id}`,obj)
}
export function deleteItem(id) {
  console.log(id);
  return axios.delete(`http://localhost:8080/cart/${id}`)
}

