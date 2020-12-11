"use strict";
const Todo = require("./todo");

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      throw TypeError('can only add Todo objects');
    }

    this.todos.push(todo);
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }

  _validateIndex(index) {
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  markDoneAt(index) {
    this._validateIndex(index);

    this.itemAt(index).markDone();
  }

  markUndoneAt(index) {
    this._validateIndex(index);

    this.itemAt(index).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.isDone());
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    this._validateIndex(index);

    return this.todos.splice(index, 1);
  }

  toString() {
    return this.todos.reduce((todoString, todo) => todoString += `\n${String(todo)}`, `---- ${this.title} ----`);
  }

  forEach(callback) {
    this.todos.forEach(callback);
  }

  filter(callback) {
    let todoList = new TodoList(this.title);

    for (let index = 0; index < this.size(); index++) {
      if (callback(this.todos[index])) {
        todoList.add(this.todos[index]);
      }
    }

    return todoList;
  }

  findByTitle(title) {
    return this.todos.filter(todo => todo.getTitle() === title).first();
  }

  allDone() {
    return this.filter(todo => todo.isDone());
  }

  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }

  markDone(title) {
    let firstTodo = this.findByTitle(title);

    if (firstTodo) {
      firstTodo.markDone();
    }
  }

  markAllDone() {
    this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;
// // Omitted code
// let list = new TodoList("Today's Todos");
// // console.log(list);

// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");

// // list.add(todo1);
// // list.add(todo2);
// // list.add(todo3);
// // list.add(todo4);
// // console.log(list);

// // console.log(list.size());  // 4

// // console.log(list.first());
// // console.log(list.last());

// let emptyList = new TodoList("Empty List");
// // console.log(emptyList.first());
// // console.log(emptyList.last());

// // console.log(list.itemAt(1));
// // console.log(list.itemAt(55)); // delete this line after testing it

// // list.markDoneAt(1);
// // console.log(list);

// // list.markUndoneAt(1);
// // console.log(list);

// // console.log(list.isDone()); // false

// // list.markDoneAt(0);
// // list.markDoneAt(1);
// // list.markDoneAt(2);
// // list.markDoneAt(3);
// // console.log(list.isDone()); // true

// // list.markUndoneAt(2);
// // console.log(list.isDone()); // false

// // console.log(list.shift());
// // console.log(list.pop());
// // console.log(list);

// // console.log(emptyList.shift());
// // console.log(emptyList.pop());
// // console.log(emptyList);

// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// // list.add(todo5);
// // list.add(todo6);
// // console.log(list);

// // console.log(list.removeAt(2));
// // console.log(list.removeAt(0));
// // console.log(list.removeAt(1));
// // console.log(list);

// // list.removeAt(100);

// list.add(todo1);
// list.add(todo2);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// console.log(`${list}`);

// Omitted code

let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

// list.forEach(todo => console.log(todo.toString()));
todo1.markDone();
todo5.markDone();

console.log(list.todos);

list.markAllDone();
list.markAllUndone();

let newArray = list.toArr

// list.markDone('return');
// console.log(todo2)
// console.log(doneTodos);