var plus1Queue = [];
var counter = 0;
var VY = 5;
var VO = 0.025;
var pages;
var clickperpages = 1;

var costfuncs = {
  "smartphone": function( n ) {
    return 100 + 30 * n;
  },
  "autolearning": function( n ) {
    return 500 + 100 * n;
  },
  "tutor": function( n ) {
    return 10000 + 19999 * n;
  },
  "energydrink": function( n ) {
    return 100;
  },
  "yunbull": function( n ) {
    return 500;
  }
};
var hp = 1000;

var equivnum = {
  "smartphone": 0,
  "autolearning": 0,
  "tutor": 0,
  "energydrink": 0,
  "yunbull": 0
};

function getPPS() {
  var pps =  5 * equivnum[ "smartphone" ] + 100 * equivnum[ "autolearning" ] + 10000 * equivnum[ "tutor" ];
  if( equivnum[ "energydrink" ] > 0 ) {
    pps *= 2;
  }
  if( equivnum[ "yunbull" ] > 0 ) {
    pps *= 7;
  }
  return pps;
}

function buy( itemname ) {
  var cost = ( costfuncs[ itemname ] )( equivnum[ itemname ] );
  if( pages < cost ) {
    return;
  }
  pages -= cost;
  equivnum[ itemname ]++;
  if( itemname === "energydrink" || itemname === "yunbull" ) {
    setTimeout( function() { equivnum[ itemname ]-- }, 60000 );
  }
}

function save() {
  strg.setItem( "pages", pages );
  strg.setItem( "smartphone", equivnum[ "smartphone" ] );
  strg.setItem( "autolearning", equivnum[ "autolearning" ] );
  strg.setItem( "tutor", equivnum[ "tutor" ] );

}
function wipesave() {
  localStorage.clear();
}
window.addEventListener( "load", function() {
  var mainWrapperElem = document.getElementById( "book-wrapper" );
  var bookWrapperElem = document.getElementById( "bookimg-wrapper" );
  var pageCounterElem = document.getElementById( "page-num-in-h2" );
  bookWrapperElem.addEventListener( "click", function( e ) {
    e.preventDefault();
  } );
  bookWrapperElem.addEventListener( "touchstart", function( e ) {
    bookWrapperElem.classList.add( "touching" );
    e.preventDefault();
  } );
  bookWrapperElem.addEventListener( "touchend", function( e ) {
    bookWrapperElem.classList.remove( "touching" );
    var plus1Elem = document.createElement( "div" );
    var x = bookWrapperElem.offsetWidth / 2 ;
    var y = bookWrapperElem.offsetHeight;
    var pps = getPPS() + 1;
    plus1Elem.textContent = "+" + pps;
    plus1Elem.classList.add( "plus1" );
    plus1Elem.style.zIndex = ( 100 + counter ) + "";
    plus1Elem.style.top =  x + "px";
    plus1Elem.style.left = y + "px";
    plus1Elem.style.opacity = "1";
    counter++;
    pages += pps;
    counter %= 1000;
//    alert( e.touches[ 0 ].clientX + " " + e.touches[ 0 ].clientY );
    mainWrapperElem.appendChild( plus1Elem );
    plus1Queue.push( {
      "elem": plus1Elem,
      "x": x,
      "y": y,
      "opacity": 1,
      "counter": 10
    } );

    e.preventDefault();
  } );

  var hdr = window.addEventListener( "blur", function() {
    localStorage.setItem( "State", "Success" );
    window.removeEventListener( "blur", hdr );
  });

  setInterval( function() {
    plus1Queue.forEach( function( e ) {
      e.y -= VY;
      if( e.counter > 0 ) {
        e.counter--;
      } else {
        e.opacity -= VO;
      }
      e.elem.style.top = e.y + "px";
      e.elem.style.opacity = e.opacity + "";
    } );
    plus1Queue = plus1Queue.filter( function( e ) {
      if( e.opacity <= 0 ) {
        mainWrapperElem.removeChild( e.elem );
        return false;
      }
      return true;
    } );
    pageCounterElem.textContent = pages + "";

    for( var key in costfuncs ) {
      if( key !== "energydrink" && key !== "yunbull" ) {
        document.querySelector( "#num-" + key ).textContent = equivnum[ key ] + "";
        document.querySelector( "#cost-" + key ).textContent =
          ( costfuncs[ key ] )( equivnum[ key ] );
      }

      if( key === "energydrink" && equivnum[ "energydrink" ] === 1 ||
          key === "yunbull" && equivnum[ "yunbull" ] === 1 ) {
        document.querySelector( "#list-" + key ).setAttribute( "aria-disabled", "true" );
        document.querySelector( "#state-" + key ).textContent = "使用中" ;
        continue;
      }

      if( key === "energydrink" || key === "yunbull" ) {
        document.querySelector( "#state-" + key ).textContent = "未所持" ;
      }

      if( pages >= ( costfuncs[ key ] )( equivnum[ key ] ) ) {
//        alert( pages + " " + ( costfuncs[ key ] )( equivnum[ key ] ) );
        document.querySelector( "#list-" + key ).setAttribute( "aria-disabled", "false" );
        continue;
      }
      document.querySelector( "#list-" + key ).setAttribute( "aria-disabled", "true" );
    }

  }, 35 );

  var autoClickTimer = setInterval( function()  {
    pages += getPPS();
  }, 1000 );


  var saveTimer = setInterval( save, 10000 );
//  alert( typeof localStorage === 'undefined' ? "無理です" :"はじめます" );
  try {
    strg = localStorage;
    // 初回起動
    if( strg.getItem( "Hello" ) === null ) {
      strg.setItem( "Hello", "World" );
      strg.setItem( "pages", 0 );
      strg.setItem( "smartphone", 0 );
      strg.setItem( "autolearning", 0 );
      strg.setItem( "tutor", 0 );
      pages = 0;
      intro();
    } else {
      pages = parseInt( strg.getItem( "pages" ) );
      equivnum.smartphone = parseInt( strg.getItem( "smartphone" ) );
      equivnum.autolearning = parseInt( strg.getItem( "autolearning" ) );
      equivnum.tutor = parseInt( strg.getItem( "tutor" ) );
//      strg.clear();
    }
  } catch( e ) {
    alert( "なにかがおかしいよ\n" + e.toString() );
  }


} );
function intro() {
  alert( "あなたは、セキュリティ・キャンプ2014全国大会「Web・セキュリティ・クラス」に合格しました。\n" +
          "喜びもつかの間、大量の事前課題が出されてしまいました。\n" +
          "あなたの仕事は、事前学習教材をし、事前課題をクリアすることです。"  );
  alert( "画面中央の、事前学習教材をしつこくタップし、読み進めましょう。" );
}
