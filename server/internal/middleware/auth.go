package middleware

import (
	"context"
	"net/http"

	"server/internal/session"
)

var (
	noAuthUrls = map[string]struct{}{
		"/login":    {},
		"/register": {},
		"/cources":  {},
	}
	noSessUrls = map[string]struct{}{
		"/": {},
	}
)

func Auth(sm *session.Manager, next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if _, ok := noAuthUrls[r.URL.Path]; ok || r.Method == http.MethodOptions {
			next.ServeHTTP(w, r)
			return
		}
		sess, err := sm.Check(r.Context(), r)
		_, canbeWithouthSess := noSessUrls[r.URL.Path]
		if err != nil && !canbeWithouthSess {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), session.SessionKey, sess)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
