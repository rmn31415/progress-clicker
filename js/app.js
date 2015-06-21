// equipment
document.querySelector('#btn-equip').addEventListener ('click', function () {
  document.querySelector('#equip').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-equip-back').addEventListener ('click', function () {
  document.querySelector('#equip').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

// item
document.querySelector('#btn-item').addEventListener ('click', function () {
  document.querySelector('#items').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-item-back').addEventListener ('click', function () {
  document.querySelector('#items').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

// license
document.querySelector('#btn-license').addEventListener ('click', function () {
  document.querySelector('#license').className = 'current';
  document.querySelector('[data-position="current"]').className = 'left';
});
document.querySelector('#btn-license-back').addEventListener ('click', function () {
  document.querySelector('#license').className = 'right';
  document.querySelector('[data-position="current"]').className = 'current';
});

document.querySelector('#buy-smartphone').addEventListener ('click', function () {
  buy( "smartphone" );
} );
document.querySelector('#buy-autolearning').addEventListener ('click', function () {
  buy( "autolearning" );
} );
document.querySelector('#buy-tutor').addEventListener ('click', function () {
  buy( "tutor" );
} );
document.querySelector('#buy-energydrink').addEventListener ('click', function () {
  buy( "energydrink" );
} );
document.querySelector('#buy-yunbull').addEventListener ('click', function () {
  buy( "yunbull" );
} );
document.querySelector('#manual-save').addEventListener ('click', function () {
  save();
} );
document.querySelector('#wipe-save').addEventListener ('click', function () {
  document.querySelector('#confirm').className = 'fade-in';
});
document.querySelector('#confirm').addEventListener ('click', function () {
  this.className = 'fade-out';
});
document.querySelector('#wipe-cancel').addEventListener ('click', function () {
  document.querySelector('#confirm').className = 'fade-out';
});

document.querySelector('#true-wipe').addEventListener( 'click', function() {
  wipesave();
  equivnum = {
    "smartphone": 0,
    "autolearning": 0,
    "tutor": 0,
    "energydrink": 0,
    "yunbull": 0
  };
  pages = 0;
  document.querySelector('#confirm').className = 'fade-out';
  alert( "削除しました。" );
//  intro();
});
