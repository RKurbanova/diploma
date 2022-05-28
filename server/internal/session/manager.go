package session

import (
	context "context"
	"net/http"
	"time"
)

type Manager struct {
	repo Repo
}

func NewManager(repo Repo) *Manager {
	return &Manager{
		repo: repo,
	}
}

func (sm *Manager) Check(ctx context.Context, r *http.Request) (*Session, error) {
	sessionCookie, err := r.Cookie(cookieName)
	if err == http.ErrNoCookie {
		return nil, ErrNoAuth
	}
	return sm.repo.Check(ctx, sessionCookie.Value)
}

func (sm *Manager) Create(ctx context.Context, w http.ResponseWriter, userID uint) (*Session, error) {
	sess, err := sm.repo.Create(ctx, userID)
	if err != nil {
		return nil, err
	}
	cookie := &http.Cookie{
		Name:    cookieName,
		Value:   sess.ID,
		Expires: time.Now().Add(90 * 24 * time.Hour),
		Path:    "/",
	}
	http.SetCookie(w, cookie)
	return sess, nil
}

func (sm *Manager) DestroyCurrent(ctx context.Context, w http.ResponseWriter, r *http.Request) error {
	sess, err := SessionFromContext(ctx)
	if err != nil {
		return err
	}
	err = sm.repo.DestroyCurrent(ctx, sess.ID)
	cookie := http.Cookie{
		Name:    cookieName,
		Expires: time.Now().AddDate(0, 0, -1),
		Path:    "/",
	}
	http.SetCookie(w, &cookie)
	return err
}
