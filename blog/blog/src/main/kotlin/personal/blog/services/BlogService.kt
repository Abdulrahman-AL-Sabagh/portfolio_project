package personal.blog.services

import personal.blog.entities.Blog
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import personal.blog.repositories.BlogRepository
import java.util.*

@Service
class BlogService(val blogRepository: BlogRepository) {

    fun getAllBlogs(): List<Blog> = blogRepository.findAll()
    fun getABlog(id: Long): Optional<Blog> = blogRepository.findById(id)
    fun createBlog(blog: Blog): Blog = blogRepository.save(blog)
    fun updateBlog(id: Long, blog: Blog): Blog {
        return if (blogRepository.existsById(id)) {
            blogRepository.save(blog)
        } else throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun deletePost(id: Long) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
        } else throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }
}