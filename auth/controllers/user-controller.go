package controllers

import (
	"all-in-app/initializers"
	"all-in-app/models"

	"github.com/gin-gonic/gin"
)

func CreateUser(c *gin.Context) {

	var body struct {
		Name     string
		Email    string
		Password string
	}
	c.Bind(&body)
	var user = models.User{Name: body.Name, Email: body.Email, Password: body.Password}
	result := initializers.DB.Create(&user)

	if result.Error != nil {
		c.Status(400)
		return
	}

	c.JSON(200, gin.H{
		"user": user,
	})
}
