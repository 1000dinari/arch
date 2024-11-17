package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/gocolly/colly"
)

type Stock struct {
	Company string `csv:"company"`
	Price   string `csv:"price"`
	Change  string `csv:"change"`
}

func scrapeStocks(ticker string, c *colly.Collector, stocks *[]Stock) {
	cc := c.Clone()

	url := fmt.Sprintf("https://finance.yahoo.com/quote/%s", ticker)
	err := cc.Visit(url)

	cc.OnHTML("div#quote-header-info", func(e *colly.HTMLElement) {
		stock := Stock{
			Company: strings.TrimSpace(e.ChildText("h1")),
			Price:   strings.TrimSpace(e.ChildText("fin-streamer[data-field='regularMarketPrice']")),
			Change:  strings.TrimSpace(e.ChildText("fin-streamer[data-field='regularMarketChangePercent']")),
		}
		fmt.Printf("Fetched %s", stock.Company)
		*stocks = append(*stocks, stock)
	})

	if err != nil {
		log.Printf("Failed request for %s\n%v ", ticket, err)
	}

	cc.OnHTML("*", nil)
}

func main() {
	tickers := []string{
		"ADANIPORTS", "ASIANPAINT", "AXISBANK", "BAJAJ-AUTO", "BAJAJFINSV", "BAJFINANCE", "BHARTIARTL", "BPCL", "BRITANNIA", "CIPLA", "COALINDIA",
		"DIVISLAB", "DRREDDY", "EICHERMOT", "GRASIM", "HCLTECH", "HDFC", "HDFCBANK", "HDFCLIFE", "HEROMOTOCO", "HINDALCO", "HINDUNILVR", "ICICIBANK",
		"INDUSINDBK", "INFY", "IOC", "ITC", "JSWSTEEL", "KOTAKBANK", "LT", "M&M", "MARUTI", "NESTLEIND", "NTPC", "ONGC", "POWERGRID", "RELIANCE", "SBILIFE", "SBIN",
		"SHREECEM", "SUNPHARMA", "TATACONSUM", "TATAMOTORS", "TATASTEEL", "TCS", "TECHM", "TITAN", "ULTRACEMCO", "UPL", "WIPRO",
	}

	var stocks []Stock

	c := colly.NewColletor()

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Fetching ", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Error ", err)
	})

	for _, ticker := range tickers {
		scrapeStocks(ticker, c, &stocks)
	}

	file, err := os.Create("stocks.csv")
	if err != nil {
		log.Fatal("Failed to create csv file: ", err)
	}

	defer file.Close()

	writer := csv.NewWriter(file)
	defer writer.Flush()

	headers := []string{"Company", "Price", "Change"}
	writer.Write(headers)

	for _, stock := range stocks {
		record := []string{stock.Compnay, stock.Price, stock.Change}
		writer.Write(record)
	}

	fmt.Println("All data written to file. Exiting.")

}
