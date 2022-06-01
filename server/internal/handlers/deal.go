package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strconv"

	"server/internal/deal"

	"github.com/gorilla/mux"
)

type DealHandler struct {
	Tmpl     *template.Template
	DealRepo *deal.Repo
}

func (h *DealHandler) List(w http.ResponseWriter, r *http.Request) {
	elems, err := h.DealRepo.GetAll()

	if err != nil {
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, elems)
}

func (h *DealHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, `Bad id`, http.StatusBadRequest)
		return
	}

	u, err := h.DealRepo.GetByID(uint(id))

	if err != nil {
		http.Error(w, `Bad request`, http.StatusBadRequest)
		return
	}

	SendJSONResponse(w, u)
}

func (h *DealHandler) Create(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var deal deal.Deal
	err := decoder.Decode(&deal)
	if err != nil {
		print("whyy", err.Error())
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	id, err := h.DealRepo.Create(&deal)
	if err != nil {
		print("whyy", err.Error())
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}
	err = SendJSONResponse(w, map[string]interface{}{
		"id": id,
	})
}

func (h *DealHandler) UpdateStage(w http.ResponseWriter, r *http.Request) {
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
	var stage deal.Stage

	err = decoder1.Decode(&stage)
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

	stage.ID = uint(id)

	u, err := h.DealRepo.UpdateStage(&stage, toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}
func (h *DealHandler) Update(w http.ResponseWriter, r *http.Request) {
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
	var deal deal.Deal

	err = decoder1.Decode(&deal)
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

	deal.ID = uint(id)

	u, err := h.DealRepo.Update(&deal, toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}
