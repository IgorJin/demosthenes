import {apiPrefix} from '../config.json'
const fetcData = async (url, data) => {
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
          return fetcData(`${apiPrefix}/tasks/`)
        },
      deleteTask({ id }) {
          return fetcData(`${apiPrefix}/tasks/delete/${id}`)
        },
      updateTask({ id, data }) {
          return fetcData(`${apiPrefix}/tasks/edit/${id}`, data)
        },
      createTask({ id, data }) {
          return fetcData(`${apiPrefix}/tasks/add/${id}`, data)
        },
  };