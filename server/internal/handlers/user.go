package handlers

import (
	"encoding/json"
	"net/http"

	"server/internal/deal"
	"server/internal/session"
	"server/internal/user"
)

type UserHandler struct {
	UserRepo *user.Repo
	Sessions *session.Manager
}

func (h *UserHandler) Get(w http.ResponseWriter, r *http.Request) {
	sess, err := session.SessionFromContext(r.Context())

	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	u, err := h.UserRepo.GetByID(sess.UserID)

	if err != nil {
		h.Sessions.DestroyCurrent(r.Context(), w, r)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	SendJSONResponse(w, u)
}

func (h *UserHandler) Login(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var rawUser deal.RawUser
	err := decoder.Decode(&rawUser)
	if err != nil {
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	u, err := h.UserRepo.Authorize(rawUser.Login, rawUser.Password)
	if err == user.ErrNoUser {
		http.Error(w, `No such user`, http.StatusBadRequest)
		return
	} else if err == user.ErrBadPass {
		http.Error(w, `Bad password`, http.StatusBadRequest)
		return
	} else if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	_, err = h.Sessions.Create(r.Context(), w, u.ID)
	if err != nil {
		http.Error(w, `Sessions.Create err`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}

func (h *UserHandler) Register(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var rawUser deal.RawUser
	err := decoder.Decode(&rawUser)
	if err != nil {
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	u, err := h.UserRepo.Create(user.RawUserToUser(&rawUser))

	if err == user.ErrLoginExists {
		http.Error(w, `Login already exists`, http.StatusBadRequest)
		return
	} else if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	_, err = h.Sessions.Create(r.Context(), w, u.ID)
	if err != nil {
		http.Error(w, `Sessions.Create err`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}

func (h *UserHandler) Logout(w http.ResponseWriter, r *http.Request) {
	h.Sessions.DestroyCurrent(r.Context(), w, r)
	w.WriteHeader(http.StatusNoContent)
}
