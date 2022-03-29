(()=>{
  'use strict';

  class BookStore {
    constructor() {
      this.books = {};
    }

    addEmpty() {
      for (let i = 0; ; i += 1) {
        if (!(i in this.books)) {
          this.books[i] = {
            author: '',
            title: '',
          };
          return i;
        }
      }
    }

    save(rowID, values) {
      if (rowID in this.books) {
        this.books[rowID] = values;
      }
      return false;
    }

    get(rowID) {
      if (rowID in this.books) {
        return this.books[rowID];
      }
      return false;
    }

    remove(rowID) {
      if (rowID in this.books) {
        delete this.books[rowID];
      }
    }
  }

  class Interface {
    constructor(table, button) {
      this.table = table.querySelector('tbody') ?? table;
      this.button = button;
      this.bookstore = new BookStore();

      this.button.addEventListener('click', () => { this.addEmpty(); });
    }

    createStructure(struct, parent = null) {
      return struct.map((c) => {
        const elem = document.createElement(c.tag);
        ('parent' in c ? c.parent : parent).appendChild(elem);
        if ('dataset' in c) {
          for (const key in c.dataset) {
            elem.dataset[key] = c.dataset[key];
          }
        }
        if ('classes' in c) {
          c.classes.forEach((cl) => elem.classList.add(cl));
        }

        if ('textContent' in c) {
          elem.textContent = c.textContent;
        }

        if ('listener' in c) {
          for (const event in c.listener) {
            elem.addEventListener(event, c.listener[event]);
          }
        }
        if ('child' in c) {
          this.createStructure(c.child, elem);
        }
        return elem;
      });
    }

    addEmpty() {
      const entryID = this.bookstore.addEmpty();
      const structure = [
        {
          tag: 'tr',
          parent: this.table,
          dataset: {
            row: entryID,
          },
          child: [
            {
              tag: 'td',
              dataset: {
                bind: 'author',
              },
            },
            {
              tag: 'td',
              dataset: {
                bind: 'title',
              },
            },
            {
              tag: 'td',
              child: [
                {
                  tag: 'button',
                  textContent: 'Save',
                  classes: ['save-button'],
                  listener: {
                    click: (e) => this.save(e),
                  },
                },
                {
                  tag: 'button',
                  textContent: 'Edit',
                  classes: ['edit-button'],
                  listener: {
                    click: (e) => this.edit(e),
                  },
                },
                {
                  tag: 'button',
                  textContent: 'Remove',
                  classes: ['remove-button'],
                  listener: {
                    click: (e) => this.remove(e),
                  },
                },
              ],
            },
          ],
        },
      ];
      const row = this.createStructure(structure)[0];
      this.edit({ target: row.querySelector('.edit-button') });
    }

    save(event) {
      const rowElement = event.target.parentNode.parentNode;
      rowElement.querySelector('.edit-button').classList.remove('hide');
      rowElement.querySelector('.save-button').classList.add('hide');
      const rowID = Number(rowElement.dataset.row);
      const tds = Array.from(rowElement.querySelectorAll('td:not(:last-of-type)'));
      const values = {};
      for (const td of tds) {
        const input = td.querySelector('input');
        values[td.dataset.bind] = input.value;
        input.remove();
        td.textContent = values[td.dataset.bind];
      }
      this.bookstore.save(rowID, values);
      console.log(this.bookstore);
    }

    edit(event) {
      const tr = event.target.parentNode.parentNode;
      const values = this.bookstore.get(tr.dataset.row);
      const tds = Array.from(tr.querySelectorAll('td:not(:last-of-type)'));
      for (const td of tds) {
        td.textContent = ''
        const input = document.createElement('input');
        input.value = values[td.dataset.bind] ?? '';
        td.appendChild(input);
      }
      tr.querySelector('.edit-button').classList.add('hide');
      tr.querySelector('.save-button').classList.remove('hide');
    }

    remove(event) {
      const rowElement = event.target.parentNode.parentNode;
      const rowID = Number(rowElement.dataset.row);
      rowElement.remove();
      this.bookstore.remove(rowID);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new Interface(
      document.querySelector('#books'),
      document.querySelector('#new_book'),
    );
  });
})();