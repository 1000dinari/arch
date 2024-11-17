package main

import (
	"encoding/csv"
	"fmt"
	"log"
	"os"
	"strings"
	"time"

	"github.com/gocolly/colly"
)

type Stock struct {
	Company string `csv:"company"`
	Price   string `csv:"price"`
	Change  string `csv:"change"`
}

func scrapeStocks(ticker string, c *colly.Collector, stocks *[]Stock) {
	cc := c.Clone()

	cc.OnHTML("div#quote-header-info", func(e *colly.HTMLElement) {
		stock := Stock{
			Company: strings.TrimSpace(e.ChildText("h1")),
			Price:   strings.TrimSpace(e.ChildText("fin-streamer[data-field='regularMarketPrice']")),
			Change:  strings.TrimSpace(e.ChildText("fin-streamer[data-field='regularMarketChangePercent']")),
		}
		fmt.Printf("Fetched %s", stock.Company)
		*stocks = append(*stocks, stock)
	})

	url := fmt.Sprintf("https://finance.yahoo.com/quote/%s/", ticker)
	err := cc.Visit(url)

	if err != nil {
		log.Printf("Failed request for %s\n%v \nurl=%s", ticker, err, url)
	}

	cc.OnHTML("*", nil)
}

func main() {
	tickers := []string{
		"ADANIPORTS.NS", "ASIANPAINT.NS", "AXISBANK.NS", "BAJAJ-AUTO.NS", "BAJAJFINSV.NS", "BAJFINANCE.NS", "BHARTIARTL.NS", "BPCL.NS",
		"BRITANNIA.NS", "CIPLA.NS", "COALINDIA.NS", "DIVISLAB.NS", "DRREDDY.NS", "EICHERMOT.NS", "GRASIM.NS", "HCLTECH.NS", "HDFC.NS",
		"HDFCBANK.NS", "HDFCLIFE.NS", "HEROMOTOCO.NS", "HINDALCO.NS", "HINDUNILVR.NS", "ICICIBANK.NS", "INDUSINDBK.NS", "INFY.NS", "IOC.NS",
		"ITC.NS", "JSWSTEEL.NS", "KOTAKBANK.NS", "LT.NS", "M&M.NS", "MARUTI.NS", "NESTLEIND.NS", "NTPC.NS", "ONGC.NS", "POWERGRID.NS",
		"RELIANCE.NS", "SBILIFE.NS", "SBIN.NS", "SHREECEM.NS", "SUNPHARMA.NS", "TATACONSUM.NS", "TATAMOTORS.NS", "TATASTEEL.NS",
		"TCS.NS", "TECHM.NS", "TITAN.NS", "ULTRACEMCO.NS", "UPL.NS", "WIPRO.NS",
	}

	var stocks []Stock

	c := colly.NewCollector()

	c.OnRequest(func(r *colly.Request) {
		fmt.Println("Fetching ", r.URL)
	})

	c.OnError(func(_ *colly.Response, err error) {
		log.Println("Error ", err)
	})

	for _, ticker := range tickers {
		scrapeStocks(ticker, c, &stocks)
		time.Sleep(1 * time.Second)
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
		record := []string{stock.Company, stock.Price, stock.Change}
		writer.Write(record)
	}

	fmt.Println("All data written to file. Exiting.")

}
