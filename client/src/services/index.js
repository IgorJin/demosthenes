import {apiPrefix} from '../config.json'
const fetchData = async (url, data) => {
    let method = data ? 'POST' : 'GET'
    try {
        const response = await fetch(url, {
          method: method,
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        return response
      } catch (error) {
        console.error('Ошибка:', error);
      }
} 
export default {
      getTask()  {
          return fetchData(`${apiPrefix}/tasks/`)
        },
      deleteTask({ id }) {
          return fetchData(`${apiPrefix}/tasks/delete/${id}`)
        },
      updateTask({ id, data }) {
          return fetchData(`${apiPrefix}/tasks/edit/${id}`, data)
        },
      createTask({ id, data }) {
          return fetchData(`${apiPrefix}/tasks/add/${id}`, data)
        },
  };