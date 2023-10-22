$(document).ready(function () {
  menu.events.init();
});

var menu = {};

var my_cart = [];

menu.events = {
  init: () => {
    menu.methods.getMenuItems();
  },
};

menu.methods = {
  // Get list of menu items
  getMenuItems: (category = "burgers", viewMore = false) => {
    // Filter the menu for only burgens
    var filter = MENU[category];

    if (!viewMore) {
      // clears the category before selecting again
      $("#itemsMenu").html("");
      $("#btn-viewMore").removeClass("hidden");
    }

    // foreach for all items using the created template
    $.each(filter, (i, e) => {
      let temp = menu.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","))
        .replace(/\${id}/g, e.id);

      // buttom ViewMore (12 items)
      if (viewMore && i >= 8 && i < 12) {
        $("#itemsMenu").append(temp);
      }
      // initial pagination (8 items)
      if (!viewMore && i < 8) {
        $("#itemsMenu").append(temp);
      }
    });
    // remove the active
    $(".container-menu a").removeClass("active");
    // adds the active class to the selected menu
    $("#menu-" + category).addClass("active");
  },

  // Click on buttom viewMore
  viewMore: () => {
    var active = $(".container-menu a.active").attr("id").split("menu-")[1];
    menu.methods.getMenuItems(active, true);

    $("#btn-viewMore").addClass("hidden");
  },

  // Decrease the quantity on menu
  decreaseQty: (id) => {
    let actualqty = parseInt($("#qty-" + id).text());
    if (actualqty > 0) {
      $("#qty-" + id).text(actualqty - 1);
    }
  },

  // Increase the quantity on menu
  incrementQty: (id) => {
    let actualqty = parseInt($("#qty-" + id).text());
    $("#qty-" + id).text(actualqty + 1);
  },

  //add products to cart
  addToCart: (id) => {
    let actualqty = parseInt($("#qty-" + id).text());
    if (actualqty > 0) {
      // Get the active category
      var category = $(".container-menu a.active").attr("id").split("menu-")[1];
      // Get the items list
      let filter = MENU[cetegory];
      // Get item selected
      let item = $grep(filter, (e, i) => {
        return e.id == id;
      });
      if (item.lenght > 0) {
      }
    }
  },
};

menu.templates = {
  item: `
    <div class="col-3 mb-5">
        <div class="card card-item" id="\${id}">
            <div class="product-img">
                <img src="\${img}" alt="" />
            </div>
            <p class="product-title text-center mt-4">
                <b>\${name}</b>
            </p>
            <p class="product-price text-center">
                <b>R$ \${price}</b>
            </p>
            <div class="add-cart">
                <span class="decrement-btn" onclick="menu.methods.decreaseQty('\${id}')"><i class="fas fa-minus"></i></span>
                <span class="number-items" id="qty-\${id}">0</span>
                <span class="increment-btn" onclick="menu.methods.incrementQty('\${id}')"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add onclick="menu.methods.addToCart('\${id}')""><i class="fas fa-cart-plus"></i></span>
            </div>
        </div>
    </div>      
    `,
};
