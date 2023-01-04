package personal.auth.services

import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import io.jsonwebtoken.impl.crypto.MacProvider
import jakarta.servlet.http.Cookie
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException
import personal.auth.dto.RegisterDTO
import personal.auth.entities.Message
import personal.auth.entities.User
import personal.auth.repositories.UserRepository
import java.util.*
import javax.crypto.SecretKey
import kotlin.jvm.optionals.getOrElse
import kotlin.jvm.optionals.getOrNull

@Service
class UserService(val repository: UserRepository) {
    val key: SecretKey = MacProvider.generateKey(SignatureAlgorithm.HS256)
    val base64SecretBytes: String = Base64.getEncoder().encodeToString(key.encoded)

    fun getAllusers() = repository.findAll()
    fun getUser(id: Long): User? = repository.findByIdOrNull(id)
    fun getUserByEmail(email: String) = repository.findByEmail(email)
    fun createUser(body: RegisterDTO): User = repository.save(User(0, body.name, body.email, body.password))
    fun updateUser(id: Long, user: User): User {
        val foundUser: Optional<User> = repository.findById(id)
        return if (foundUser.isPresent) {
            repository.save(User(id, user.name, foundUser.get().email, user.password))
        } else throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun deleteUser(id: Long) {
        return if (repository.existsById(id)) {
            repository.deleteById(id)
        } else throw ResponseStatusException(HttpStatus.NOT_FOUND)
    }

    fun signCookie(issuer: String): Cookie {

        //TODO Read this thing from an env file
        val jwt = Jwts.builder()
            .setExpiration(Date(System.currentTimeMillis() + (1000 * 60 * 60 * 8)))
            .setIssuer(issuer)
            .signWith(key)
            .compact()
        return Cookie("token", jwt)
    }

    fun decodeCookie(token: String): User? {
        return try {

            val userId = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .body.issuer.toLong()

            return getUser(userId)
            //OK, we can trust this JWT

        } catch (e: JwtException) {
            System.err.println(e.message)
            null;

        }

    }
}