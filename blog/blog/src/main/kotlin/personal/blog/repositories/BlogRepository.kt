package personal.blog.repositories

import personal.blog.entities.Blog
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface BlogRepository : JpaRepository<Blog, Long>