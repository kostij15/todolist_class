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

  //toArray
  test('todolist can be converted into an array', () => {
    let expectedArray = [todo1, todo2, todo3];

    expect(list.toArray()).toEqual(expectedArray);
  });

  //first
  test('first method provides the first todo in the todolist', () => {
    expect(list.first()).toEqual(todo1);
  });

  //last
  test('last method provides the most recent todo in the todolist', () => {
    expect(list.last()).toEqual(todo3);
  });

  //shift
  test('shift removes and returns the first item in the todolist', () => {
    //returns first item
    expect(list.shift()).toEqual(todo1);

    //removes first item
    expect(list.toArray()).toEqual([todo2, todo3]);
    expect(list.size()).toBe(2);
  });

  //pop
  test('pop method removes and returns the last item in the todolist', () => {
    //returns last item
    expect(list.pop()).toEqual(todo3);

    //removes last item
    expect(list.toArray()).toEqual([todo1, todo2]);
  });

  //isDone
  test('isDone method returns true when all items in list are marked done', () => {
    //all items not done
    expect(list.isDone()).toBe(false);
  });

  test('add method raises a TypeError when you attempt to add an item to a list and it isn\'t a todo object', () => {
    expect(() => list.push({ a: 1 })).toThrow(TypeError);
  });

  test('itemAt method returns the item correspodnign to where it is in the todolist', () => {
    //return correct item
    expect(list.itemAt(0)).toEqual(todo1);

    //raises ReferenceError if we specify an index with no element
    expect(() => list.itemAt(5)).toThrow(ReferenceError);
  });

  test('markDoneAt marks an item as completed. Raises ReferenceError', () => {
    list.markDoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(true);

    //Raises ReferenceError, if we specify an index with no element
    expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
  });

  test('markUndoneAt marks an item undone', () => {
    list.markDoneAt(0);
    list.markUndoneAt(0);
    expect(list.itemAt(0).isDone()).toBe(false);
  });

  test('markAllDone marks all items on list as completed', () => {
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('removeAt method removes an item from the todoList. Raises ReferenceError if the index does not exist', () => {
    list.removeAt(2);
    expect(list.toArray()).toEqual([todo1, todo2]);

    expect(() => list.removeAt(2)).toThrow(ReferenceError);

  });

  //toString part 1
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  //toString part 2
  test('toString returns string representation of list when item is done', () => {
    list.markDoneAt(1);
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  //toString part 3
  test('toString returns all strings marked off of list when all items are done', () => {
    list.markAllDone();
    let string = `---- Today's Todos ----\n[X] Buy milk\n[X] Clean room\n[X] Go to the gym`;

    expect(list.toString()).toBe(string);
  });

  //forEach
  test('forEach iterates over list. Doesn\'t return anything (undefined)', () => {
    let arr = [];
    list.forEach(item => arr.push(item));
    expect(arr).toEqual([todo1, todo2, todo3]);

    expect(list.forEach(item => item)).toBeUndefined();
  });

  //filter
  test('filter returns new TodoList object with filtered todos', () => {
    todo1.markDone();
    let newList = new TodoList(list.title);
    newList.add(todo1);

    expect(newList.title).toBe(list.title);

    let doneItems = list.filter(todo => todo.isDone());
    expect(doneItems.toString()).toBe(newList.toString());
  });
});