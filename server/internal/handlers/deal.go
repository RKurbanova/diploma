package handlers

import (
	"encoding/json"
	"html/template"
	"net/http"
	"strconv"

	"server/internal/deal"

	"github.com/gorilla/mux"
)

type DealRepositoryInterface interface {
	GetAll() ([]*deal.Deal, error)
	Create(*deal.Deal) (int64, error)
	Update(*deal.Deal) (int64, error)
}

type DealHandler struct {
	Tmpl     *template.Template
	DealRepo DealRepositoryInterface
}

func (h *DealHandler) List(w http.ResponseWriter, r *http.Request) {
	elems, err := h.DealRepo.GetAll()

	if err != nil {
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, elems)
}

func (h *DealHandler) Create(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var deal deal.Deal
	err := decoder.Decode(&deal)
	if err != nil {
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	id, err := h.DealRepo.Create(&deal)
	if err != nil {
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}
	err = SendJSONResponse(w, map[string]interface{}{
		"id": id,
	})
}

func (h *DealHandler) Update(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, `Bad id`, http.StatusBadRequest)
		return
	}

	decoder := json.NewDecoder(r.Body)
	var deal deal.Deal
	err = decoder.Decode(&deal)
	if err != nil {
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	deal.ID = uint(id)

	_, err = h.DealRepo.Update(&deal)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
