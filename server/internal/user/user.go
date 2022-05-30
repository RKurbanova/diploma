package user

import (
	"errors"
	"server/internal/deal"
)

const (
	USER_ROLE      = iota
	MODERATOR_ROLE = iota
	ADMIN_ROLE     = iota
)

func RawUserToUser(rawUser *deal.RawUser) *deal.User {
	return &deal.User{
		Login:      rawUser.Login,
		Password:   rawUser.Password,
		FirstName:  rawUser.FirstName,
		LastName:   rawUser.LastName,
		Patronymic: rawUser.Patronymic,
		Email:      rawUser.Email,
		Birthday:   rawUser.Birthday,
		Phone:      rawUser.Phone,
		Passport:   rawUser.Passport,
		Balance:    rawUser.Balance,
	}
}

var (
	ErrNoUser      = errors.New("No user found")
	ErrBadPass     = errors.New("Invald password")
	ErrLoginExists = errors.New("Login exists")
)

func (repo *Repo) Authorize(login, pass string) (*deal.User, error) {
	user, err := repo.GetByLogin(login)

	if err != nil || user.IsBlocked {
		return nil, ErrNoUser
	}

	if user.Password != pass { // TODO add encription
		return nil, ErrBadPass
	}

	return user, nil
}
