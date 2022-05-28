package deals

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model
	Code  string
	Price uint
}

type User struct {
	gorm.Model
	Name      string
	Languages []Language `gorm:"many2many:user_languages;"`
}

type Language struct {
	gorm.Model
	Name  string
	Users []*User `gorm:"many2many:user_languages;"`
}

func Test() {
	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db = db.Exec("CREATE DATABASE test;")
	if db.Error != nil {
		dsn := "host=localhost user=postgres password=postgres dbname=test port=5432 sslmode=disable"
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}
	}

	// Migrate the schema
	db.AutoMigrate(&Product{})
	db.AutoMigrate(&User{})
	db.AutoMigrate(&Language{})

	// lang1 := Language{
	// 	Name: "english",
	// }

	// lang2 := Language{
	// 	Name: "russian",
	// }

	// user := &User{
	// 	Name:      "Lox",
	// 	Languages: []Language{lang1, lang2},
	// }

	// Create
	// db.Create(user)

	// Read
	// var user User
	// db = db.Preload(clause.Associations).First(&user, "name = ?", "Lox")

	// // db = db.Model(&user).Update("Languages", []Language{lang1, lang2})

	// if db.Error != nil {
	// 	fmt.Printf(db.Error.Error(), "ololo")
	// } else {
	// 	fmt.Printf(user.Languages[0].Name, "valid")
	// }

	// // Update - update product's price to 200
	// db.Model(&product).Update("Price", 200)
	// // Update - update multiple fields
	// db.Model(&product).Updates(Product{Price: 200, Code: "F42"}) // non-zero fields
	// db.Model(&product).Updates(map[string]interface{}{"Price": 200, "Code": "F42"})

	// // Delete - delete product
	// db.Delete(&product, 1)
}
