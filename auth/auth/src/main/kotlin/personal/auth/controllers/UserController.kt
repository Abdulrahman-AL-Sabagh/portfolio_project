package personal.auth.controllers

import jakarta.transaction.Transactional
import org.springframework.web.bind.annotation.*
import personal.auth.dto.RegisterDTO
import personal.auth.entities.User
import personal.auth.services.UserService

@RequestMapping("/user")
@RestController

class UserController(val service: UserService) {

    @GetMapping
    fun getAllUsers(): List<User> = service.getAllusers()

    @GetMapping("/{id}")
    fun getUser(@PathVariable id: Long) = service.getUser(id)

    @PostMapping
    @Transactional
    fun createUser(@RequestBody body: RegisterDTO) {
        service.createUser(body)

    }

    @PutMapping("/{id}")
    @Transactional
    fun updateUser(
        @PathVariable id: Long,
        @RequestBody user: User
    ) = service.updateUser(id, user)

    @DeleteMapping("/{id}")
    @Transactional
    fun deleteUser(@PathVariable id: Long) = service.deleteUser(id)
}