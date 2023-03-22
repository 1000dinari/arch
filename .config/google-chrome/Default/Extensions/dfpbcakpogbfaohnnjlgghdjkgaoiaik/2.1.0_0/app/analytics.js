
const key = 'f05f30055a02059b22f67a4aa0337dad';

export async function log(event, userId, properties = {}) {

    try {
        let id = userId ? userId : "admin";

        const inputBody = {
            "api_key": key,
            "events": [
                {
                    "user_id": id,
                    // "device_id": "C8F9E604-F01A-4BD9-95C6-8E5357DF265D",
                    "event_type": event,
                    "time": new Date().getTime(),
                    "event_properties": properties ?? {},
                    // "app_version": "2.1.3",
                    // "platform": "iOS",
                    // "os_name": "Android",
                    // "os_version": "4.2.2",
                    // "device_brand": "Verizon",
                    // "device_manufacturer": "Apple",
                    // "device_model": "iPhone 9,1",
                    // "carrier": "Verizon",
                    // "country": "United States",
                    // "region": "California",
                    // "city": "San Francisco",
                    // "dma": "San Francisco-Oakland-San Jose, CA",
                    // "language": "English",
                    // "price": 4.99,
                    // "quantity": 3,
                    // "revenue": -1.99,
                    // "productId": "Google Pay Store Product Id",
                    // "revenueType": "Refund",
                    // "location_lat": 37.77,
                    // "location_lng": -122.39,
                    // "ip": "127.0.0.1",
                    // "idfa": "AEBE52E7-03EE-455A-B3C4-E57283966239",
                    // "idfv": "BCCE52E7-03EE-321A-B3D4-E57123966239",
                    // "adid": "AEBE52E7-03EE-455A-B3C4-E57283966239",
                    // "android_id": "BCCE52E7-03EE-321A-B3D4-E57123966239",
                    // "event_id": 23,
                    // "session_id": 1396381378123,
                    // "insert_id": "5f0adeff-6668-4427-8d02-57d803a2b841"
                }
            ]
        };
        const headers = { 'Content-Type': 'application/json', 'Accept': '*/*' };

        // console.log('inputBody:', inputBody)
        let response = await fetch('https://api2.amplitude.com/2/httpapi',
            {
                method: 'POST',
                body: JSON.stringify(inputBody),
                headers: headers
            });

        let text = await response.text();
        // console.log('analytics response:', text);
    }
    catch (e) {
        console.log("Error in analytics: " + e.message, e);
    }
}
