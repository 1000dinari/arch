package api

// import(
// 	"encoding/json"
// 	"net/http"
// )

// Coin balance param
type CoinBalanceParams struct {
	Username string
}

// Coin Balance Response
type CoinBalanceResponse struct {
	//Response Code
	Code int
	//Balance
	Balance int64
}

// Error Response
type ErrorResponse struct {
	Code    int
	Message string
}
