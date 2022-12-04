package main

import (
	"all-in-app/initializers"
	"all-in-app/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.Connect()
}
func main() {
	initializers.DB.AutoMigrate(&models.User{})
}
