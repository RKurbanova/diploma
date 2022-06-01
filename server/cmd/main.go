package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"server/internal/deal"
	"server/internal/handlers"
	"server/internal/middleware"
	"server/internal/session"
	"server/internal/user"
)

var (
	DB_NAME = "crowdfunding1"
	PORT    = 3001
)

func getDB() *gorm.DB {
	dsn := "host=localhost user=postgres password=postgres dbname=postgres port=5432 sslmode=disable"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic("failed to connect database")
	}

	db = db.Exec(fmt.Sprintf("CREATE DATABASE %s;", DB_NAME))
	if db.Error != nil {
		dsn := fmt.Sprintf("host=localhost user=postgres password=postgres dbname=%s port=5432 sslmode=disable", DB_NAME)
		db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			panic("failed to connect database")
		}
	}

	return db
}

func main() {
	db := getDB()
	sessRepo := session.NewRepoMem()

	sm := session.NewManager(sessRepo)

	userRepo := user.NewRepository(db)
	dealRepo := deal.NewRepository(db)

	userHandler := &handlers.UserHandler{
		UserRepo: userRepo,
		Sessions: sm,
	}

	dealHandler := &handlers.DealHandler{
		DealRepo: dealRepo,
	}

	r := mux.NewRouter()
	r.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
		return
	})
	r.HandleFunc("/user", userHandler.Get).Methods("GET")
	r.HandleFunc("/users", userHandler.GetAll).Methods("GET")
	r.HandleFunc("/user/{id}", userHandler.GetByID).Methods("GET")
	r.HandleFunc("/user/{id}", userHandler.Update).Methods("POST")
	r.HandleFunc("/login", userHandler.Login).Methods("POST")
	r.HandleFunc("/register", userHandler.Register).Methods("POST")
	r.HandleFunc("/logout", userHandler.Logout).Methods("POST")

	r.HandleFunc("/deals", dealHandler.List).Methods("GET")
	r.HandleFunc("/deal/new", dealHandler.Create).Methods("POST")
	r.HandleFunc("/deal/{id}", dealHandler.Update).Methods("POST")
	r.HandleFunc("/stage/{id}", dealHandler.UpdateStage).Methods("POST")
	r.HandleFunc("/deal/{id}", dealHandler.GetByID).Methods("GET")
	// r.HandleFunc("/deal/{id}/comment", dealHandler.Comment).Methods("POST")
	// r.HandleFunc("/deal/{id}/approve", dealHandler.Approve).Methods("POST")
	// r.HandleFunc("/deal/{id}/start", dealHandler.Start).Methods("POST")
	// r.HandleFunc("/deal/{id}/freeze", dealHandler.Freeze).Methods("POST")
	// r.HandleFunc("/deal/{id}/cancel", dealHandler.Cancel).Methods("POST")
	// r.HandleFunc("/deal/{id}/finish", dealHandler.Finish).Methods("POST")
	// r.HandleFunc("/deal/{id}/invest", dealHandler.Invest).Methods("POST")
	// r.HandleFunc("/deal/{id}/insert_profit", dealHandler.InsertProfit).Methods("POST")
	// r.HandleFunc("/deal/{id}/stage/{stageId}/submit", dealHandler.StageSubmit).Methods("POST")
	// r.HandleFunc("/deal/{id}/stage/{stageId}", dealHandler.StageUpdate).Methods("POST")
	// r.HandleFunc("/deal/{id}/stage/{stageId}/approve", dealHandler.StageApprove).Methods("POST")
	// r.HandleFunc("/deal/{id}/stage/{stageId}/finish", dealHandler.StageFinish).Methods("POST")

	router := middleware.Auth(sm, r)
	router = middleware.Panic(router)
	router = middleware.Cors(router)

	err := http.ListenAndServe(fmt.Sprintf(":%d", PORT), router)

	if err != nil {
		panic(err.Error())
	}
}
