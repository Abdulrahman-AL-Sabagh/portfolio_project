package personal.auth.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder


@Entity
@Table(name = "user_table")
class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    var name: String = ""

    @Column(unique = true)
    var email: String = ""

    @JsonIgnore
    var password: String = ""


    constructor(id: Long, name: String, email: String, password: String) {
        this.id = id
        this.name = name
        this.email = email
        this.password = BCryptPasswordEncoder().encode(password)
    }

    constructor()


    fun comparePassword(password: String): Boolean {
        val passwordEncoder = BCryptPasswordEncoder()

        return passwordEncoder.matches(password,this.password)
    }

}