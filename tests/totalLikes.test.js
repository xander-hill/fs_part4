const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithSeveralBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'How To: How-Tos',
            author: 'Yo Gabba Gabba',
            url: 'www.hubba.com',
            likes: 8,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f6',
            title: 'A',
            author: 'Joe Mama',
            url: 'www.www.com',
            likes: 7,
            __v: 0
        }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('when list has zero blogs, zero likes must be returned', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        assert.strictEqual(result, 0)
    })

    test('when list has serveral blogs, equal to sum of likes', () => {
        const result = listHelper.totalLikes(listWithSeveralBlogs)
        assert.strictEqual(result, 20)
    })
  })