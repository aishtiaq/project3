const data = {
    tasks: {
      'task-1': {id: 'task-1', name: 'Task1', status: 'New'},
      'task-2': {id: 'task-2', name: 'Task2', status: 'New'},
      'task-3': {id: 'task-3', name: 'Task3', status: 'In Progress'},
      'task-4': {id: 'task-4', name: 'Task4', status: 'In Progress'},
      'task-5': {id: 'task-5', name: 'Task5', status: 'New'},
      'task-6': {id: 'task-6', name: 'Task6', status: 'New'},
      'task-7': {id: 'task-7', name: 'Task7', status: 'Done'},
      'task-8': {id: 'task-8', name: 'Task8', status: 'New'},
      'task-9': {id: 'task-9', name: 'Task9', status: 'New'},
      'task-10': {id: 'task-10', name: 'Task10', status: 'Done'}
    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: "New",
        taskId: ['task-1','task-2','task-3','task-4','task-5','task-6','task-7','task-8','task-9','task-10']
      },
      'column-2': {
        id: 'column-2',
        title: 'In Progress',
        taskId: [],
      },
      'column-3': {
        id: 'column-3',
        title: 'Done',
        taskId: [],
      }
    },
    columnsort: ['column-1', 'column-2', 'column-3']
  }
  export default data;