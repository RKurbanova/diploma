package handlers

import (
	"encoding/json"
	"net/http"
)

func SendJSONResponse(w http.ResponseWriter, data interface{}) (err error) {
	w.Header().Set("Content-type", "application/json")
	respJSON, err := json.Marshal(data)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return err
	}

	_, err = w.Write(respJSON)

	if err != nil {
		http.Error(w, `InternalServerError`, http.StatusInternalServerError)
		return err
	}

	return nil
}
