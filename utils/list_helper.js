const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, current) => {
        return sum + current.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    return blogs.reduce((mostLiked, blog) => {
        return (blog.likes > mostLiked.likes) ? blog : mostLiked
    }, {likes: -1})
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    
    const blogCounts = blogs.reduce((acc, blog) => {
        acc[blog.author]= (acc[blog.author] || 0) + 1
        return acc
    }, {})

    let maxAuthor = null
    let maxBlogs = 0

    for (const [author, count] of Object.entries(blogCounts)) {
        if (count > maxBlogs) {
            maxAuthor = author
            maxBlogs = count
        }
    }

    return {
        author: maxAuthor,
        blogs: blogCounts[maxAuthor],
    }
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}