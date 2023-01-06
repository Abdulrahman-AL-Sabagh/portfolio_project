package personal.blog.controllers

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import personal.blog.entities.Blog
import jakarta.transaction.Transactional


import org.springframework.beans.factory.annotation.Autowired

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CookieValue
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import personal.blog.entities.Message
import personal.blog.repositories.BlogRepository
import personal.blog.services.BlogService
import java.util.*

@RequestMapping("/blog")
@RestController
class BlogController(val service: BlogService) {

    @Autowired
    lateinit var blogRepository: BlogRepository

    @GetMapping
    fun getBlogs() = service.getAllBlogs()

    @GetMapping("/{id}")
    fun getOneBlog(@PathVariable id: Long) = service.getABlog(id)

    @PostMapping
    @Transactional
    fun createABlog(
        @RequestBody blog: Blog,
        response: HttpServletResponse,
        request: HttpServletRequest
    ): ResponseEntity<Message> {


        ResponseEntity.badRequest().body(Message("UNAUTHENTICATED"))

        val createdBlog = service.createBlog(blog)
        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(createdBlog.id)
            .toUri()
        return ResponseEntity.created(location).body(Message("Success"))


    }

    @PutMapping("/{id}")
    @Transactional
    fun updateABlog(
        @PathVariable id: Long,
        @RequestBody blog: Blog
    ) = service.updateBlog(id, blog)

    @DeleteMapping("/{id}")
    @Transactional
    fun deleteABlog(@PathVariable id: Long) = service.deletePost(id)

}