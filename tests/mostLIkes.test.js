const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most likes', () => {
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

    const mostTestOne = {
        author: 'Edsger W. Dijkstra',
        likes: 5
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
        },
        {
            _id: '5a422aa71b54a676534d17f9',
            title: 'Bing Bop Blam',
            author: 'Yo Gabba Gabba',
            url: 'www.hubba.com',
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'ZooWeeMama',
            author: 'Joe Mama',
            url: 'www.hubba.com',
            likes: 7,
            __v: 0
        }
    ]

    const mostTestThree = {
        author: 'Yo Gabba Gabba',
        likes: 14,
    }

    const allBlogsZeroLikes = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: 'How To: How-Tos',
            author: 'Yo Gabba Gabba',
            url: 'www.hubba.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f6',
            title: 'A',
            author: 'Joe Mama',
            url: 'www.www.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676534d17f9',
            title: 'Bing Bop Blam',
            author: 'Yo Gabba Gabba',
            url: 'www.hubba.com',
            likes: 0,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'ZooWeeMama',
            author: 'Joe Mama',
            url: 'www.hubba.com',
            likes: 0,
            __v: 0
        }
    ]

    const allBlogsZeroCorrect = {
        author: 'Edsger W. Dijkstra',
        likes: 0
    }
  
    test('when list has only one blog, author with most likes is single author', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      assert.deepStrictEqual(result, mostTestOne)
    })

    test('when list has zero blogs, null/none is returned', () => {
        const result = listHelper.mostLikes(listWithZeroBlogs)
        assert.deepStrictEqual(result, null)
    })

    test('when list has serveral blogs, reuslt is author with highest total of likes', () => {
        const result = listHelper.mostLikes(listWithSeveralBlogs)
        assert.deepStrictEqual(result, mostTestThree)
    })

    test('if every author has like count of zero, result is first author listed', () => {
        const result = listHelper.mostLikes(allBlogsZeroLikes)
        assert.deepStrictEqual(result, allBlogsZeroCorrect)
    })
  })