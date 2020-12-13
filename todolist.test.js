const Todo = require('./todo');
const TodoList = require('./todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('calling toArray returns the todo list in array format', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('calling first returns the first todo on the list', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('calling last returns the last todo on the list', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('calling shift removes and returns the first item in the list', () => {
    let shiftedTodo = list.shift();
    expect(shiftedTodo).toEqual(todo1);
    expect(list.toArray()).toEqual([todo2, todo3]);
  });

  test('calling pop removes and returns the last item in the list', () => {
    let shiftedTodo = list.pop();
    expect(shiftedTodo).toEqual(todo3);
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  test('calling isDone returns true when all items in the list are done, false otherwise', () => {
    let notDoneList = list.allNotDone();
    expect(list.isDone()).toBe(false);

    let doneList = list.allDone();
    expect(doneList.isDone()).toBe(true);
  });

  test("adding an object that isn't TOdo will result in a TypeError raised", () => {
    expect(() => list.add({})).toThrow(TypeError);
  });

  test("calling itemAt returns the item at the index specified and returns a ReferenceError if it doesn't exist", () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
    expect(list.itemAt(1)).toEqual(todo2);
  });

  test("calling markDoneAt sets the todo specified at the index passed as done. Throws a ReferenceError if that index passed doesn't exist", () => {
    list.markDoneAt(0);
    list.markDoneAt(2);
    expect(list.itemAt(0).isDone()).toBe(true);
    expect(list.itemAt(1).isDone()).toBe(false);
    expect(list.itemAt(2).isDone()).toBe(true);

    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });

  test("calling markUnDoneAt sets the todo specified at the index passed undone. Throws a ReferenceError if that index passed doesn't exist", () => {
    list.markDoneAt(0);
    list.markUndoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(false);

    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError)
  });

  test('calling markAllDone returns true when all items in the list are done, false otherwise', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('calling removeAt removes the element of the index passed. Raises a ReferenceError if the index does\'nt exist', () => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);

    list.removeAt(0);
    expect(list.itemAt(0)).toEqual(todo2);
    expect(list.itemAt(1)).toEqual(todo3);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;
    list.markDoneAt(1);

    expect(list.toString()).toBe(string);
  });

  test(`toString returns string representation of the list`, () => {
    let string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;
    list.markAllDone();

    expect(list.toString()).toBe(string);
  });

  test("forEach iterates over the elements in list but should return undefined", () => {
    let arr = []
    list.forEach(elem => arr.push(elem));

    expect(list.forEach(elem => elem)).toBeUndefined();
    expect(arr).toEqual([todo1, todo2, todo3]);
  });

  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });

});