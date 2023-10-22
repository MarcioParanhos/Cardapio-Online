$(document).ready(function () {
  menu.events.init();
});

var menu = {};

menu.events = {
  init: () => {
    menu.methods.getMenuItems();
  },
};

menu.methods = {
  // Get list of menu items
  getMenuItems: (category = "burgers") => {
    // Filter the menu for only burgens
    var filter = MENU[category];

    // clears the category before selecting again
    $("#itemsMenu").html("");

    // foreach for all items using the created template
    $.each(filter, (i, e) => {
      let temp = menu.templates.item
        .replace(/\${img}/g, e.img)
        .replace(/\${name}/g, e.name)
        .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","));
      $("#itemsMenu").append(temp);
    });
    // remove the active
    $(".container-menu a").removeClass("active");
    // adds the active class to the selected menu
    $("#menu-" + category).addClass("active");
  },
};

menu.templates = {
  item: `
    <div class="col-3 mb-5">
        <div class="card card-item">
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
                <span class="decrement-btn"><i class="fas fa-minus"></i></span>
                <span class="number-items">0</span>
                <span class="increment-btn"><i class="fas fa-plus"></i></span>
                <span class="btn btn-add"><i class="fas fa-cart-plus"></i></span>
            </div>
        </div>
    </div>      
    `,
};
