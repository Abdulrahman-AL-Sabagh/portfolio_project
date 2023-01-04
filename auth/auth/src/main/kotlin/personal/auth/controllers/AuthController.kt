package personal.auth.controllers

import io.jsonwebtoken.Jwts
import jakarta.transaction.Transactional
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import personal.auth.dto.LoginDTO
import personal.auth.entities.Message
import personal.auth.services.UserService

import jakarta.servlet.http.HttpServletResponse
import org.springframework.web.bind.annotation.CookieValue


import org.springframework.web.bind.annotation.GetMapping

import org.springframework.web.bind.annotation.RestController
import org.springframework.web.servlet.support.ServletUriComponentsBuilder
import personal.auth.dto.RegisterDTO
import java.util.*


@RequestMapping("/api")
@RestController
class AuthController(private val service: UserService) {

    @GetMapping("/me")
    fun checkAuthentication(@CookieValue("token") token: String?): ResponseEntity<Any> {
        if (token == null) {
            return ResponseEntity.status(401).body(Message("UNAUTHENTICATED no cookie"))
        }

        val user = service.decodeCookie(token)
        return if (user !== null) {
            ResponseEntity.ok().body(user)
        } else {
            ResponseEntity.status(401).body(Message("UNAUTHENTICATED no cookie"))
        }


    }


    @PostMapping("/signup")
    fun signup(@RequestBody body: RegisterDTO, response: HttpServletResponse): ResponseEntity<Message> {

        val user = service.createUser(body)
        val location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(user.id)
            .toUri()
        val cookie = service.signCookie(user.toString());
        cookie.isHttpOnly = true
        response.addCookie(cookie)
        return ResponseEntity.created(location).body(Message("Success"))
    }

    @PostMapping("/login")
    @Transactional
    fun login(@RequestBody body: LoginDTO, response: HttpServletResponse): ResponseEntity<Message> {
        println(body)
        val user = service.getUserByEmail(body.email)
        if (user === null) {
            return ResponseEntity.badRequest().body(Message("User not found"))
        }
        println(user.comparePassword(body.password))
        if (user.comparePassword(body.password)) {
            val cookie = service.signCookie(user.id.toString())
            cookie.isHttpOnly = true

            response.addCookie(cookie)
            return ResponseEntity.ok(Message("Success"))

        }
        return ResponseEntity.badRequest().body(Message("Password is incorrect"))

    }


}


