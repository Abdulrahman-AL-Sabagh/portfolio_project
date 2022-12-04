package main

import (
	"all-in-app/controllers"
	"all-in-app/initializers"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

func createUser(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, nil)
}
func init() {
	initializers.LoadEnvVariables()
	initializers.Connect()
}

func main() {
	router := gin.Default()
	// dataSource := os.Getenv("DB_URL")
	// db, _ := gorm.Open(postgres.Open(dataSource), &gorm.Config{})

	// var result User
	// db.Raw("Select * FROM User").Scan(&result)
	router.POST("/api/user", controllers.CreateUser)
	port := os.Getenv("PORT")
	fmt.Println(port, "The port")
	router.Run(":8080")

}
