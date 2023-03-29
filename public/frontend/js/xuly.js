$(document).ready(function () {
    var dataCart = {}

    $("a.add-to-cart").click(function () {
        var idProduct = $(this).closest("div.single-products").find("div.product-infor").attr("id")

        itemData = {
            img: $(this).closest("div.single-products").find("img").attr("src"),
            price: $(this).closest("div.overlay-content").find("h2").text(),
            name: $(this).closest("div.overlay-content").find("p").text(),
            qty: 1
        }
        tam = localStorage.getItem("dataCart")
        var xx = 1;
        if (tam) {
            dataCart = JSON.parse(tam)
            Object.keys(dataCart).map(function (key, index) {
                if (idProduct == key) {
                    dataCart[idProduct]["qty"] = dataCart[idProduct]["qty"] + 1
                    xx = 2;
                }
            })
        }
        if (xx == 1) {
            dataCart[idProduct] = 1
        }
        localStorage.setItem("dataCart", JSON.stringify(dataCart))


        var dem = 0
        Object.keys(dataCart).map(function (key, index) {
            dem = dem + Number(dataCart[key]["qty"])
        })
        $("ul.navbar-nav").find("i.fa-shopping-cart").text(" " + dem)
        localStorage.setItem("qty_dem", JSON.stringify(dem))
    })
    var qtyDem = localStorage.getItem("qty_dem")
    if (qtyDem) {
        qtyDem = JSON.parse(qtyDem)
        $("ul.navbar-nav").find("i.fa-shopping-cart").text(" " + qtyDem)
    }
    $("ul.navbar-nav").find("i.fa-shopping-cart").css({"color":"red"})

})