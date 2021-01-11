$(document).ready(function() {
	
                 var items =  [
        {
                        name: "Samsung Series 4",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 13999,
                            display: 22500
            },
                        discount: 37
        },
        {
                        name: "Samsung Super 6",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 35999,
                            display: 66900
            },
                        discount: 46
        },
        {
                        name: "Samsung The Frame",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 84999,
                            display: 133900
            },
                        discount: 36
        },
        {
                        name: "Thomson B9 Pro",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 9999,
                            display: 16999
            },
                        discount: 41
        },
        {
                        name: "LG Ultra HD",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 39990,
                            display: 79990
            },
                        discount: 50
        },
        {
                        name: "Vu Ready LED TV",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 7999,
                            display: 17e3
            },
                        discount: 52
        },
        {
                        name: "Koryo Android TV",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 55999,
                            display: 199990
            },
                        discount: 71
        },
        {
                        name: "Micromax LED Smart",
                        image: "https://rukminim1.flixcart.com/image/670/600/allinone-desktop/d/n/q/apple-imac-21-5-inch-4k-retina-core-i5-3-1ghz-8gb-1tb-intel-iris-original-imaeh5h83fuzbksz.jpeg?q=90",
                        price: {
                            actual: 9999,
                            display: 27990
            },
                        discount: 64
        }
    ]


var append_data ='';
var itemName, itemImage, discount = "";
var itemCount = 0;

$.each(items , function(i, obj) {

 console.log(obj.price)
itemName = obj.name;
itemImage = obj.image;
discount = obj.discount;

itemCount ++;

if(itemImage != ""){
	itemImage = itemImage;
}
else{
	itemImage = "images/no_image_available.jpeg";
}

dataObj = {
	itemName : obj.name,
itemImage :obj.image,
discount : obj.discount,
actual : obj.price.actual
	
}
dataObj = JSON.stringify(dataObj)


append_data += '<div class="column " >';
append_data += '<span class="offer-display">'+discount+'% off</span><div class="img-layout">';
append_data += '<img src='+itemImage+' width="120" height="120"></div>';
append_data += '<div class="cart-footer"><h1>Item'+itemCount+'</h1><span class="item-display-price">$'+obj.price.display+'</span><p>$'+ obj.price.actual+'</p><button type="button" class="btn add-to-cart" onclick="add(this, '+discount+')";>Add to cart</button></div><span class="hidden-variable" id="id_'+discount+'" style="display:none">'+dataObj+'</span>	</div>';


});
$('#item').append(append_data);


$('.purchase').click(function(){
	alert("Thank you");
	location.reload();
});

});

var cart_data,itemValue = '';
var rowCount = 0;
function add(obj, discount){

	itemValue = $('#id_'+discount).html();
	itemValue = JSON.parse(itemValue);
		
	rowCount ++;
	
	cart_data = '';
   cart_data += '<div class="item" id='+rowCount+'> <div class="buttons"> <span class="delete-btn" onclick="del(this)"></span></div>';
   cart_data += '<div class="image"><img src='+itemValue.itemImage+' alt="" width="80" height="80"/></div>';
   cart_data += '<div class="description" id='+itemValue.discount+'><span>'+itemValue.itemName+'</span></div>';
   cart_data += '<div class="quantity"><button class="plus-btn" type="button" name="button" onclick="increase(this)"><i class ="fa fa-plus"></i></button>';
   cart_data += '<input type="text" id="item-numbers" name="name" value="1" min="1"><button class="minus-btn" type="button" name="button" onclick="decrease(this)"> <i class ="fa fa-minus"></i></button></div>';
   cart_data += '<div class="total-price">$'+itemValue.actual+'</div></div>';


   $(obj).attr('style','background:#6c6a6a; opacity:0.6; pointer-events:none;color: #bababa');
   $('.purchase').show();
	$('#shopping-cart-items').append(cart_data);
	$('.empty-cart-message').hide();
	$('#total-items').html(rowCount);
	
	
	var totalcost =  $("#item-cost").html().split('$', '')

	$("#item-cost").html(totalcost + itemValue.actual )
	$('#item-discount').html(itemValue.discount * rowCount);
	$('#order-total').html(itemValue.actual - (itemValue.discount * rowCount) )
	
};


 function del(obj){
	 $(obj).parent().parent().hide();
	
}
	var increment = 1;
 function increase(obj){
	
	increment++
	$(obj).next('input').attr('value', increment);
	
	$('#total-items').html('')
    $('#total-items').html( rowCount + increment)
	$('#item-cost').html(increment*itemValue.actual)
	$('#item-discount').html(itemValue.discount  * increment);
	$('#order-total').html((increment*itemValue.actual) - (itemValue.discount * rowCount) )
};
var decrement = 0;
function decrease(obj){

	//decrement--
	value1 = $(obj).prev('input').attr('value')
	if (value1 > 1) {
	$(obj).prev('input').attr('value', value1-1);
	value2 = (value1-1) - (itemValue.actual);
	$('#item-cost').html(value2)
	increment = 0;
	$('#order-total').html((increment*itemValue.actual) - (itemValue.discount * rowCount) )
	
	}
	
}
	