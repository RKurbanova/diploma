package session

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
)

type Session struct {
	ID     string
	UserID uint
}

type Repo interface {
	Check(context.Context, string) (*Session, error)
	Create(context.Context, uint) (*Session, error)
	DestroyCurrent(context.Context, string) error
}

func NewSession(userID uint) *Session {
	randID := make([]byte, 16)
	rand.Read(randID)

	return &Session{
		ID:     fmt.Sprintf("%x", randID),
		UserID: userID,
	}
}

var (
	ErrNoAuth = errors.New("No session found")

	cookieName = "session_id"
)

type sessKey string

var SessionKey sessKey = "sessionKey"

func SessionFromContext(ctx context.Context) (*Session, error) {
	sess, ok := ctx.Value(SessionKey).(*Session)
	if !ok || sess == nil {
		return nil, ErrNoAuth
	}
	return sess, nil
}
