package handlers

import import(
	"encoding/json"
	"net/http"
	"github.com/go-chi/chi"
	chimiddle "github.com/go-chi/chi/middleware"

)

func Handler(r *chi.Mux){
	//GLobal middleware
	r.Use(chimiddle.StripSlashes)
}