package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"server/internal/deal"
	"server/internal/session"
	"server/internal/user"

	"github.com/gorilla/mux"
)

type UserHandler struct {
	UserRepo *user.Repo
	Sessions *session.Manager
}

type ToUpdate struct {
	FieldsToUpdate []string
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

func (h *UserHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, `Bad id`, http.StatusBadRequest)
		return
	}

	u, err := h.UserRepo.GetByID(uint(id))

	if err != nil {
		http.Error(w, `Bad request`, http.StatusBadRequest)
		return
	}

	SendJSONResponse(w, u)
}

func (h *UserHandler) GetAll(w http.ResponseWriter, r *http.Request) {
	u, err := h.UserRepo.GetAll()

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}

func (h *UserHandler) Update(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, `Bad id`, http.StatusBadRequest)
		return
	}

	data, err := ioutil.ReadAll(r.Body)
	reader1 := bytes.NewReader(data)
	reader2 := bytes.NewReader(data)

	decoder1 := json.NewDecoder(reader1)
	decoder2 := json.NewDecoder(reader2)
	var user deal.User

	err = decoder1.Decode(&user)
	if err != nil {
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}
	var toUpdate ToUpdate

	err = decoder2.Decode(&toUpdate)

	fmt.Print(toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	user.ID = uint(id)

	u, err := h.UserRepo.Update(&user, toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
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
		fmt.Print(err.Error())
		http.Error(w, `Login already exists`, http.StatusBadRequest)
		return
	} else if err != nil {
		fmt.Print(err.Error())
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
