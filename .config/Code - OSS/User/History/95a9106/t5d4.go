package main

import "github.com/gocolly/colly"

type Stock struct{
	Company string 'csv:"company"'
	Price string 'csv:"price"'
	Change string 'csv:"change"'
}

func main()
{
	ticker := []string {
		"ADANIPORTS","ASIANPAINT","AXISBANK","BAJAJ-AUTO","BAJAJFINSV","BAJFINANCE","BHARTIARTL","BPCL","BRITANNIA","CIPLA","COALINDIA",
		"DIVISLAB","DRREDDY","EICHERMOT","GRASIM","HCLTECH","HDFC","HDFCBANK","HDFCLIFE","HEROMOTOCO","HINDALCO","HINDUNILVR","ICICIBANK",
		"INDUSINDBK","INFY","IOC","ITC","JSWSTEEL","KOTAKBANK","LT","M&M","MARUTI","NESTLEIND","NTPC","ONGC","POWERGRID","RELIANCE","SBILIFE","SBIN",
		"SHREECEM","SUNPHARMA","TATACONSUM","TATAMOTORS","TATASTEEL","TCS","TECHM","TITAN","ULTRACEMCO","UPL","WIPRO"
	}

	stocks := []Stock

	c := colly.NewCollector()

}