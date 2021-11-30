import { insertTodo, db } from '.'

describe('DB', () => {
  test('insertTodo', () => {
    const test = { description: 'Test TODO' }
    insertTodo(test)
    expect(db.length).toBe(1)
    const inserted = db[0]
    expect(inserted.description).toBe(test.description)
    expect(inserted.created).toEqual(inserted.modified)
    expect(inserted.created).not.toBeNull()
  })
})
