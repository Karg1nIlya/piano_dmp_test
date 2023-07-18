/** @typedef {"waiting"| "in_progress"| "done"} TaskStatus */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} name
 * @property {TaskStatus} status
 */

/**
 * @typedef {Object} TaskReadResponse
 * @property {Task[]} tasks
 */

/**
 * @typedef {Object} TaskUpdateRequest
 * @property {string} id
 * @property {TaskStatus} status
 */

/**
 * @typedef {Object} Api
 * @property {()=> PromiseLike<TaskReadResponse>} read
 * @property {(task: TaskUpdateRequest)=> PromiseLike<Task>}  update
 */

/** @type {TaskStatus[]}*/
const taskStatuses = ["waiting", "in_progress", "done"];

/**
 * @param {number} index
 * @returns {Task}
 */
const createTask = (index) => ({
  id: `t${index}`,
  name: `Task name ${index + 1}`,
  status: taskStatuses[index % taskStatuses.length],
});

/**@type {Api} */
const api = (() => {
  let state = new Array(10).fill(null).map((_, i) => createTask(i));

  const read = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({ tasks: state.map((task) => ({ ...task })) });
      }, 1000);
    });

  /**
   * @param {Task} updatedTask
   * @returns {string | undefined}
   */
  const validate = (updatedTask, initialTask) => {
    if (!initialTask) {
      return `Task with id:${updatedTask.id} doesn't exist`;
    }

    if (
      !Object.keys(updatedTask).every((key) =>
        ["id", "name", "status"].includes(key)
      )
    ) {
      return 'Task should contain only ["id", "name", "status"] fields';
    }

    if (!taskStatuses.includes(updatedTask.status)) {
      return `status should be one of [${taskStatuses.join()}]`;
    }

    if (initialTask.status === "waiting" && updatedTask.status === "done") {
      return 'Task can\'t be moved from "waiting" to "done"';
    }

    return undefined;
  };

  /**
   * @param {TaskUpdateRequest} updatedTask
   * @returns {PromiseLike<Task>}
   */
  const update = (updatedTask) => {
    const initialTask = state.find((t) => t.id === updatedTask.id);

    const error = validate(updatedTask, initialTask);

    if (error) {
      return Promise.reject({ error, id: updatedTask.id });
    }

    initialTask.status = updatedTask.status;

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(initialTask);
      }, 2000);
    });
  };

  return { read, update };
})();

export default api;
