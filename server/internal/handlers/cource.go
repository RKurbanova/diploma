package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"strconv"

	"server/internal/cource"

	"github.com/gorilla/mux"
)

type CourceHandler struct {
	Tmpl       *template.Template
	CourceRepo *cource.Repo
}

func (h *CourceHandler) List(w http.ResponseWriter, r *http.Request) {
	elems, err := h.CourceRepo.GetAll()

	if err != nil {
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, elems)
}

func (h *CourceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseUint(vars["id"], 10, 32)
	if err != nil {
		http.Error(w, `Bad id`, http.StatusBadRequest)
		return
	}

	u, err := h.CourceRepo.GetByID(uint(id))

	if err != nil {
		http.Error(w, `Bad request`, http.StatusBadRequest)
		return
	}

	SendJSONResponse(w, u)
}

func (h *CourceHandler) Create(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var cource cource.Cource
	err := decoder.Decode(&cource)
	if err != nil {
		print("whyy", err.Error())
		http.Error(w, `Bad data`, http.StatusBadRequest)
		return
	}

	id, err := h.CourceRepo.Create(&cource)
	if err != nil {
		print("whyy", err.Error())
		http.Error(w, `DB err`, http.StatusInternalServerError)
		return
	}
	err = SendJSONResponse(w, map[string]interface{}{
		"id": id,
	})
}

func (h *CourceHandler) Update(w http.ResponseWriter, r *http.Request) {
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
	var cource cource.Cource

	err = decoder1.Decode(&cource)
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

	cource.ID = uint(id)

	u, err := h.CourceRepo.Update(&cource, toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}

func (h *CourceHandler) UpdateLesson(w http.ResponseWriter, r *http.Request) {
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
	var lesson cource.Lesson

	err = decoder1.Decode(&lesson)
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

	lesson.ID = uint(id)

	u, err := h.CourceRepo.UpdateLesson(&lesson, toUpdate.FieldsToUpdate)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return
	}

	SendJSONResponse(w, u)
}
