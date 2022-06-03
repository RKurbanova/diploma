package cource

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type RawUser struct {
	Login      string
	Password   string
	FirstName  string
	LastName   string
	Patronymic string
	Email      string
	Birthday   string
	Balance    float64
	Role       int
}

// TODO move somehow to user
type User struct {
	gorm.Model
	Login             string
	Password          string `json:"-"`
	FirstName         string
	LastName          string
	Patronymic        string
	Email             string
	Birthday          string
	Role              int
	CourcesOwned      []*Cource
	CourcesSubscribed []*Cource `gorm:"many2many:user_cource_subscribed;"`
	Comments          []*Comment
}

type Cource struct {
	gorm.Model
	Title       string
	Description string
	Images      pq.StringArray `gorm:"type:varchar(10485760)[]" json:"Images"`
	UserID      uint
	Rates       []*Rate
	Comments    []*Comment
	Lessons     []*Lesson
	Subscribers []*User `gorm:"many2many:user_cource_subscribed;"`
}

type Lesson struct {
	gorm.Model
	CourceID    uint
	Title       string
	Description string
	Videos      pq.StringArray `gorm:"type:varchar(10485760)[]" json:"Videos"`
	Images      pq.StringArray `gorm:"type:varchar(10485760)[]" json:"Images"`
	Comments    []*Comment
}

type Rate struct {
	gorm.Model
	CourceID uint
	UserID   uint
	Rate     uint
}

type Comment struct {
	gorm.Model
	Text     string
	Images   pq.StringArray `gorm:"type:varchar(10485760)[]" json:"Images"`
	CourceID uint
	UserID   uint
	LessonID uint
}
