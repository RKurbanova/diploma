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
		Login:    rawUser.Login,
		Password: rawUser.Password,
	}
}

var (
	ErrNoUser      = errors.New("No user found")
	ErrBadPass     = errors.New("Invald password")
	ErrLoginExists = errors.New("Login exists")
)

func (repo *Repo) Authorize(login, pass string) (*deal.User, error) {
	user, err := repo.GetByLogin(login)

	if err != nil {
		return nil, ErrNoUser
	}

	if user.Password != pass { // TODO add encription
		return nil, ErrBadPass
	}

	return user, nil
}
