package main

import (
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
)

type Todo struct{
	ID int `json:"id"`
	Completed bool `json:"completed"`
	Body string `json:"body"`

}

func main(){

	fmt.Println("Hello world")
	app := fiber.New()
	

	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(200).JSON(fiber.Map{"msg":"Hello world"})
	})
	log.Fatal(app.Listen(":4000"))
}