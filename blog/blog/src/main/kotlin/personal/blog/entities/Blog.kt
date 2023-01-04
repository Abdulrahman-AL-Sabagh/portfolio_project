package personal.blog.entities

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import java.time.LocalDateTime

@Entity
class Blog(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long,
    var title: String?,
    var content: String,
    var image: String?,
    var createdAt: LocalDateTime = LocalDateTime.now()
) {

}



