var UI = require('ui');

// Make a list of menu items
var fruits = [
  {
    title: "Turn off",
    subtitle: "home",
    link: "http://192.168.1.101/shutdown.php"
  },
  {
    title: "Turn on",
    subtitle: "office",
    link: "http://xxx.ru/wakemaxcomp.php"
  },
  {
    title: "Turn off",
    subtitle: "office",
    link: "http://xxx.ru/offmaxcomp.php"
  }
];

// Create the Menu, supplying the list of fruits
var fruitMenu = new UI.Menu({
  sections: [{
    title: 'Operations List',
    items: fruits
  }]
});

function showResponse(title, subtitle){
    // Show a card with clicked item details
  var detailCard = new UI.Card({
    title: title,
    body: subtitle
  });

  // Show the new Card
  detailCard.show();
}

// Add a click listener for select button click
fruitMenu.on('select', function(event) {
  var title = fruits[event.itemIndex].title;
  var req = new XMLHttpRequest();
  req.open('GET', fruits[event.itemIndex].link, true);
  req.onload = function(e) {
    if (req.readyState == 4) {
      if(req.status == 200) {
        showResponse(title, req.responseText);
      } else {
        showResponse(title, "Error accessing the link");
      }
    }
  };
  req.send(null);
});

// Show the Menu
fruitMenu.show();
