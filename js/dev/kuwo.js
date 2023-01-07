var url = $request.url
var body = null
if (url.includes('/a.p?')) {  // audio字头的
    try {
        let obj = JSON.parse($response.body)
        obj.packs = {
            "end": 32495443200,
            "bought_vip": 1,
            "type": 1,
            "period": 31,
            "bought_vip_end": 32495443200
        }
        body = JSON.stringify(obj)
    } catch (e) {
        console.log('url出现异常：\n' + url)
    }
} else if (url.includes('/music.pay')) {
    console.log("处理方法待补充：\n" + url)
} else if (url.includes('/vip/v2/user/vip')) {
    if (!$response.body.startsWith("{")) $done({})
    try {
        let obj = JSON.parse($response.body)
        if (obj.data?.hasOwnProperty('vipTag')) {
            obj.data = {
                "vipIcon": "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png",
                "iconJumpUrl": "http://vip1.kuwo.cn/vip/vue/anPay/pay/index.html?pageType=avip&MBOX_WEBCLOSE=1&FULLHASARROW=1",
                "growthValue": "21600",
                "vipTag": "VIP6",
                "vipOverSeasExpire": "0",
                "time": "1659582730304",
                "goSvipPage": "1",
                "isNewUser": "1",
                "vipmIcon": "https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png",
                "svipIcon": "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png",
                "vipmExpire": "32495443200000",
                "biedSong": "0",
                "luxuryIcon": "https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png",
                "userType": "3",
                "isYearUser": "2",
                "vip3Expire": "0",
                "experienceExpire": "0",
                "luxAutoPayUser": "2",
                "biedAlbum": "1",
                "vipLuxuryExpire": "32495443200000",
                "vipmAutoPayUser": "2",
                "svipAutoPayUser": "2",
                "vipExpire": "32495443200000",
                "svipExpire": "32495443200000"
            }
            body = JSON.stringify(obj)
        }
    } catch (e) {
        console.log('url出现异常：\n' + url)
    }
} else if (url.includes('/vip/v2/theme')) {
    //qx抓到了
    console.log("处理方法待补充：\n" + url)
} else if (url.includes('/vip/enc/user/vip?')) {  // vip1.*enc
    body = 'Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ=='
} else if (url.includes('Serv')) {
    console.log("处理方法待补充：\n" + url)
} else {
    console.log("匹配到其他url：\n" + url)
}

if (body) {
    $done({body})
} else {
    $done({})
}