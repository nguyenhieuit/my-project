$(document).ready(function () {
    var dataObj = localStorage.getItem("dataCart")
    console.log(dataObj)
    if (dataObj) {
        dataObj = JSON.parse(dataObj)
    }
    var htmls = '';

    
    var total = 0;
    Object.keys(dataObj).map((key, value) => {
        tong = dataObj[key]['price'].replace('$', '') * dataObj[key]['qty'];
        total= total + tong
        htmls += "<tr id='" + key + "'>" +
            "<td class = 'cart_product'" +
            "<a href=''>" +
            "<img src='" + dataObj[key]['img'] + "' alt=''>" +
            "</a>" +
            "</td>" +

            "<td class='cart_description'>" +
            "<h4>" +
            "<a href=''>" + dataObj[key]['name'] + "</a>" +
            "</h4>" +
            "</td>" +

            "<td class='cart_price'>" +
            "<p class='item_price'>" + dataObj[key]['price'] + "</p>" +
            "</td>" +

            "<td class='cart_quantity'>" +
            "<div class='cart_quantity_button'>" +
            "<a class='cart_quantity_up' >" + '+' + "</a>" +
            "<input class='cart_quantity_input' type='text' name='quantity' value='" + dataObj[key]['qty'] + "' autocomplete='off' size='2'>" +
            "<a class='cart_quantity_down' >" + '-' + "</a>" +
            "</div>" +
            "</td>" +

            "<td class='cart_total'>" +
            "<p class='cart_total_price'>" + tong + "</p>" +
            "</td>" +

            "<td class='cart_delete'>" +
            "<a class='cart_quantity_delete' >" + "<i class='fa fa-times'>" + "</i>" + "</a>" +
            "</td>" +
            "</tr>";
    })
    $("table tbody").append(htmls);
    $("li.total-Cart").find("span").text("$" + total)

    $("a.cart_quantity_up").click(function () {
        var qtyUp = $(this).closest("div.cart_quantity_button").find("input").val()
        qtyUp++
        // alert(qtyUp)
        $(this).parent().closest("td.cart_quantity").find("input").val(qtyUp)
        var price = $(this).closest("tr").find("p.item_price").text().replace('$', '')
        var totalUp = price * qtyUp
        $(this).closest("tr").find("p.cart_total_price").text(totalUp)

        

        if (dataObj) {
            var idPrd = $(this).closest("tr").attr("id")
            Object.keys(dataObj).map(function (key, index) {
                if (idPrd == key) {
                    dataObj[idPrd]["qty"] = qtyUp
                    localStorage.setItem("dataCart", JSON.stringify(dataObj))
                }
            })
            
        }
        var total = 0
        Object.keys(dataObj).map(function (key, index) {
            total = total + (dataObj[key]["qty"] * dataObj[key]["price"].replace('$', ''))
        })
        $("li.total-Cart").find("span").text("$" + total)
    })

    $("a.cart_quantity_down").click(function () {
        // qty < 1 xoa luon: tren man va trong local 
        // ngc lai: giam bthuong

        var qtyDown = $(this).closest("div.cart_quantity_button").find("input").val()
        qtyDown--
        if (qtyDown < 1) {
            
            $(this).closest("tr").css({ "display": "none" })
            if (dataObj) {
                var idPrd = $(this).closest("tr").attr("id")
                Object.keys(dataObj).map(function (key, index) {
                    if (idPrd == key) {
                        delete dataObj[idPrd]
                        localStorage.setItem("dataCart", JSON.stringify(dataObj))
                    }
                })
                var tam=localStorage.getItem("dataCart")
                if (tam) {
                    tam = JSON.parse(tam)
                    var total = 0
                    Object.keys(tam).map(function (key, index) {
                        total = total + (tam[key]["qty"] * tam[key]["price"].replace('$', ''))
                    })
                    $("li.total-Cart").find("span").text("$" + total)
                }
            }
        } else {
            $(this).parent().closest("td.cart_quantity").find("input").val(qtyDown)
            var xx = $(this).closest("tr").find("p.item_price").text().replace('$', '')
            var totalDown = xx * qtyDown
            $(this).closest("tr").find("p.cart_total_price").text(totalDown)
            if (dataObj) {
                var idPrd = $(this).closest("tr").attr("id")
                Object.keys(dataObj).map(function (key, index) {
                    if (idPrd == key) {
                        dataObj[idPrd]["qty"] = qtyDown
                        localStorage.setItem("dataCart", JSON.stringify(dataObj))
                    }
                    var tam = localStorage.getItem("dataCart")
                    if (tam) {
                        tam = JSON.parse(tam)
                        var total = 0
                        Object.keys(tam).map(function (key, index) {
                            total = total + (tam[key]["qty"] * tam[key]["price"].replace('$', ''))
                        })
                        $("li.total-Cart").find("span").text("$" + total)
                    }
                })
            }
        }
    })
    
})
