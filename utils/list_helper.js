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

    var mostLiked = null
    var max = -1

    blogs.forEach(blog => {
        if (blog.likes > max) {
            max = blog.likes
            mostLiked = blog
        }
    })

    return mostLiked
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
}