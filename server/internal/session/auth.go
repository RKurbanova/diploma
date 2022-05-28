package session

import (
	context "context"
)

type AuthSession struct {
	ID     string
	UserID uint
}

type AuthNothing struct{}

type AuthService struct {
	repo Repo
}

func NewAuthService(repo Repo) *AuthService {
	return &AuthService{
		repo: repo,
	}
}

func (as *AuthService) Check(ctx context.Context, sessID string) (*AuthSession, error) {
	sess, err := as.repo.Check(ctx, sessID)
	if err != nil {
		return nil, err
	}
	return &AuthSession{
		ID:     sess.ID,
		UserID: sess.UserID,
	}, nil
}

func (as *AuthService) Create(ctx context.Context, userID uint) (*AuthSession, error) {
	sess, err := as.repo.Create(ctx, userID)
	if err != nil {
		return nil, err
	}
	return &AuthSession{
		ID:     sess.ID,
		UserID: sess.UserID,
	}, nil
}

func (as *AuthService) DestroyCurrent(ctx context.Context, sessID string) (*AuthNothing, error) {
	return &AuthNothing{}, as.repo.DestroyCurrent(ctx, sessID)
}
