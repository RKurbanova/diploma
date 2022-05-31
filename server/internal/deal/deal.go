package deal

import (
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type RawUser struct {
	Login         string
	Password      string
	FirstName     string
	LastName      string
	Patronymic    string
	Email         string
	Birthday      string
	Phone         string
	Passport      string
	Balance       float64
	WantPromotion bool `json:"WantPromotion"`
	IsPromoted    bool `json:"IsPromoted"`
	IsBlocked     bool `json:"IsBlocked"`
	Role          int
}

// TODO move somehow to user
type User struct {
	gorm.Model
	Login           string
	Password        string `json:"-"`
	FirstName       string
	LastName        string
	Patronymic      string
	Email           string
	Birthday        string
	Phone           string
	Passport        string
	Balance         float64
	WantPromotion   bool `json:"WantPromotion"`
	IsPromoted      bool `json:"IsPromoted"`
	IsBlocked       bool `json:"IsBlocked"`
	Role            int
	DealsOwned      []*Deal
	DealsInvested   []*Deal `gorm:"many2many:user_deal_invested;"`
	DealsToModerate []*Deal `gorm:"many2many:moderator_deal_to_moderate;"`
	UsersToApprove  []*Deal `gorm:"many2many:moderator_user_to_approve;"`
	Comments        []*Comment
}

type Deal struct {
	gorm.Model
	Title       string
	Description string
	Images      pq.StringArray `gorm:"type:varchar(10000)[]" json:"Images"`
	IsStarted   bool
	IsApproved  bool
	IsFrozen    bool
	IsFinished  bool
	UserID      uint
	Investments []*Investment
	Rates       []*Rate
	Approves    []*Approve
	Comments    []*Comment
	Stages      []*Stage
	Investors   []*User `gorm:"many2many:user_deal_invested;"`
	Moderators  []*User `gorm:"many2many:moderator_deal_to_moderate;"`
}

type Investment struct {
	gorm.Model
	DealID uint
	UserID uint
	amount float64
}

type Rate struct {
	gorm.Model
	DealID uint
	UserID uint
}

type Approve struct {
	gorm.Model
	DealID uint
	UserID uint
}

type Stage struct {
	gorm.Model
	DealID               uint
	MoneyGoal            float64
	IsStarted            bool
	IsSubmited           bool
	IsApproved           bool
	IsFinished           bool
	Title                string
	Description          string
	Images               pq.StringArray `gorm:"type:varchar(10000)[]" json:"Images"`
	SubmitionImages      pq.StringArray `gorm:"type:varchar(10000)[]" json:"SubmitionImages"`
	SubmitionDescription string
}

type Comment struct {
	gorm.Model
	Text   string
	Images pq.StringArray `gorm:"type:varchar(10000)[]" json:"Images"`
	DealID uint
	UserID uint
}
