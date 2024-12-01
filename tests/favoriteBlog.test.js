const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
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

    const favoriteTestOne = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
    }

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
            likes: 7,
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

    const favoriteTestThree = {
        _id: '5a422aa71b54a676234d17f9',
        title: 'How To: How-Tos',
        author: 'Yo Gabba Gabba',
        url: 'www.hubba.com',
        likes: 7,
        __v: 0
    }
  
    test('when list has only one blog, favorite blog is that blog', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      assert.deepStrictEqual(result, favoriteTestOne)
    })

    test('when list has zero blogs, null/none is returned', () => {
        const result = listHelper.favoriteBlog(listWithZeroBlogs)
        assert.deepStrictEqual(result, null)
    })

    test('when list has serveral blogs, favorite is first blog with max likes', () => {
        const result = listHelper.favoriteBlog(listWithSeveralBlogs)
        assert.deepStrictEqual(result, favoriteTestThree)
    })
  })