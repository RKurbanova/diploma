package session

import (
	context "context"
	"sync"
	"time"
)

type RepoMem struct {
	data map[string]*Session
	mu   *sync.RWMutex
}

func NewRepoMem() *RepoMem {
	return &RepoMem{
		data: make(map[string]*Session, 10),
		mu:   &sync.RWMutex{},
	}
}

func (repo *RepoMem) Check(ctx context.Context, sessID string) (*Session, error) {
	repo.mu.RLock()
	sess, ok := repo.data[sessID]
	repo.mu.RUnlock()
	if !ok {
		return nil, ErrNoAuth
	}
	return sess, nil
}

func (repo *RepoMem) Create(ctx context.Context, userID uint) (*Session, error) {
	sess := NewSession(userID)

	time.Sleep(10 * time.Millisecond) // чтобы было заметно в примере с трейсингом

	repo.mu.Lock()
	repo.data[sess.ID] = sess
	repo.mu.Unlock()

	return sess, nil
}

func (repo *RepoMem) DestroyCurrent(ctx context.Context, sessID string) error {
	repo.mu.Lock()
	delete(repo.data, sessID)
	repo.mu.Unlock()

	return nil
}
