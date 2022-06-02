package user

import (
	"errors"
	"server/internal/cource"
)

const (
	USER_ROLE      = iota
	MODERATOR_ROLE = iota
	ADMIN_ROLE     = iota
)

func RawUserToUser(rawUser *cource.RawUser) *cource.User {
	return &cource.User{
		Login:      rawUser.Login,
		Password:   rawUser.Password,
		FirstName:  rawUser.FirstName,
		LastName:   rawUser.LastName,
		Patronymic: rawUser.Patronymic,
		Email:      rawUser.Email,
		Birthday:   rawUser.Birthday,
	}
}

var (
	ErrNoUser      = errors.New("No user found")
	ErrBadPass     = errors.New("Invald password")
	ErrLoginExists = errors.New("Login exists")
)

func (repo *Repo) Authorize(login, pass string) (*cource.User, error) {
	user, err := repo.GetByLogin(login)

	if err != nil {
		return nil, ErrNoUser
	}

	if user.Password != pass { // TODO add encription
		return nil, ErrBadPass
	}

	return user, nil
}
